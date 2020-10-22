import React from 'react';

import Backdrop, {
  BackdropValue,
  // RegisterFn,
  // RegistrationProps
} from './logic';

import {
  ParentContainer,
  ContentContainer,
  ColorBackdrop,
  ImageBackdrop,
  ISProps
} from './presentational';

import { BackdropContext } from './context';

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
