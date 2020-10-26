/* eslint react/prop-types: 0 */
import React, { FC } from 'react';
import styled from 'styled-components';
import BackdropValue from './logic';

/* ========================
*     General components
*  ==========================*/

export interface ISProps {
  animationDuration: number;
  current: any;
  previous: any;
}

interface CProps {
  sourceMain: string;
  sourceSecondary: string;
  hasLoaded: boolean;
}

interface VT {
  value: string;
  type: string;
}

const ViewportContainer = styled.div`
  position:fixed;
  top:0;
  right:0;
  left:0;
  height:100vh;
  width:100vw;
`;

/* ========================
*   Parent container
*  ==========================*/

interface WCProps {
  className: string;
}

const WithChildren: React.FC<WCProps> = ({children, className}) =>
  <div className={className}>
    {children}
  </div>;

const ParentContainer = styled(WithChildren)`
  position:relative;
  overflow:hidden;
`;

/* ========================
*   Content container
*  ==========================*/

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
`;

/* ========================
*   Previous slide
*  ==========================*/

function constructPreviousSlide(prevVal: VT) {
  if(!prevVal) return `background-color: rgba(0,0,0,0.5);`

  switch(prevVal.type) {

    case 'color':
      return `background-color: ${prevVal.value};`

    case 'image':
      return `
        background-image: url(${prevVal.value});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      `

    default:
      return `background-color: rgba(0,0,0,0.5);`
  }
}

interface PSProps {
  content: {
    value: string;
    type: string;
  }
}

const PreviousSlide = styled(ViewportContainer)<PSProps>`

    @keyframes fadeIn {
      0% { opacity:1 }
      100% { opacity:0 }
    }

    opacity:1;
    animation-name: fadeIn;
    will-change:opacity;
    opacity:0;
    transition:opacity ${({duration}) => duration + 'ms'} ease-out;
    animation-fill-mode: backwards;
    animation-duration: ${({duration}) => duration + 'ms'};
    animation-timing-function:ease-out;

    ${({previousContent}) => constructPreviousSlide(previousContent)}
`;

/* ========================
*   Color backdrop container
*  ==========================*/

const ColorComponent = styled.div<CProps>`
  position:absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  height:100%;
  width:100%;
  will-change:background-color;
  background-color: ${({ sourceMain }) => sourceMain };
  transition:background-color ${({duration}) => duration + 'ms'} ease-out;
`;

const Color: React.SFC<ISProps> = ({ current, previous, animationDuration}) => {

  return (
    <>
      <ColorComponent
        sourceMain={current.value}
        sourceSecondary={previous}
        duration={animationDuration}
      />
      <PreviousSlide
        previousContent={previous}
        duration={animationDuration}
      />
    </>
  )
}

/* ========================
*   Image backdrop container
*  ==========================*/

const ImageComponent = styled.div<CProps>`
  position:absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  height:100%;
  width:100%;
  background-image:url(${ ({sourceMain}) => sourceMain} );
  background-position:center;
  background-repeat:no-repeat;
  background-size:cover;
`;

const Image: React.SFC<ISProps> = ({current, previous, animationDuration}) => {
  
  return (
    <>
      <ViewportContainer>
        <ImageComponent
          sourceMain={current.value}
          sourceSecondary={previous}
        />
      </ViewportContainer>
      <PreviousSlide
        previousContent={previous}
        duration={animationDuration}
      />
    </>
  )
};

export { ParentContainer, ContentContainer , Color, Image }
