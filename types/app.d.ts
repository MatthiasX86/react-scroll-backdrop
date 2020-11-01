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
export interface BDZoneOptions {
    off?: boolean;
    instant?: boolean;
}
export interface BDOptions {
    defaultBackdrop?: BDMinValues;
    scrollPosition?: number;
}
export default class Backdrop {
    /**
     *  callback to render changes to Backdrop container component
     *
     *  @param {() => void}
     *  @callback
     */
    private renderCallback;
    /**
     * Assign options to backdrop container.
     *
     * @param {Object} options - Options set for the backdrop container on init.
     * @param {Object} options.default - Default backdrop for scroll position outside of backdrop zone.
     * @param {number} options.scrollPosition - Scroll position from top to scan for & trigger backdrop zone.
     */
    options?: BDOptions;
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
     *  callback to render changes to Backdrop container component
     *
     *  @param {() => void}
     *  @callback
     */
    renderCallback: () => void, 
    /**
     * Assign options to backdrop container.
     *
     * @param {Object} options - Options set for the backdrop container on init.
     * @param {Object} options.default - Default backdrop for scroll position outside of backdrop zone.
     * @param {number} options.scrollPosition - Scroll position from top to scan for & trigger backdrop zone.
     */
    options?: BDOptions);
    /**
     *  validate user options & throw errors when needed
     *
     *  @method
     */
    private validateOptions;
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
    private scan;
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
    register(backdrop: BDValues, options: BDZoneOptions): void;
}
