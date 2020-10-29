import shortid from 'shortid';

/* ======= Color Container ========
 * =============================*/

export interface BDMinValues {
  type: 'image' | 'color' | string;
  value: string;
  theme?: string;
  id?: string;
}

export interface BDValues extends BDMinValues {
  element: null | HTMLDivElement;
  renderCallback: null | ( () => void );
}

export interface BDOptions {
  off?: boolean;
  instant?: boolean;
}


export default class Backdrop {

  private _store: Map<string, BDValues> = new Map();

  public current: BDMinValues;

  public previous: BDMinValues;

  public default: BDValues;
  constructor(
    private scrollPosition: number = 0,
    private defaultBackdrop: BDMinValues,
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
  }

  public get store(): Map<string,BDValues> { return new Map([...this._store]) }

  /*
   * */
  public get [Symbol.toStringTag](): string {
    return JSON.stringify(this.store);
  }

  /* 
   * */
  private init(): void {
    this.current = this.default;
    this.previous = this.default;
    this._store.set('default', this.default);
    this.render();

    window.addEventListener('scroll', this.scrollEvent);
  }

  /*
   * */
  public kill = (): void => { window.removeEventListener('scroll', this.scrollEvent) }

  /*
   * */
  public scrollEvent = (): void => { window.requestAnimationFrame(this.calculate) }

  /*
   * */
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

  /*
   * */
  private set(newValue: BDValues): void {
    this.previous = this.current;
    this.current = newValue;
    this.render();
  }

  /*
   * */
  private render(): void {
    if (typeof this.renderCallback === 'function') {
      this.renderCallback();
    }
  }

  /*
   * */
  public register(backdrop: BDValues, options: BDOptions): void  {
    const { id = shortid.generate(), theme = 'default', ...required } = backdrop;
    const { instant = false, off = false } = options;
    const newEntry = { ...required, id, theme }


    if (!off) {

      if (backdrop.type === 'image') {
        const preloadedImage = (new Image()).src = newEntry.value;
        newEntry.value = preloadedImage;
      }

      this._store.set(id, newEntry);

      if (instant) {
        this.set(newEntry);
      }
    }
  }
}
