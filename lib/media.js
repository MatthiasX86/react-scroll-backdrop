"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageBackdrop = exports.ColorBackdrop = void 0;

var React = _interopRequireWildcard(require("react"));

var _shortid = _interopRequireDefault(require("shortid"));

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function createZoneComponent(backdropType) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_React$PureComponent) {
    _inherits(BackdropZone, _React$PureComponent);

    var _super = _createSuper(BackdropZone);

    function BackdropZone(props) {
      var _this;

      _classCallCheck(this, BackdropZone);

      _this = _super.call(this, props);

      _defineProperty(_assertThisInitialized(_this), "Element", void 0);

      _defineProperty(_assertThisInitialized(_this), "id", _shortid["default"].generate());

      _this.state = {
        didRender: false,
        hasRegistered: false,
        isActive: false
      };
      _this.Element = /*#__PURE__*/(0, React.createRef)();
      _this.setZoneActiveState = _this.setZoneActiveState.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(BackdropZone, [{
      key: "setZoneActiveState",
      value: function setZoneActiveState() {
        var isActive = this.state.isActive;
        var current = this.context.current;

        if (this.id !== current.id && isActive !== false) {
          this.setState({
            isActive: false
          });
        }

        if (this.id === current.id && isActive !== true) {
          this.setState({
            isActive: true
          });
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var _this$props = this.props,
            value = _this$props.value,
            theme = _this$props.theme,
            off = _this$props.off,
            instant = _this$props.instant;
        var hasRegistered = this.state.hasRegistered;
        var register = this.context.register;

        if (!hasRegistered) {
          if (typeof register === 'function') {
            var registerValues = {
              type: backdropType,
              value: value,
              theme: theme,
              id: this.id,
              element: this.Element.current,
              renderCallback: this.setZoneActiveState
            };
            var registerOptions = {
              off: off,
              instant: instant
            };
            register(registerValues, registerOptions);
            this.setState({
              hasRegistered: true
            });
          }
        }

        this.setZoneActiveState();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.setState({
          didRender: true
        });
      }
    }, {
      key: "render",
      value: function render() {
        var children = this.props.children;
        var _this$context$current = this.context.current,
            theme = _this$context$current.theme,
            value = _this$context$current.value;
        var _this$state = this.state,
            didRender = _this$state.didRender,
            isActive = _this$state.isActive;
        var containerClassNames = ['reactBackdrop__zone', isActive ? 'active' : ''].join(' ');
        return /*#__PURE__*/React.createElement(React.Fragment, null, didRender && /*#__PURE__*/React.createElement("div", {
          className: containerClassNames,
          ref: this.Element
        }, typeof children === 'function' ? children(isActive, theme, value) : children));
      }
    }]);

    return BackdropZone;
  }(React.PureComponent), _defineProperty(_class, "contextType", _context.BackdropContext), _temp;
}
/* ======= Media Components ========
 * ================================*/


var ColorBackdrop = createZoneComponent('color');
exports.ColorBackdrop = ColorBackdrop;
var ImageBackdrop = createZoneComponent('image');
exports.ImageBackdrop = ImageBackdrop;