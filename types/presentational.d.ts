import React from 'react';
export interface ISProps {
    animationDuration: number;
    current: any;
    previous: any;
}
declare const ParentContainer: any;
declare const ContentContainer: any;
declare const ColorBackdrop: React.SFC<ISProps>;
declare const ImageBackdrop: React.SFC<ISProps>;
export { ParentContainer, ContentContainer, ColorBackdrop, ImageBackdrop };
