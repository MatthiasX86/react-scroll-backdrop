"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var ViewportContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position:fixed;\n  top:0;\n  right:0;\n  left:0;\n  height:100vh;\n  width:100vw;\n"], ["\n  position:fixed;\n  top:0;\n  right:0;\n  left:0;\n  height:100vh;\n  width:100vw;\n"])));
var WithChildren = function (_a) {
    var children = _a.children, className = _a.className;
    return react_1.default.createElement("div", { className: className }, children);
};
var ParentContainer = styled_components_1.default(WithChildren)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  position:relative;\n  overflow:hidden;\n"], ["\n  position:relative;\n  overflow:hidden;\n"])));
exports.ParentContainer = ParentContainer;
/* ========================
*   Previous slide
*  ==========================*/
function constructPreviousSlide(prevVal) {
    if (!prevVal)
        return "background-color: rgba(0,0,0,0.5);";
    switch (prevVal.type) {
        case 'color':
            return "background-color: " + prevVal.value + ";";
            break;
        case 'image':
            return "\n        background-image: url(" + prevVal.value + ");\n        background-position: center;\n        background-repeat: no-repeat;\n        background-size: cover;\n      ";
            break;
        default:
            return "background-color: rgba(0,0,0,0.5);";
    }
}
var PreviousSlide = styled_components_1.default(ViewportContainer)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n\n    @keyframes fadeIn {\n      0% { opacity:1 }\n      100% { opacity:0 }\n    }\n\n    content:'';\n    opacity:1;\n    animation-name: fadeIn;\n    will-change:opacity;\n    opacity:0;\n    transition:opacity ", " ease-out;\n    animation-fill-mode:both;\n    animation-duration: ", ";\n    animation-timing-function:ease-out;\n\n    ", "\n"], ["\n\n    @keyframes fadeIn {\n      0% { opacity:1 }\n      100% { opacity:0 }\n    }\n\n    content:'';\n    opacity:1;\n    animation-name: fadeIn;\n    will-change:opacity;\n    opacity:0;\n    transition:opacity ", " ease-out;\n    animation-fill-mode:both;\n    animation-duration: ", ";\n    animation-timing-function:ease-out;\n\n    ", "\n"])), function (_a) {
    var duration = _a.duration;
    return duration + 'ms';
}, function (_a) {
    var duration = _a.duration;
    return duration + 'ms';
}, function (_a) {
    var previousContent = _a.previousContent;
    return constructPreviousSlide(previousContent);
});
/* ========================
*   Color backdrop container
*  ==========================*/
var ColorComponent = styled_components_1.default.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  position:absolute;\n  top:0;\n  bottom:0;\n  right:0;\n  left:0;\n  height:100%;\n  width:100%;\n  will-change:background-color;\n  background-color: ", ";\n  transition:background-color ", " ease-out;\n"], ["\n  position:absolute;\n  top:0;\n  bottom:0;\n  right:0;\n  left:0;\n  height:100%;\n  width:100%;\n  will-change:background-color;\n  background-color: ", ";\n  transition:background-color ", " ease-out;\n"])), function (_a) {
    var sourceMain = _a.sourceMain;
    return sourceMain;
}, function (_a) {
    var duration = _a.duration;
    return duration + 'ms';
});
var ColorBackdrop = function (_a) {
    var store = _a.store, current = _a.current, previous = _a.previous, durationTime = _a.durationTime;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ColorComponent, { sourceMain: current.value, sourceSecondary: previous, duration: durationTime }),
        react_1.default.createElement(PreviousSlide, { previousContent: previous, duration: durationTime })));
};
exports.ColorBackdrop = ColorBackdrop;
/* ========================
*   Image backdrop container
*  ==========================*/
var ImageComponent = styled_components_1.default.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  position:absolute;\n  top:0;\n  bottom:0;\n  right:0;\n  left:0;\n  height:100%;\n  width:100%;\n  background-image:url(", " );\n  background-position:center;\n  background-repeat:no-repeat;\n  background-size:cover;\n"], ["\n  position:absolute;\n  top:0;\n  bottom:0;\n  right:0;\n  left:0;\n  height:100%;\n  width:100%;\n  background-image:url(", " );\n  background-position:center;\n  background-repeat:no-repeat;\n  background-size:cover;\n"])), function (_a) {
    var sourceMain = _a.sourceMain;
    return sourceMain;
});
var ImageBackdrop = function (_a) {
    var store = _a.store, current = _a.current, previous = _a.previous, durationTime = _a.durationTime;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ViewportContainer, null,
            react_1.default.createElement(ImageComponent, { sourceMain: current.value, sourceSecondary: previous })),
        react_1.default.createElement(PreviousSlide, { previousContent: previous, duration: durationTime })));
};
exports.ImageBackdrop = ImageBackdrop;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
