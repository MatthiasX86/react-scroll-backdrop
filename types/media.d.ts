import * as React from "react";
import { BDOptions } from './app';
declare type ZoneProps = {
    value: string;
    theme?: string;
    id?: string;
} & BDOptions;
declare const ColorBackdrop: React.ComponentType<ZoneProps>;
declare const ImageBackdrop: React.ComponentType<ZoneProps>;
export { ColorBackdrop, ImageBackdrop };
