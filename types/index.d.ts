import React from 'react';
interface CCmembers {
    registerColor: any;
    currentValueType?: any;
    currentTheme?: any;
}
interface VT {
    value: string;
    type: string;
}
declare const BackdropContext: React.Context<CCmembers>;
interface BDProps {
    children: any;
    defaultValue?: VT;
    defaultTheme?: string;
    fromTop?: number;
    animationDuration?: number;
}
interface BDState {
    activeValueType: undefined | VT;
    activeTheme: undefined | string;
    previousValueType: undefined | VT;
    previousTheme: undefined | string;
    isLoaded: boolean;
}
declare class BackdropContainer extends React.Component<BDProps, BDState> {
    private colorState;
    constructor(props: BDProps);
    setColor(newValueType: VT, newTheme: string): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
declare type imagePolicyString = 'stretch' | 'contain';
interface imagePolicyObject {
    backgroundSize?: 'string';
    backgroundPosition?: 'string';
    backgroundRepeat?: 'string';
    backgroundClip?: 'string';
}
interface BDZProps {
    children: any;
    color?: string;
    image?: string;
    imagePolicy?: imagePolicyString | imagePolicyObject;
    video?: string;
    theme?: string;
    off?: boolean;
    instant?: boolean;
}
interface BDZState {
    didRender: boolean;
    hasRegistered: boolean;
    isActiveZone: boolean;
    zoneValueType: VT | undefined;
}
declare class BackdropZone extends React.Component<BDZProps, BDZState> {
    static contextType: React.Context<CCmembers>;
    private DOMRef;
    constructor(props: BDZProps);
    setZoneActiveState(valueType: VT): void;
    componentDidUpdate(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export { BackdropContainer, BackdropZone, BackdropContext };
