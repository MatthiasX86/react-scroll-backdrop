/// <reference types="react" />
import { BackdropValue, RegisterFn } from './logic';
export interface ContextValues {
    register: RegisterFn | undefined;
    current: BackdropValue | undefined;
    previous: BackdropValue | undefined;
}
export declare const BackdropContext: import("react").Context<ContextValues>;
