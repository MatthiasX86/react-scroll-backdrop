export interface BDMinValues {
    type: 'image' | 'color' | string;
    value: string;
}
export interface BDValues extends BDMinValues {
    id: string;
    theme?: string;
    element: null | HTMLDivElement;
    renderCallback: null | (() => void);
}
export interface BDOptions {
    off?: boolean;
    instant?: boolean;
}
export default class Backdrop {
    /**
     *  scroll position from top of viewport that will be used to trigger backdrop zones
     *
     *  @param {number} scrollPosition
     *  @default
     */
    private scrollPosition;
    /**
     *  scroll position that will trigger backdrop zone. backdrop zones will trigger
     *  if scroll position falls in between top and bottom of registered zone
     *
     *  @type {Object}
     *  @param
     */
    private defaultBackdrop;
    /**
     *  callback to render changes to Backdrop container component
     *
     *  @type {() => void}
     *  @callback
     *  @param
     */
    private renderCallback;
    /**
     *  Backdrop zones will be registered into map using string-based, uniqueIDs as keys.
     *
     *  @property {Map<string, BDValues>}
     *  @private
     *  @default {Map}
     */
    private _store;
    /**
     *  When a zone has reached the scroll position it will be set as the current
     *
     *  @type {Object}
     *  @property
     */
    current: BDValues;
    /**
     *  on zone change the current position prior to zone change will be set
     *  as the previous zone
     *
     *  @type {Object}
     *  @property
     */
    previous: BDValues;
    /**
     *  Default value given to scroll positions outside of registered backdrop zones
     *
     *  @type {Object}
     *  @property
     */
    default: BDValues;
    constructor(
    /**
     *  scroll position from top of viewport that will be used to trigger backdrop zones
     *
     *  @param {number} scrollPosition
     *  @default
     */
    scrollPosition: number, 
    /**
     *  scroll position that will trigger backdrop zone. backdrop zones will trigger
     *  if scroll position falls in between top and bottom of registered zone
     *
     *  @type {Object}
     *  @param
     */
    defaultBackdrop: BDMinValues, 
    /**
     *  callback to render changes to Backdrop container component
     *
     *  @type {() => void}
     *  @callback
     *  @param
     */
    renderCallback: () => void);
    /**
     *  public facing getter property for backdrop zone store. Keeps private store
     *  untouched by returning new Map containing backdrop key/value pairs from private store
     *
     *  @return {Map<string, object>}
     *  @public
     */
    get store(): Map<string, BDValues>;
    /**
     *
     */
    get [Symbol.toStringTag](): string;
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
    private init;
    /**
     *  remove scroll event from window
     *
     *  @method
     */
    removeScrollEvent: () => void;
    /**
     *  attach scroll event to window on init.
     *
     *  @method
     */
    scrollEvent: () => void;
    /**
     *  remove backdrop from store {Map<string, DBValues>}
     *
     *  @param {string} id - UniqueID used when registering backdrop zone
     *  @method
     */
    remove: (id: string) => void;
    /**
     *  callback attached to window scroll event to listen for backdrop zones
     *
     *  @event
     *  @callback
     *  @this Backdrop instance
     */
    private calculate;
    /**
     *  sets pass in backdrop value object to current property, sets prior current
     *  backdrop value object to previous property, and fires container render callback
     *
     *  @param {Object} newValue - value object taken from backdrop store to be set as new current
     *  @method
     */
    private set;
    /**
     *  render fires callback passed on init
     *
     *  @method
     */
    private render;
    /**
     *  @param {Object} backdrop - backdrop value object to register
     *  @param {Object} options - options for registered backdrop zones
     *  @method
     */
    register(backdrop: BDValues, options: BDOptions): void;
}
