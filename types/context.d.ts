/// <reference types="react" />
import { BDValues, BDOptions } from './app';
export interface ContextValues {
    register: (values: BDValues, options: BDOptions) => void | undefined;
    remove: (id: string) => void | undefined;
    current: BDValues | undefined;
    previous: BDValues | undefined;
}
export declare const BackdropContext: import("react").Context<ContextValues>;
