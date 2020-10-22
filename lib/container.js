"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackdropContainer = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const logic_1 = tslib_1.__importDefault(require("./logic"));
const presentational_1 = require("./presentational");
const context_1 = require("./context");
class BackdropContainer extends react_1.default.PureComponent {
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
            react_1.default.createElement(context_1.BackdropContext.Provider, { value: Object.assign({}, contextValues) },
                react_1.default.createElement(presentational_1.ContentContainer, null, children)),
            template));
    }
}
exports.BackdropContainer = BackdropContainer;
