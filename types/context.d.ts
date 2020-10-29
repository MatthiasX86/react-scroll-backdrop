/// <reference types="react" />
import { BDMinValues, BDValues, BDOptions } from './app';
export interface ContextValues {
    register: (values: BDValues, options: BDOptions) => void | undefined;
    current: BDMinValues | undefined;
    previous: BDMinValues | undefined;
}
export declare const BackdropContext: import("react").Context<ContextValues>;
