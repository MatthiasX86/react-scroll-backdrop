"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackdropContext = void 0;

var _react = require("react");

var BackdropContext = /*#__PURE__*/(0, _react.createContext)({
  register: undefined,
  current: undefined,
  previous: undefined
});
exports.BackdropContext = BackdropContext;