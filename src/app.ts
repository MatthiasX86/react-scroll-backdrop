import shortid from 'shortid';

/* ======= Color Container ========
 * =============================*/

export interface BDMinValues {
  type: 'image' | 'color' | string;
  value: string;
}

export interface BDValues extends BDMinValues {
  id: string;
  theme?: string;
  element: null | HTMLDivElement;
  renderCallback: null | ( () => void );
}

export interface BDOptions {
  off?: boolean;
  instant?: boolean;
}


export default class Backdrop {

  /**
   *  Backdrop zones will be registered into map using string-based, uniqueIDs as keys.
   *
   *  @property {Map<string, BDValues>} 
   *  @private
   *  @default {Map}
   */
  private _store: Map<string, BDValues> = new Map();

  /**
   *  When a zone has reached the scroll position it will be set as the current
   *
   *  @type {Object}
   *  @property
   */
  public current: BDValues;

  /**
   *  on zone change the current position prior to zone change will be set
   *  as the previous zone 
   *
   *  @type {Object}
   *  @property
   */
  public previous: BDValues;

  /**
   *  Default value given to scroll positions outside of registered backdrop zones
   *
   *  @type {Object}
   *  @property
   */
  public default: BDValues;

  constructor(
  /**
   *  scroll position from top of viewport that will be used to trigger backdrop zones
   *
   *  @param {number} scrollPosition
   *  @default
   */
    private scrollPosition: number = 0,

  /**
   *  scroll position that will trigger backdrop zone. backdrop zones will trigger
   *  if scroll position falls in between top and bottom of registered zone
   *  
   *  @type {Object}
   *  @param
   */
    private defaultBackdrop: BDMinValues,

  /**
   *  callback to render changes to Backdrop container component
   *  
   *  @type {() => void}
   *  @callback 
   *  @param
   */
    private renderCallback: () => void,
  ) {

    if (!defaultBackdrop) {
      this.default = {
        type: defaultBackdrop.type || 'color',
        value: defaultBackdrop.value || 'transparent',
        theme: 'default',
        id: 'default',
        element: null,
        renderCallback: null
      }
    } else {
      this.default = {
        type: 'color',
        value: 'transparent',
        theme: 'default',
        id: 'default',
        element: null,
        renderCallback: null
      }
    }

    this.init();

    this.register = this.register.bind(this);
    this.calculate = this.calculate.bind(this);
    this.remove = this.remove.bind(this);
  }

  /**
   *  public facing getter property for backdrop zone store. Keeps private store
   *  untouched by returning new Map containing backdrop key/value pairs from private store
   *  
   *  @return {Map<string, object>}
   *  @public
   */
  public get store(): Map<string,BDValues> { return new Map([...this._store]) }

  /**
   *
   */
  public get [Symbol.toStringTag](): string {
    return JSON.stringify(this.store);
  }

  /**
   *  invoked within the constructor. Couple of things happen here:
   *    - sets the current & previous to default vales to avoid errors when setting
   *      current and previous property methods within the set method
   *    - loads the store with default values under the 'default' key
   *    - fires the render callback to flush those changes to container component
   *    - attaches scroll event to window
   *
   *  @method
   */
  private init(): void {
    this.current = this.default;
    this.previous = this.default;
    this._store.set('default', this.default);
    this.render();

    window.addEventListener('scroll', this.scrollEvent);
  }

  /**
   *  remove scroll event from window
   *
   *  @method
   */
  public removeScrollEvent = (): void => { window.removeEventListener('scroll', this.scrollEvent) }

  /**
   *  attach scroll event to window on init. 
   *
   *  @method
   */
  public scrollEvent = (): void => { window.requestAnimationFrame(this.calculate) }


  /**
   *  remove backdrop from store {Map<string, DBValues>}
   *
   *  @param {string} id - UniqueID used when registering backdrop zone
   *  @method
   */
  public remove = (id: string): void => { this._store.delete(id) };

  /**
   *  callback attached to window scroll event to listen for backdrop zones 
   *
   *  @event
   *  @callback
   *  @this Backdrop instance
   */
  private calculate(): void {
    let inZoneRange = false;

    this._store.forEach(backdropItem => {

      if (backdropItem.id === 'default') return;

      const { top, bottom } = backdropItem.element.getBoundingClientRect();

      if (( top <= this.scrollPosition ) && ( bottom >= this.scrollPosition )) {
        inZoneRange = true;
        const { id, value } = backdropItem;

        if (this.current.id !== id && this.current.value !== value) {
          this.set(backdropItem);
        }
      }
    });

    if (!inZoneRange && ( this.current.id !== 'default' )) {
      this.set(this.default);
    }
  }

  /**
   *  sets pass in backdrop value object to current property, sets prior current
   *  backdrop value object to previous property, and fires container render callback
   *
   *  @param {Object} newValue - value object taken from backdrop store to be set as new current
   *  @method
   */
  private set(newValue: BDValues): void {
    this.previous = this.current;
    this.current = newValue;
    this.render();
  }

  /**
   *  render fires callback passed on init
   *
   *  @method
   */
  private render(): void {
    if (typeof this.renderCallback === 'function') {
      this.renderCallback();
    }
  }

  /**
   *  @param {Object} backdrop - backdrop value object to register
   *  @param {Object} options - options for registered backdrop zones
   *  @method
   */
  public register(backdrop: BDValues, options: BDOptions): void  {
    const { theme = 'default', ...required } = backdrop;
    const { instant = false, off = false } = options;
    const newEntry = { ...required, theme };

    if (!off) {
      if (backdrop.type === 'image') {
        const preloadedImage = (new Image()).src = newEntry.value;
        newEntry.value = preloadedImage;
      }

      this._store.set(backdrop.id, newEntry);

      if (instant) {
        this.set(newEntry);
      }
    }
  }
}
