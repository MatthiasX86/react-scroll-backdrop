interface VT {
    value: string;
    type: string;
}
declare type CCB = (valueType: VT, theme: string) => void;
declare type ZCB = (valueTypeState: VT) => void;
interface cacheValue {
    value: string;
}
interface cache {
    'image': {
        [uniqueID: string]: cacheValue | undefined;
    };
    'color': {
        [uniqueID: string]: cacheValue | undefined;
    };
}
declare class globalBackdrop {
    private zoneCollections;
    currentValueType: VT;
    currentTheme: string;
    valuesCache: cache;
    private fromTop;
    private defaultValueType;
    private defaultTheme;
    private setStateCallback;
    constructor(fromTop: number, defaultValueType: VT, defaultTheme: string, setStateCallback: CCB);
    init(): void;
    private logic;
    private setValue;
    registerColor(valueType: VT, theme: string, instant: boolean, domRef: HTMLDivElement, zoneCallback: ZCB): void;
}
export default globalBackdrop;
