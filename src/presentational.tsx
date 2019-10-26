import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
// import shortid from 'shortid';
// import { Transition, TransitionGroup } from 'react-transition-group';


/* ========================
*     General components
*  ==========================*/

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
  children: any;
}

const WithChildren: React.SFC<WCProps> = ({children, className}) =>
  <div className={className}>
    {children}
  </div>;

const ParentContainer = styled(WithChildren)`
  position:relative;
  overflow:hidden;
`;


/* ========================
*   Previous slide
*  ==========================*/

function constructPreviousSlide(prevVal: VT) {
  if(!prevVal) return `background-color: rgba(0,0,0,0.5);`

  switch(prevVal.type) {

    case 'color':
      return `background-color: ${prevVal.value};`
      break;

    case 'image':
      return `
        background-image: url(${prevVal.value});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      `
      break;

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

    content:'';
    opacity:1;
    animation-name: fadeIn;
    will-change:opacity;
    opacity:0;
    transition:opacity 0.6s ease-out;
    animation-fill-mode:both;
    animation-duration: 0.6s;
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
  transition:background-color .6s ease-out;
`;

interface ISProps {
  store: any;
  current: any;
  previous: any;
}

const ColorBackdrop: React.SFC<ISProps> = ({store, current, previous}) => {

  return (
    <>
      <ColorComponent
        sourceMain={current.value}
        sourceSecondary={previous}
      />
      <PreviousSlide
        previousContent={previous}
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

const ImageBackdrop: React.SFC<ISProps> = ({store, current, previous}) => {
  
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
      />
    </>
  )
};

export { ParentContainer, ColorBackdrop, ImageBackdrop }
