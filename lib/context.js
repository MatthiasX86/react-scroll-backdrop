"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackdropContext = void 0;
const react_1 = require("react");
exports.BackdropContext = react_1.createContext({
    register: undefined,
    current: undefined,
    previous: undefined,
});
