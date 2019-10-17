import React from 'react';
import globalBackdrop from './logic';

/* ======= React Color Component ========
 * ======================================*/

/* TODO: proper union type for undefined and function signature
 * */
interface CCmembers {
  registerColor: any;
  currentColor: any;
  currentTheme: any;
}

const BackdropContext = React.createContext<CCmembers>({
  registerColor: undefined,
  currentColor: undefined,
  currentTheme: undefined,
});

/* ======= React Color Component ========
 * ======================================*/

interface BDProps {
  children: any;
  defaultColor?: string;
  defaultTheme?: string;
  fromTop?: number;
}

interface BDState {
  activeColor: undefined | string;
  activeTheme: undefined | string;
  isLoaded: boolean;
}

class BackdropContainer extends React.Component<BDProps, BDState> {
  private colorState: undefined | globalBackdrop;
  private DOMref: React.RefObject<HTMLDivElement>;

  constructor(props: BDProps) {
    super(props);

    this.DOMref = React.createRef<HTMLDivElement>();
    this.setColor = this.setColor.bind(this);
    this.colorState = undefined;

    this.state = {
      activeColor: undefined,
      activeTheme: undefined,
      isLoaded: false,
    };
  }

  setColor(newColor: string, newTheme: string) {
    this.setState({
      activeColor: newColor,
      activeTheme: newTheme,
    });
  }

  componentDidMount() {
    const {
      defaultColor = 'transparent',
      defaultTheme = 'default',
      fromTop = 0,
    } = this.props;

    const { isLoaded } = this.state;

    if (isLoaded != true) {
      this.colorState = new globalBackdrop(
        fromTop,
        defaultColor,
        defaultTheme,
        this.setColor,
        this.DOMref.current
      );

      this.setState({
        activeColor: this.colorState.currentColor,
        activeTheme: this.colorState.currentTheme,
        isLoaded: true,
      });
    }
  }

  render() {
    const { children } = this.props;
    const { isLoaded, activeTheme } = this.state;

    var styleObj = {
      willChange: `background-color`,
      transition: `all .6s ease-out`,
      backgroundColor: `${this.state.activeColor}`,
    };

    const contextValues = {
      registerColor: isLoaded ? this.colorState.registerColor : undefined,
      currentColor: isLoaded ? this.state.activeColor : undefined,
      currentTheme: isLoaded ? this.state.activeTheme : undefined,
    };

    return (
      <div
        className={activeTheme}
        style={styleObj}
        ref={this.DOMref}
      >
        <BackdropContext.Provider value={{ ...contextValues }}>
          {children}
        </BackdropContext.Provider>
      </div>
    );
  }
}

/* ======= color consumer component ========
 * =========================================*/

interface BDZProps {
  children: any;
  color: string;
  theme?: string;
  off?: boolean;
  instant?: boolean;
}

interface BDZState {
  didRender: boolean;
  hasRegistered: boolean;
  isActiveZone: boolean;
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
    };
    this.DOMRef = React.createRef<HTMLDivElement>();
    this.setZoneActiveState = this.setZoneActiveState.bind(this);
  }

  setZoneActiveState(currentColor: string) {
    const { color } = this.props;
    const { isActiveZone } = this.state;

    if (color !== currentColor) {
      if (isActiveZone !== false) {
        this.setState({ isActiveZone: false });
      }
    }

    if (color === currentColor) {
      if (isActiveZone !== true) {
        this.setState({ isActiveZone: true });
      }
    }
  }

  componentDidUpdate() {
    const {
      color,
      off = false,
      instant = false,
      theme = 'default',
    } = this.props;

    const {
      hasRegistered,
    } = this.state;

    const {
      registerColor,
      currentColor,
      currentTheme
    } = this.context;

    if (hasRegistered != true && off != true) {
      if (typeof registerColor === 'function') {
        registerColor(
          color,
          theme,
          instant,
          this.DOMRef.current,
          this.setZoneActiveState
        );

        this.setState({ hasRegistered: true });
      }
    }

    this.setZoneActiveState(currentColor);
  }

  componentDidMount() {
    this.setState({
      didRender: true,
    });
  }

  render() {
    const { children } = this.props;
    const { didRender, isActiveZone } = this.state;

    return (
      <>
        {didRender && (
          <div
            className={isActiveZone ? 'zoneActive' : ''}
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
