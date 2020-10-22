export interface BackdropValue {
    type: 'color' | 'image';
    value: string;
    theme?: string;
    id?: string;
}
export interface AddtionalProps {
    off?: boolean;
    instant?: boolean;
}
export declare type RegistrationProps = BackdropValue & AddtionalProps;
export declare type CallbackType = (arg: BackdropValue) => void;
export declare type ListenerType = () => void;
export interface RegisterFn {
    (entry: RegistrationProps, element: HTMLDivElement, listener: ListenerType): void;
}
declare class Backdrop {
    private fromTop;
    private userDefaultValues;
    private renderCallback?;
    private store;
    current: BackdropValue;
    previous: BackdropValue;
    default: BackdropValue;
    constructor(fromTop?: number, userDefaultValues?: BackdropValue, renderCallback?: CallbackType);
    get [Symbol.toStringTag](): string;
    private init;
    private calculate;
    private set;
    private render;
    register: RegisterFn;
}
export default Backdrop;
