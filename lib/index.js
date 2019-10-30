"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var logic_1 = tslib_1.__importDefault(require("./logic"));
var presentational_1 = require("./presentational");
var BackdropContext = react_1.default.createContext({
    registerColor: undefined,
    currentValueType: undefined,
    currentTheme: undefined,
});
exports.BackdropContext = BackdropContext;
var BackdropContainer = /** @class */ (function (_super) {
    tslib_1.__extends(BackdropContainer, _super);
    function BackdropContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.colorState = undefined;
        _this.state = {
            activeValueType: undefined,
            activeTheme: undefined,
            previousValueType: undefined,
            previousTheme: undefined,
            isLoaded: false,
        };
        _this.setColor = _this.setColor.bind(_this);
        return _this;
    }
    BackdropContainer.prototype.setColor = function (newValueType, newTheme) {
        var _a = this.state, prevVal = _a.activeValueType, prevTheme = _a.activeTheme;
        this.setState({
            activeValueType: newValueType,
            activeTheme: newTheme,
            previousValueType: prevVal,
            previousTheme: prevTheme,
        });
    };
    BackdropContainer.prototype.componentDidMount = function () {
        var _a = this.props, _b = _a.defaultValue, defaultValue = _b === void 0 ? { value: 'transparent', type: 'color' } : _b, _c = _a.defaultTheme, defaultTheme = _c === void 0 ? 'default' : _c, _d = _a.fromTop, fromTop = _d === void 0 ? 0 : _d;
        var isLoaded = this.state.isLoaded;
        if (!isLoaded) {
            this.colorState = new logic_1.default(fromTop, defaultValue, defaultTheme, this.setColor);
            this.setState({
                activeValueType: this.colorState.currentValueType,
                activeTheme: this.colorState.currentTheme,
                isLoaded: true,
            });
        }
    };
    BackdropContainer.prototype.render = function () {
        var _a = this.props, children = _a.children, _b = _a.animationDuration, animationDuration = _b === void 0 ? 600 : _b;
        var _c = this.state, isLoaded = _c.isLoaded, _d = _c.activeValueType, activeValueType = _d === void 0 ? { value: 'transparent', type: 'color' } : _d, _e = _c.activeTheme, activeTheme = _e === void 0 ? 'default' : _e, previousValueType = _c.previousValueType;
        var contextValues = {
            registerColor: isLoaded && this.colorState.registerColor,
            currentValueType: isLoaded && activeValueType,
            currentTheme: isLoaded && activeTheme,
        };
        var backdropParentContainerClassNames = [
            'reactBackdrop__container',
            activeTheme,
        ].join(' ');
        var templateProps = {
            durationTime: animationDuration,
            store: isLoaded && this.colorState.valuesCache[activeValueType.type],
            current: activeValueType,
            previous: previousValueType,
        };
        var template = {
            image: react_1.default.createElement(presentational_1.ImageBackdrop, tslib_1.__assign({}, templateProps)),
            color: react_1.default.createElement(presentational_1.ColorBackdrop, tslib_1.__assign({}, templateProps)),
        }[isLoaded && activeValueType.type];
        return isLoaded && (react_1.default.createElement(presentational_1.ParentContainer, { className: backdropParentContainerClassNames },
            template,
            react_1.default.createElement(BackdropContext.Provider, { value: tslib_1.__assign({}, contextValues) }, children)));
    };
    return BackdropContainer;
}(react_1.default.Component));
exports.BackdropContainer = BackdropContainer;
var BackdropZone = /** @class */ (function (_super) {
    tslib_1.__extends(BackdropZone, _super);
    function BackdropZone(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            didRender: false,
            hasRegistered: false,
            isActiveZone: false,
            zoneValueType: undefined,
        };
        _this.DOMRef = react_1.default.createRef();
        _this.setZoneActiveState = _this.setZoneActiveState.bind(_this);
        return _this;
    }
    BackdropZone.prototype.setZoneActiveState = function (valueType) {
        var _a = this.state, isActiveZone = _a.isActiveZone, zoneValueType = _a.zoneValueType;
        var zoneUniqueId = JSON.stringify(zoneValueType);
        var valuetypeUniqueId = JSON.stringify(valueType);
        if (zoneUniqueId !== valuetypeUniqueId) {
            if (isActiveZone !== false) {
                this.setState({ isActiveZone: false });
            }
        }
        if (zoneUniqueId === valuetypeUniqueId) {
            if (isActiveZone !== true) {
                this.setState({ isActiveZone: true });
            }
        }
    };
    BackdropZone.prototype.componentDidUpdate = function () {
        var _a = this.props, _b = _a.off, off = _b === void 0 ? false : _b, _c = _a.instant, instant = _c === void 0 ? false : _c, _d = _a.theme, theme = _d === void 0 ? 'default' : _d;
        var _e = this.state, hasRegistered = _e.hasRegistered, zoneValueType = _e.zoneValueType;
        var _f = this.context, registerColor = _f.registerColor, currentValueType = _f.currentValueType;
        console.log('backdropZone here...: ', zoneValueType);
        if (hasRegistered != true && off != true) {
            if (typeof registerColor === 'function') {
                registerColor(zoneValueType, theme, instant, this.DOMRef.current, this.setZoneActiveState);
                this.setState({ hasRegistered: true });
            }
        }
        this.setZoneActiveState(currentValueType);
    };
    BackdropZone.prototype.componentDidMount = function () {
        var _a = this.props, color = _a.color, image = _a.image, video = _a.video;
        this.setState({
            didRender: true,
            zoneValueType: {
                value: color || image || video,
                type: color && 'color' || image && 'image' || video && 'video',
            }
        });
    };
    BackdropZone.prototype.render = function () {
        var children = this.props.children;
        var _a = this.context, currentTheme = _a.currentTheme, currentValueType = _a.currentValueType;
        var _b = this.state, didRender = _b.didRender, isActiveZone = _b.isActiveZone;
        var containerClassNames = [
            'reactBackdrop__zone',
            isActiveZone ? 'active' : '',
        ].join(' ');
        return (react_1.default.createElement(react_1.default.Fragment, null, didRender && (react_1.default.createElement("div", { className: containerClassNames, ref: this.DOMRef }, typeof children === 'function'
            ? children(isActiveZone, currentTheme, currentValueType)
            : children))));
    };
    BackdropZone.contextType = BackdropContext;
    return BackdropZone;
}(react_1.default.Component));
exports.BackdropZone = BackdropZone;
