"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slides = exports.ContentContainer = exports.ParentContainer = void 0;

var React = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

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

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  background-color: ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  background-image: url(\" ", " \");\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  opacity: ", "};\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  transition: all ", "ms ease-out;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  height: 100%;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  z-index: 10;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position:relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ParentContainer = _styledComponents["default"].div(_templateObject());

exports.ParentContainer = ParentContainer;

var ContentContainer = _styledComponents["default"].div(_templateObject2());

exports.ContentContainer = ContentContainer;

var SlidesContainer = _styledComponents["default"].div(_templateObject3());

var SlideStyles = (0, _styledComponents.css)(_templateObject4(), function (_ref) {
  var active = _ref.active;
  return active ? 1 : 0;
}, function (_ref2) {
  var animationTiming = _ref2.animationTiming;
  return animationTiming ? animationTiming : 700;
});

var ImageSlide = _styledComponents["default"].div(_templateObject5(), SlideStyles, function (_ref3) {
  var value = _ref3.value;
  return value;
});

var ColorSlide = _styledComponents["default"].div(_templateObject6(), SlideStyles, function (_ref4) {
  var value = _ref4.value;
  return value;
});

function constructSlide(backdrop, options) {
  var active = options.active,
      animationTiming = options.animationTiming;
  var componentProps = {
    key: backdrop.id,
    value: backdrop.value,
    active: active,
    animationTiming: animationTiming
  };

  switch (backdrop.type) {
    case 'color':
      return /*#__PURE__*/React.createElement(ColorSlide, componentProps);

    case 'image':
      return /*#__PURE__*/React.createElement(ImageSlide, componentProps);
  }
}

var Slides = /*#__PURE__*/function (_PureComponent) {
  _inherits(Slides, _PureComponent);

  var _super = _createSuper(Slides);

  function Slides(props) {
    _classCallCheck(this, Slides);

    return _super.call(this, props);
  } // eslint-disable-next-line


  _createClass(Slides, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$store = _this$props.store,
          store = _this$props$store === void 0 ? new Map() : _this$props$store,
          _this$props$animation = _this$props.animationTiming,
          animationTiming = _this$props$animation === void 0 ? 700 : _this$props$animation,
          current = _this$props.current;
      var slidesList = [];
      store.forEach(function (backdrop) {
        var options = {
          active: current === backdrop.id,
          animationTiming: animationTiming
        };
        slidesList.push(constructSlide(backdrop, options));
      });
      return /*#__PURE__*/React.createElement(SlidesContainer, null, slidesList);
    }
  }]);

  return Slides;
}(React.PureComponent);

exports.Slides = Slides;