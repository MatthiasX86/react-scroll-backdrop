import React from 'react';
import { BackdropContext } from '.';
import { RegistrationProps } from './logic';
interface BZState {
    didRender: boolean;
    hasRegistered: boolean;
    isActive: boolean;
}
export declare class BackdropZone extends React.PureComponent<RegistrationProps, BZState> {
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
export declare const BackdropColor: {
    new (props: RegistrationProps): {
        context: React.ContextType<typeof BackdropContext>;
        Element: React.RefObject<HTMLDivElement>;
        id: string;
        setZoneActiveState(): void;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): JSX.Element;
        setState<K extends "didRender" | "hasRegistered" | "isActive">(state: BZState | ((prevState: Readonly<BZState>, props: Readonly<RegistrationProps>) => BZState | Pick<BZState, K>) | Pick<BZState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<RegistrationProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<BZState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<RegistrationProps>, nextState: Readonly<BZState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<RegistrationProps>, prevState: Readonly<BZState>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<RegistrationProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<RegistrationProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<RegistrationProps>, nextState: Readonly<BZState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<RegistrationProps>, nextState: Readonly<BZState>, nextContext: any): void;
    };
    contextType: React.Context<import("./context").ContextValues>;
};
export declare const BackdropImage: {
    new (props: RegistrationProps): {
        context: React.ContextType<typeof BackdropContext>;
        Element: React.RefObject<HTMLDivElement>;
        id: string;
        setZoneActiveState(): void;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): JSX.Element;
        setState<K extends "didRender" | "hasRegistered" | "isActive">(state: BZState | ((prevState: Readonly<BZState>, props: Readonly<RegistrationProps>) => BZState | Pick<BZState, K>) | Pick<BZState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<RegistrationProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<BZState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<RegistrationProps>, nextState: Readonly<BZState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<RegistrationProps>, prevState: Readonly<BZState>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<RegistrationProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<RegistrationProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<RegistrationProps>, nextState: Readonly<BZState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<RegistrationProps>, nextState: Readonly<BZState>, nextContext: any): void;
    };
    contextType: React.Context<import("./context").ContextValues>;
};
export {};
