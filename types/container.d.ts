import React from 'react';
import { BDMinValues, BDValues } from './app';
interface BCProps {
    scrollPosition?: number;
    defaultValues?: BDMinValues;
    animationDuration?: number;
}
interface BCState {
    current: BDValues;
    previous: BDValues;
    isLoaded: boolean;
}
export declare class BackdropContainer extends React.PureComponent<BCProps, BCState> {
    private backdropState;
    constructor(props: BCProps);
    updateState(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): false | JSX.Element;
}
export {};
