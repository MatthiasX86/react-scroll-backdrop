/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';
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

const WithChildren = ({
  children,
  className
}) => /*#__PURE__*/React.createElement("div", {
  className: className
}, children);

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

function constructPreviousSlide(prevVal) {
  if (!prevVal) return `background-color: rgba(0,0,0,0.5);`;

  switch (prevVal.type) {
    case 'color':
      return `background-color: ${prevVal.value};`;

    case 'image':
      return `
        background-image: url(${prevVal.value});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      `;

    default:
      return `background-color: rgba(0,0,0,0.5);`;
  }
}

const PreviousSlide = styled(ViewportContainer)`

    @keyframes fadeIn {
      0% { opacity:1 }
      100% { opacity:0 }
    }

    opacity:1;
    animation-name: fadeIn;
    will-change:opacity;
    opacity:0;
    transition:opacity ${({
  duration
}) => duration + 'ms'} ease-out;
    animation-fill-mode: backwards;
    animation-duration: ${({
  duration
}) => duration + 'ms'};
    animation-timing-function:ease-out;

    ${({
  previousContent
}) => constructPreviousSlide(previousContent)}
`;
/* ========================
*   Color backdrop container
*  ==========================*/

const ColorComponent = styled.div`
  position:absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  height:100%;
  width:100%;
  will-change:background-color;
  background-color: ${({
  sourceMain
}) => sourceMain};
  transition:background-color ${({
  duration
}) => duration + 'ms'} ease-out;
`;

const Color = ({
  current,
  previous,
  animationDuration
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ColorComponent, {
    sourceMain: current.value,
    sourceSecondary: previous,
    duration: animationDuration
  }), /*#__PURE__*/React.createElement(PreviousSlide, {
    previousContent: previous,
    duration: animationDuration
  }));
};
/* ========================
*   Image backdrop container
*  ==========================*/


const ImageComponent = styled.div`
  position:absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  height:100%;
  width:100%;
  background-image:url(${({
  sourceMain
}) => sourceMain} );
  background-position:center;
  background-repeat:no-repeat;
  background-size:cover;
`;

const Image = ({
  current,
  previous,
  animationDuration
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ViewportContainer, null, /*#__PURE__*/React.createElement(ImageComponent, {
    sourceMain: current.value,
    sourceSecondary: previous
  })), /*#__PURE__*/React.createElement(PreviousSlide, {
    previousContent: previous,
    duration: animationDuration
  }));
};

export { ParentContainer, ContentContainer, Color, Image };