import * as React from "react";
import { BDZoneOptions } from './app';
declare type ZoneProps = {
    value: string;
    theme?: string;
    id?: string;
} & BDZoneOptions;
declare const ColorBackdrop: React.ComponentType<ZoneProps>;
declare const ImageBackdrop: React.ComponentType<ZoneProps>;
export { ColorBackdrop, ImageBackdrop };
