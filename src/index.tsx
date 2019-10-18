import React from 'react';
import globalBackdrop from './logic';

/* ======= React Color Component ========
 * ======================================*/

/* TODO: proper union type for undefined and function signature
 * */
interface CCmembers {
  registerColor: any;
  currentValueType: any;
  currentTheme: any;
}

interface VT {
  value: string;
  type: string;
}

const BackdropContext = React.createContext<CCmembers>({
  registerColor: undefined,
  currentValueType: undefined,
  currentTheme: undefined,
});

/* ======= React Color Component ========
 * ======================================*/

interface BDProps {
  children: any;
  defaultValueType?: VT;
  defaultTheme?: string;
  fromTop?: number;
}

interface BDState {
  activeValueType: undefined | VT;
  activeTheme: undefined | string;
  isLoaded: boolean;
}

class BackdropContainer extends React.Component<BDProps, BDState> {
  private colorState: undefined | globalBackdrop;

  constructor(props: BDProps) {
    super(props);
    this.setColor = this.setColor.bind(this);
    this.colorState = undefined;

    this.state = {
      activeValueType: undefined,
      activeTheme: undefined,
      isLoaded: false,
    };
  }

  setColor(newValueType: VT, newTheme: string) {
    this.setState({
      activeValueType: newValueType,
      activeTheme: newTheme,
    });
  }

  componentDidMount() {
    const {
      defaultValueType = {value: 'transparent', type: 'color'},
      defaultTheme = 'default',
      fromTop = 0,
    } = this.props;

    const { isLoaded } = this.state;

    if (isLoaded != true) {
      this.colorState = new globalBackdrop(
        fromTop,
        defaultValueType,
        defaultTheme,
        this.setColor,
      );

      this.setState({
        activeValueType: this.colorState.currentValueType,
        activeTheme: this.colorState.currentTheme,
        isLoaded: true,
      });
    }
  }

  render() {
    const { children } = this.props;
    const { isLoaded, activeValueType, activeTheme } = this.state;

    var styleObj = {
      willChange: `background-color`,
      transition: `all .6s ease-out`,
      ...(isLoaded && {backgroundColor: activeValueType.value})
    };

    console.log(activeValueType != undefined && activeValueType.type)

    const contextValues = {
      registerColor: isLoaded ? this.colorState.registerColor : undefined,
      currentValueType: isLoaded ? this.state.activeValueType : undefined,
      currentTheme: isLoaded ? this.state.activeTheme : undefined,
    };

    return (
      <div className={activeTheme} style={styleObj}>
        <BackdropContext.Provider value={{ ...contextValues }}>
          {children}
        </BackdropContext.Provider>
      </div>
    );
  }
}

/* ======= color consumer component ========
 * =========================================*/

type imagePolicyString = 'stretch' | 'contain';

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

class BackdropZone extends React.Component<BDZProps, BDZState> {
  static contextType = BackdropContext;
  private DOMRef: React.RefObject<HTMLDivElement>;

  constructor(props: BDZProps) {
    super(props);
    this.state = {
      didRender: false,
      hasRegistered: false,
      isActiveZone: false,
      zoneValueType: undefined,
    };
    this.DOMRef = React.createRef<HTMLDivElement>();
    this.setZoneActiveState = this.setZoneActiveState.bind(this);
  }

  setZoneActiveState(valueType: VT) {
    const { isActiveZone, zoneValueType } = this.state;

    if (JSON.stringify(zoneValueType) !== JSON.stringify(valueType)) {
      if (isActiveZone !== false) {
        this.setState({ isActiveZone: false });
      }
    }

    if (JSON.stringify(zoneValueType) === JSON.stringify(valueType)) {
      if (isActiveZone !== true) {
        this.setState({ isActiveZone: true });
      }
    }
  }

  componentDidUpdate() {

    const {
      off = false,
      instant = false,
      theme = 'default',
    } = this.props;

    const {
      hasRegistered,
      zoneValueType,
    } = this.state;

    const {
      registerColor,
      currentValueType,
    } = this.context;

    if (hasRegistered != true && off != true) {
      if (typeof registerColor === 'function') {
        registerColor(
          zoneValueType,
          theme,
          instant,
          this.DOMRef.current,
          this.setZoneActiveState
        );

        this.setState({ hasRegistered: true });
      }
    }

    this.setZoneActiveState(currentValueType);
  }

  componentDidMount() {
    const { color, image, video } = this.props;

    this.setState({
      didRender: true,
      zoneValueType: {
        value: color || image || video,
        type: color && 'color' || image && 'image' || video && 'video',
      }
    });
  }

  render() {
    const { children } = this.props;
    const { didRender, isActiveZone } = this.state;

    const containerClassNames = [
      'reactBackdrop',
      isActiveZone ? 'active' : '',
    ].join(' ');

    return (
      <>
        {didRender && (
          <div
            className={containerClassNames}
            ref={this.DOMRef}
          >
            {children}
          </div>
        )}
      </>
    );
  }
}

export { BackdropContainer, BackdropZone, BackdropContext };
