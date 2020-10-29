import { PureComponent } from 'react';
import { BDValues } from './app';
declare const ParentContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
declare const ContentContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
interface SProps {
    store: Map<string, BDValues>;
    current: string;
    animationTiming: number;
}
declare class Slides extends PureComponent<SProps, unknown> {
    constructor(props: SProps);
    render(): JSX.Element;
}
export { ParentContainer, ContentContainer, Slides };
