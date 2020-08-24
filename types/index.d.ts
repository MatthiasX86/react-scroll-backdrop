import React from 'react';
import { BackdropValue, RegisterFn, RegistrationProps } from './logic';
interface ContextValues {
    register: RegisterFn;
    current: BackdropValue;
    previous: BackdropValue;
}
declare const BackdropContext: React.Context<ContextValues>;
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
declare class BackdropContainer extends React.Component<BCProps, BCState> {
    private backdropState;
    constructor(props: BCProps);
    updateState(newValue: BackdropValue): void;
    componentDidMount(): void;
    render(): false | JSX.Element;
}
interface BZState {
    didRender: boolean;
    hasRegistered: boolean;
    isActive: boolean;
}
declare class BackdropZone extends React.Component<RegistrationProps, BZState> {
    static contextType: React.Context<ContextValues>;
    context: React.ContextType<typeof BackdropContext>;
    private Element;
    constructor(props: RegistrationProps);
    id: string;
    setZoneActiveState(): void;
    componentDidUpdate(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export { BackdropContainer, BackdropZone, BackdropContext };
