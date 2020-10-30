/* eslint react/prop-types: 0 */
import * as React from 'react';
import { PureComponent } from 'react';
import styled, {css} from 'styled-components';
import { BDValues } from './app';


const ParentContainer = styled.div`
  position:relative;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
`;

const SlidesContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`

type ValueType = { value: string };

type ActiveType = { active: boolean };

type SlideStyles = { animationTiming: number } & ActiveType;

const SlideStyles = css<( SlideStyles & ActiveType )>`
  opacity: ${({active}) => active ? 1 : 0}};
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transition: all ${({animationTiming}) => 
    animationTiming 
      ? animationTiming
      : 700
      }ms ease-out;
`;

type SlideType = SlideStyles & ValueType;

const ImageSlide = styled.div<SlideType>`
  ${SlideStyles}
  background-image: url(" ${({value}) => value} ");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

const ColorSlide = styled.div<SlideType>`
  ${SlideStyles}
  background-color: ${({value}) => value};
`;

interface CSOptions {
  animationTiming: number;
  active: boolean;
}

function constructSlide(backdrop: BDValues, options: CSOptions): JSX.Element {

  const { active, animationTiming } = options;

  const componentProps = {
    key: backdrop.id,
    value: backdrop.value,
    active,
    animationTiming,
  }

  switch (backdrop.type) {
    case 'color':
      return <ColorSlide {...componentProps} />;
    case 'image':
      return <ImageSlide {...componentProps} />;
  }
}

interface SProps {
  store: Map<string, BDValues>;
  current: string;
  animationTiming: number;
}

class Slides extends PureComponent<SProps, unknown> {
  constructor(props: SProps) {
    super(props);
  }

  // eslint-disable-next-line
  render() {
    const {
      store = new Map<string, BDValues>(),
      animationTiming = 700,
      current,
    } = this.props;

    const slidesList: JSX.Element[] = [];

    store.forEach(backdrop => {
      const options = {
        active: current === backdrop.id,
        animationTiming,
      };

      slidesList.push(constructSlide(backdrop, options));
    });

    return (
      <SlidesContainer>
        {slidesList}
      </SlidesContainer>
    )
  }
}

export { ParentContainer, ContentContainer, Slides }
