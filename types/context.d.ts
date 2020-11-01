/// <reference types="react" />
import { BDValues, BDZoneOptions } from './app';
export interface ContextValues {
    register: (values: BDValues, options: BDZoneOptions) => void | undefined;
    remove: (id: string) => void | undefined;
    current: BDValues | undefined;
    previous: BDValues | undefined;
}
export declare const BackdropContext: import("react").Context<ContextValues>;
