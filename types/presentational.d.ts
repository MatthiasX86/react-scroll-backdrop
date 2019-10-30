import React from 'react';
interface ISProps {
    durationTime: number;
    store: any;
    current: any;
    previous: any;
}
declare const ParentContainer: any;
declare const ColorBackdrop: React.SFC<ISProps>;
declare const ImageBackdrop: React.SFC<ISProps>;
export { ParentContainer, ColorBackdrop, ImageBackdrop };
