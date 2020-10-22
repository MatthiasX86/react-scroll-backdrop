import React from 'react';
import { BackdropContext } from '.';
import { RegistrationProps } from './logic';
interface BZState {
    didRender: boolean;
    hasRegistered: boolean;
    isActive: boolean;
}
export declare class BackdropZone extends React.Component<RegistrationProps, BZState> {
    static contextType: React.Context<import("./context").ContextValues>;
    context: React.ContextType<typeof BackdropContext>;
    private Element;
    constructor(props: RegistrationProps);
    id: string;
    setZoneActiveState(): void;
    componentDidUpdate(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
