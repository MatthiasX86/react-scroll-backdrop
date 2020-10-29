export interface BDMinValues {
    type: 'image' | 'color' | string;
    value: string;
    theme?: string;
    id?: string;
}
export interface BDValues extends BDMinValues {
    element: null | HTMLDivElement;
    renderCallback: null | (() => void);
}
export interface BDOptions {
    off?: boolean;
    instant?: boolean;
}
export default class Backdrop {
    private scrollPosition;
    private defaultBackdrop;
    private renderCallback;
    private _store;
    current: BDMinValues;
    previous: BDMinValues;
    default: BDValues;
    constructor(scrollPosition: number, defaultBackdrop: BDMinValues, renderCallback: () => void);
    get store(): Map<string, BDValues>;
    get [Symbol.toStringTag](): string;
    private init;
    kill: () => void;
    scrollEvent: () => void;
    private calculate;
    private set;
    private render;
    register(backdrop: BDValues, options: BDOptions): void;
}
