import React from 'react';
import globalBackdrop from './logic';
import { ParentContainer, ColorBackdrop, ImageBackdrop } from './presentational';

/* ======= React Color Component ========
 * ======================================*/

/* TODO: proper union type for undefined and function signature
 * */
interface CCmembers {
  registerColor: any;
  currentValueType?: any;
  currentTheme?: any;
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

interface TProps {
  durationTime;
  store: any;
  current: VT;
  previous: VT;
}

class BackdropContainer extends React.Component<BDProps, BDState> {
  private colorState: undefined | globalBackdrop;

  constructor(props: BDProps) {
    super(props);
    this.colorState = undefined;

    this.state = {
      activeValueType: undefined,
      activeTheme: undefined,
      previousValueType: undefined,
      previousTheme: undefined,
      isLoaded: false,
    };

    this.setColor = this.setColor.bind(this);
  }

  setColor(newValueType: VT, newTheme: string) {

    const {
      activeValueType: prevVal,
      activeTheme: prevTheme
    } = this.state;

    this.setState({
      activeValueType: newValueType,
      activeTheme: newTheme,
      previousValueType: prevVal,
      previousTheme: prevTheme,
    });
  }

  componentDidMount() {
    const {
      defaultValue = {value: 'transparent', type: 'color'},
      defaultTheme = 'default',
      fromTop = 0,
    } = this.props;

    const { isLoaded } = this.state;

    if (!isLoaded) {
      this.colorState = new globalBackdrop(
        fromTop,
        defaultValue,
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
    const { children, animationDuration = 600 } = this.props;

    const {
      isLoaded,
      activeValueType = {value: 'transparent', type: 'color'},
      activeTheme = 'default',
      previousValueType,
    } = this.state;

    const contextValues = {
      registerColor: isLoaded && this.colorState.registerColor,
      currentValueType: isLoaded && activeValueType,
      currentTheme: isLoaded && activeTheme,
    };

    const backdropParentContainerClassNames = [
      'reactBackdrop__container',
      activeTheme,
    ].join(' ');

    const templateProps: TProps  = {
      durationTime: animationDuration,
      store: isLoaded && this.colorState.valuesCache[activeValueType.type],
      current: activeValueType,
      previous: previousValueType,
    }

    const template = {
      image: <ImageBackdrop {...templateProps} />,
      color: <ColorBackdrop {...templateProps} />,
    }[isLoaded && activeValueType.type]

    return isLoaded && (
        <ParentContainer className={backdropParentContainerClassNames}>
          {template}
          <BackdropContext.Provider value={{ ...contextValues }}>
            {children}
          </BackdropContext.Provider>
        </ParentContainer>
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

    const zoneUniqueId = JSON.stringify(zoneValueType);
    const valuetypeUniqueId = JSON.stringify(valueType);

    if (zoneUniqueId !== valuetypeUniqueId) {
      if (isActiveZone !== false) {
        this.setState({ isActiveZone: false });
      }
    }

    if (zoneUniqueId === valuetypeUniqueId) {
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

    console.log('backdropZone here...: ', zoneValueType)

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
    const {
      color,
      image,
      video,
    } = this.props;

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
    const { currentTheme, currentValueType } = this.context;
    const { didRender, isActiveZone } = this.state;


    const containerClassNames = [
      'reactBackdrop__zone',
      isActiveZone ? 'active' : '',
    ].join(' ');

    return (
      <>
        {didRender && (
          <div className={containerClassNames} ref={this.DOMRef}>
            {typeof children === 'function'
              ? children(isActiveZone, currentTheme, currentValueType)
              : children}
          </div>
        )}
      </>
    );
  }
}

export { BackdropContainer, BackdropZone, BackdropContext };
