import React from 'react';
import shortid from 'shortid';

import Backdrop, {
  BackdropValue,
  RegisterFn,
  RegistrationProps
} from './logic';

import {
  ParentContainer,
  ContentContainer,
  ColorBackdrop,
  ImageBackdrop,
  ISProps
} from './presentational';

/* ======= React Color Component ========
 * ======================================*/

/* TODO: proper union type for undefined and function signature
 * */
interface ContextValues {
  register: RegisterFn;
  current: BackdropValue;
  previous: BackdropValue;
}


const BackdropContext = React.createContext<ContextValues>({
  register: undefined,
  current: undefined,
  previous: undefined,
});

/* ======= React Color Component ========
 * ======================================*/

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

class BackdropContainer extends React.Component<BCProps, BCState> {
  private backdropState: Backdrop;

  constructor(props: BCProps) {
    super(props);

    this.state = {
      current: null,
      previous: null,
      isLoaded: false,
    };

    this.updateState = this.updateState.bind(this);
  }

  /* TODO: remove arg and update from backdrop instance */
  public updateState(newValue: BackdropValue): void {
    const { current: previousValue } = this.state;

    this.setState({
      previous: previousValue,
      current: newValue
    });
  }

  componentDidMount() {
    const { fromTop = 0, defaultValues } = this.props;
    const { isLoaded } = this.state;

    if (!isLoaded) {
      this.backdropState = new Backdrop(
        fromTop,
        defaultValues,
        this.updateState,
      );

      this.setState({
        current: this.backdropState.current,
        isLoaded: true,
      });
    }
  }

  render() {

    if (!this.state.isLoaded) return false;

    const { isLoaded, current, previous } = this.state;
    const { children, animationDuration = 600 } = this.props;
    const { register } = this.backdropState;


    const contextValues = {
      register,
      current,
      previous,
    };

    const templateProps: ISProps  = {
      animationDuration,
      current,
      previous,
    }

    const template = {
      image: <ImageBackdrop {...templateProps} />,
      color: <ColorBackdrop {...templateProps} />,
    }[current.type]

    return isLoaded && (
        <ParentContainer className='reactBackdrop__container'>
          <BackdropContext.Provider value={{ ...contextValues }}>
            <ContentContainer>
              {children}
            </ContentContainer>
          </BackdropContext.Provider>
          {template}
        </ParentContainer>
    );
  }
}

/* ======= color consumer component ========
 * =========================================*/

interface BZState {
  didRender: boolean;
  hasRegistered: boolean;
  isActive: boolean;
}

class BackdropZone extends React.Component<RegistrationProps, BZState> {
  static contextType = BackdropContext;

  declare context: React.ContextType<typeof BackdropContext>

  private Element: React.RefObject<HTMLDivElement>;

  constructor(props: RegistrationProps) {
    super(props);

    this.state = {
      didRender: false,
      hasRegistered: false,
      isActive: false,
    };

    this.Element = React.createRef<HTMLDivElement>();
    this.setZoneActiveState = this.setZoneActiveState.bind(this);
  }


  public id = shortid.generate();

  public setZoneActiveState(): void {
    const { isActive } = this.state;
    const { current } = this.context;

    if (this.id !== current.id) {
      if (isActive !== false) {
        this.setState({ isActive: false });
      }
    }

    if (this.id === current.id) {
      if (isActive !== true) {
        this.setState({ isActive: true });
      }
    }
  }

  componentDidUpdate() {
    const { type, value, theme, off, instant } = this.props;
    const { hasRegistered } = this.state;
    const { register } = this.context;

    if (!hasRegistered) {
      if (typeof register === 'function') {

        const registerProps = {
          type,
          value,
          theme,
          id: this.id,
          off,
          instant,
        }

        register(
          registerProps,
          this.Element.current,
          this.setZoneActiveState
        );

        this.setState({ hasRegistered: true });
      }
    }

    this.setZoneActiveState();
  }

  componentDidMount() {

    this.setState({
      didRender: true,
    });
  }

  render() {
    const { children } = this.props;
    const { current: { theme, value} } = this.context;
    const { didRender, isActive } = this.state;


    const containerClassNames = [
      'reactBackdrop__zone',
      isActive ? 'active' : '',
    ].join(' ');

    return (
      <>
        {didRender && (
          <div className={containerClassNames} ref={this.Element}>
            {typeof children === 'function'
              ? children(isActive, theme, value)
              : children}
          </div>
        )}
      </>
    );
  }
}

export { BackdropContainer, BackdropZone, BackdropContext };
