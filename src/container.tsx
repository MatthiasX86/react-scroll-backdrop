import React from 'react';
import { BackdropContext } from './context';
import Backdrop, { BDMinValues, BDValues } from './app';
import { ParentContainer, ContentContainer, Slides } from './ui';


/* ======= React Color Component ========
 * ======================================*/

interface BCProps {
  scrollPosition?: number;
  defaultValues?: BDMinValues;
  animationDuration?: number;
}

interface BCState {
  current: BDValues;
  previous: BDValues;
  isLoaded: boolean;
}

export class BackdropContainer extends React.PureComponent<BCProps, BCState> {

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

  public updateState(): void {
    const { isLoaded } = this.state;

    if (isLoaded) {
      const { current, previous } = this.backdropState;

      this.setState({
        previous,
        current,
      });
    }
  }

  // eslint-disable-next-line 
  componentDidMount() {
    const { scrollPosition, defaultValues } = this.props;
    const { isLoaded } = this.state;

    const options = {
      defaultValues,
      scrollPosition,
    };

    if (!isLoaded) {
      this.backdropState = new Backdrop( this.updateState, options );

      this.setState({
        current: this.backdropState.current,
        previous: this.backdropState.previous,
        isLoaded: true,
      });
    }
  }

  // eslint-disable-next-line 
  componentWillUnmount() {
    this.backdropState.removeScrollEvent();
  }

  // eslint-disable-next-line 
  render() {

    if (!this.state.isLoaded) return false;

    const { isLoaded, current, previous } = this.state;
    const { children, animationDuration = 600 } = this.props;
    const { register, remove } = this.backdropState;

    const contextValues = {
      register,
      current,
      previous,
      remove,
    };

    return isLoaded && (
        <ParentContainer className='reactBackdrop__container'>
          <Slides
            store={this.backdropState.store}
            current={current.id}
            animationTiming={animationDuration}
          />
          <BackdropContext.Provider value={{ ...contextValues }}>
            <ContentContainer>
              {children}
            </ContentContainer>
          </BackdropContext.Provider>
        </ParentContainer>
    );
  }
}
