"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackdropImage = exports.BackdropColor = exports.BackdropZone = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const shortid_1 = tslib_1.__importDefault(require("shortid"));
const _1 = require(".");
class BackdropZone extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.id = shortid_1.default.generate();
        this.state = {
            didRender: false,
            hasRegistered: false,
            isActive: false,
        };
        this.Element = react_1.createRef();
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
        const { hasRegistered } = this.state;
        const { register } = this.context;
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
BackdropZone.contextType = _1.BackdropContext;
function createZoneComponent(componentType) {
    var _a;
    // eslint-disable-next-line 
    return _a = class extends react_1.default.PureComponent {
            constructor(props) {
                super(props);
                this.id = shortid_1.default.generate();
                this.state = {
                    didRender: false,
                    hasRegistered: false,
                    isActive: false,
                };
                this.Element = react_1.createRef();
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
                const { value, theme, off, instant } = this.props;
                const { hasRegistered } = this.state;
                const { register } = this.context;
                if (!hasRegistered) {
                    if (typeof register === 'function') {
                        const registerProps = {
                            type: componentType,
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
        },
        _a.contextType = _1.BackdropContext,
        _a;
}
exports.BackdropColor = createZoneComponent('color');
exports.BackdropImage = createZoneComponent('image');
