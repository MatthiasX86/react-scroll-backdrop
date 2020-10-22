import React from 'react';
import { BackdropValue } from './logic';
interface BCProps {
    fromTop?: number;
    defaultValues?: BackdropValue;
    animationDuration?: number;
}
interface BCState {
    current: BackdropValue;
    previous: BackdropValue;
    isLoaded: boolean;
}
export declare class BackdropContainer extends React.PureComponent<BCProps, BCState> {
    private backdropState;
    constructor(props: BCProps);
    updateState(newValue: BackdropValue): void;
    componentDidMount(): void;
    render(): false | JSX.Element;
}
export {};
