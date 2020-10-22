"use strict";
/* eslint react/prop-types: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageBackdrop = exports.ColorBackdrop = exports.ContentContainer = exports.ParentContainer = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const ViewportContainer = styled_components_1.default.div `
  position:fixed;
  top:0;
  right:0;
  left:0;
  height:100vh;
  width:100vw;
`;
const WithChildren = ({ children, className }) => react_1.default.createElement("div", { className: className }, children);
const ParentContainer = styled_components_1.default(WithChildren) `
  position:relative;
  overflow:hidden;
`;
exports.ParentContainer = ParentContainer;
/* ========================
*   Content container
*  ==========================*/
const ContentContainer = styled_components_1.default.div `
  position: relative;
  z-index: 10;
`;
exports.ContentContainer = ContentContainer;
/* ========================
*   Previous slide
*  ==========================*/
function constructPreviousSlide(prevVal) {
    if (!prevVal)
        return `background-color: rgba(0,0,0,0.5);`;
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
const PreviousSlide = styled_components_1.default(ViewportContainer) `

    @keyframes fadeIn {
      0% { opacity:1 }
      100% { opacity:0 }
    }

    opacity:1;
    animation-name: fadeIn;
    will-change:opacity;
    opacity:0;
    transition:opacity ${({ duration }) => duration + 'ms'} ease-out;
    animation-fill-mode: backwards;
    animation-duration: ${({ duration }) => duration + 'ms'};
    animation-timing-function:ease-out;

    ${({ previousContent }) => constructPreviousSlide(previousContent)}
`;
/* ========================
*   Color backdrop container
*  ==========================*/
const ColorComponent = styled_components_1.default.div `
  position:absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  height:100%;
  width:100%;
  will-change:background-color;
  background-color: ${({ sourceMain }) => sourceMain};
  transition:background-color ${({ duration }) => duration + 'ms'} ease-out;
`;
const ColorBackdrop = ({ current, previous, animationDuration }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ColorComponent, { sourceMain: current.value, sourceSecondary: previous, duration: animationDuration }),
        react_1.default.createElement(PreviousSlide, { previousContent: previous, duration: animationDuration })));
};
exports.ColorBackdrop = ColorBackdrop;
/* ========================
*   Image backdrop container
*  ==========================*/
const ImageComponent = styled_components_1.default.div `
  position:absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  height:100%;
  width:100%;
  background-image:url(${({ sourceMain }) => sourceMain} );
  background-position:center;
  background-repeat:no-repeat;
  background-size:cover;
`;
const ImageBackdrop = ({ current, previous, animationDuration }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ViewportContainer, null,
            react_1.default.createElement(ImageComponent, { sourceMain: current.value, sourceSecondary: previous })),
        react_1.default.createElement(PreviousSlide, { previousContent: previous, duration: animationDuration })));
};
exports.ImageBackdrop = ImageBackdrop;
