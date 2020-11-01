"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackdropContainer = void 0;

var _react = _interopRequireDefault(require("react"));

var _context = require("./context");

var _app = _interopRequireDefault(require("./app"));

var _ui = require("./ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BackdropContainer = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(BackdropContainer, _React$PureComponent);

  var _super = _createSuper(BackdropContainer);

  function BackdropContainer(props) {
    var _this;

    _classCallCheck(this, BackdropContainer);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "backdropState", void 0);

    _this.state = {
      current: null,
      previous: null,
      isLoaded: false
    };
    _this.updateState = _this.updateState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(BackdropContainer, [{
    key: "updateState",
    value: function updateState() {
      var isLoaded = this.state.isLoaded;

      if (isLoaded) {
        var _this$backdropState = this.backdropState,
            current = _this$backdropState.current,
            previous = _this$backdropState.previous;
        this.setState({
          previous: previous,
          current: current
        });
      }
    } // eslint-disable-next-line 

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          scrollPosition = _this$props.scrollPosition,
          defaultValues = _this$props.defaultValues;
      var isLoaded = this.state.isLoaded;
      var options = {
        defaultValues: defaultValues,
        scrollPosition: scrollPosition
      };

      if (!isLoaded) {
        this.backdropState = new _app["default"](this.updateState, options);
        this.setState({
          current: this.backdropState.current,
          previous: this.backdropState.previous,
          isLoaded: true
        });
      }
    } // eslint-disable-next-line 

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.backdropState.removeScrollEvent();
    } // eslint-disable-next-line 

  }, {
    key: "render",
    value: function render() {
      if (!this.state.isLoaded) return false;
      var _this$state = this.state,
          isLoaded = _this$state.isLoaded,
          current = _this$state.current,
          previous = _this$state.previous;
      var _this$props2 = this.props,
          children = _this$props2.children,
          _this$props2$animatio = _this$props2.animationDuration,
          animationDuration = _this$props2$animatio === void 0 ? 600 : _this$props2$animatio;
      var _this$backdropState2 = this.backdropState,
          register = _this$backdropState2.register,
          remove = _this$backdropState2.remove;
      var contextValues = {
        register: register,
        current: current,
        previous: previous,
        remove: remove
      };
      return isLoaded && /*#__PURE__*/_react["default"].createElement(_ui.ParentContainer, {
        className: "reactBackdrop__container"
      }, /*#__PURE__*/_react["default"].createElement(_ui.Slides, {
        store: this.backdropState.store,
        current: current.id,
        animationTiming: animationDuration
      }), /*#__PURE__*/_react["default"].createElement(_context.BackdropContext.Provider, {
        value: _objectSpread({}, contextValues)
      }, /*#__PURE__*/_react["default"].createElement(_ui.ContentContainer, null, children)));
    }
  }]);

  return BackdropContainer;
}(_react["default"].PureComponent);

exports.BackdropContainer = BackdropContainer;