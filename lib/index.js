"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackdropContext = exports.BackdropZone = exports.BackdropContainer = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const shortid_1 = tslib_1.__importDefault(require("shortid"));
const logic_1 = tslib_1.__importDefault(require("./logic"));
const presentational_1 = require("./presentational");
const { register, current, previous } = new logic_1.default();
const BackdropContext = react_1.default.createContext({
    register,
    current,
    previous,
});
exports.BackdropContext = BackdropContext;
class BackdropContainer extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: null,
            previous: null,
            isLoaded: false,
        };
        this.updateState = this.updateState.bind(this);
    }
    /* TODO: remove arg and update from backdrop instance */
    updateState(newValue) {
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
            this.backdropState = new logic_1.default(fromTop, defaultValues, this.updateState);
            this.setState({
                current: this.backdropState.current,
                isLoaded: true,
            });
        }
    }
    render() {
        if (!this.state.isLoaded)
            return false;
        const { isLoaded, current, previous } = this.state;
        const { children, animationDuration = 600 } = this.props;
        const { register } = this.backdropState;
        const contextValues = {
            register,
            current,
            previous,
        };
        const templateProps = {
            animationDuration,
            current,
            previous,
        };
        const template = {
            image: react_1.default.createElement(presentational_1.ImageBackdrop, Object.assign({}, templateProps)),
            color: react_1.default.createElement(presentational_1.ColorBackdrop, Object.assign({}, templateProps)),
        }[current.type];
        return isLoaded && (react_1.default.createElement(presentational_1.ParentContainer, { className: 'reactBackdrop__container' },
            react_1.default.createElement(BackdropContext.Provider, { value: Object.assign({}, contextValues) },
                react_1.default.createElement(presentational_1.ContentContainer, null, children)),
            template));
    }
}
exports.BackdropContainer = BackdropContainer;
class BackdropZone extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.id = shortid_1.default.generate();
        this.state = {
            didRender: false,
            hasRegistered: false,
            isActive: false,
        };
        this.Element = react_1.default.createRef();
        this.setZoneActiveState = this.setZoneActiveState.bind(this);
    }
    setZoneActiveState() {
        const { isActive } = this.state;
        const { current } = this.context;
        if (this.id !== current.id) {
            if (isActive !== false) {
                this.setState({ isActive: false });
            }
        }
        if (this.id === current.id) {
            if (isActive !== true) {
                this.setState({ isActive: true });
            }
        }
    }
    componentDidUpdate() {
        const { type, value, theme, off, instant } = this.props;
        const { hasRegistered, } = this.state;
        const { register, current, } = this.context;
        if (!hasRegistered) {
            if (typeof register === 'function') {
                const registerProps = {
                    type,
                    value,
                    theme,
                    id: this.id,
                    off,
                    instant,
                };
                register(registerProps, this.Element.current, this.setZoneActiveState);
                this.setState({ hasRegistered: true });
            }
        }
        this.setZoneActiveState();
    }
    componentDidMount() {
        this.setState({
            didRender: true,
        });
    }
    render() {
        const { children } = this.props;
        const { current: { theme, value } } = this.context;
        const { didRender, isActive } = this.state;
        const containerClassNames = [
            'reactBackdrop__zone',
            isActive ? 'active' : '',
        ].join(' ');
        return (react_1.default.createElement(react_1.default.Fragment, null, didRender && (react_1.default.createElement("div", { className: containerClassNames, ref: this.Element }, typeof children === 'function'
            ? children(isActive, theme, value)
            : children))));
    }
}
exports.BackdropZone = BackdropZone;
BackdropZone.contextType = BackdropContext;
