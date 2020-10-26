"use strict";

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactHelmet = require("react-helmet");

var _animejs = _interopRequireDefault(require("animejs"));

var _index = require("../../lib/index.js");

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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Container = function Container(_ref) {
  var children = _ref.children,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? '' : _ref$position;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "demo__container ".concat(position)
  }, children);
};

var ImageFrame = function ImageFrame(_ref2) {
  var active = _ref2.active,
      image = _ref2.image,
      position = _ref2.position,
      color = _ref2.color,
      theme = _ref2.theme;
  var containerClasses = ['demo__imageFrame_container', position === 'right' ? 'right' : 'left', active ? 'active' : ''].join(' ');
  var decorContainerClasses = ['demo__imageFrame_decorative', theme].join(' ');
  var backgroundColorStyle = {
    backgroundColor: "".concat(color ? color : 'transparent')
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: containerClasses
  }, /*#__PURE__*/_react["default"].createElement("figure", null, /*#__PURE__*/_react["default"].createElement("img", {
    className: "demo__imageFrame_image",
    src: image,
    alt: ""
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: decorContainerClasses
  }));
};
/* ================
 *    Plant demo
 * ================*/


var SplashSection = function SplashSection() {
  return /*#__PURE__*/_react["default"].createElement("section", {
    className: "demo__splash_container"
  }, /*#__PURE__*/_react["default"].createElement(Container, {
    position: "center"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "demo__splash_title"
  }, "Scroll Down"), /*#__PURE__*/_react["default"].createElement("img", {
    src: "assets/arrow.svg",
    alt: ""
  })));
};

var PlantSection = function PlantSection(_ref3) {
  var isActive = _ref3.isActive,
      backdropValue = _ref3.backdropValue,
      backdropTheme = _ref3.backdropTheme;
  return /*#__PURE__*/_react["default"].createElement("section", {
    className: "demo__plant_container"
  }, /*#__PURE__*/_react["default"].createElement(Container, {
    position: "center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "demo__plant_textBox"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "demo__plant_smallHeader"
  }, "Small header"), /*#__PURE__*/_react["default"].createElement("h1", {
    className: "demo__plant_title"
  }, "Header"), /*#__PURE__*/_react["default"].createElement("h3", {
    className: "demo__plant_subtitle"
  }, "subtitle"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "demo__plant_body"
  }, "Bacon ipsum dolor amet buffalo nisi andouille ball tip kielbasa pork loin, exercitation jerky filet mignon excepteur doner do pork chop."), /*#__PURE__*/_react["default"].createElement("div", {
    className: "demo__plant_button"
  }, "Learn more"))), /*#__PURE__*/_react["default"].createElement("img", {
    className: "demo__plant_img",
    src: "assets/plant.svg",
    alt: ""
  }));
};

var PinkBricks = function PinkBricks(_ref4) {
  var isActive = _ref4.isActive,
      backdropValue = _ref4.backdropValue,
      backdropTheme = _ref4.backdropTheme;
  return /*#__PURE__*/_react["default"].createElement("section", {
    className: "demo__pinkBricks_container"
  }, /*#__PURE__*/_react["default"].createElement(Container, {
    position: "center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "demo__pinkBricks_textBox"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "demo__pinkBricks_title"
  }, "The outside view is better"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "demo__pinkBricks_body"
  }, "...But you already know that")), /*#__PURE__*/_react["default"].createElement(ImageFrame, {
    active: isActive,
    image: "assets/pinkBricks.jpg",
    position: "left",
    color: backdropValue.value,
    theme: backdropTheme
  })));
};

var GraySkies = function GraySkies(_ref5) {
  var isActive = _ref5.isActive,
      backdropValue = _ref5.backdropValue,
      backdropTheme = _ref5.backdropTheme;
  return /*#__PURE__*/_react["default"].createElement("section", {
    className: "demo__graySkies_container"
  }, /*#__PURE__*/_react["default"].createElement(Container, {
    position: "center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "demo__graySkies_textBox"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "demo__graySkies_title"
  }, "The outside view is better"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "demo__graySkies_body"
  }, "...But you already know that")), /*#__PURE__*/_react["default"].createElement(ImageFrame, {
    active: isActive,
    image: "assets/cloudCover.jpg",
    position: "right",
    color: backdropValue.value,
    theme: backdropTheme
  })));
};

var RedHands = function RedHands(_ref6) {
  var isActive = _ref6.isActive,
      backdropValue = _ref6.backdropValue,
      backdropTheme = _ref6.backdropTheme;
  return /*#__PURE__*/_react["default"].createElement("section", {
    className: "demo__redHands_container"
  }, /*#__PURE__*/_react["default"].createElement(Container, {
    position: "center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "demo__redHands_textBox"
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "demo__redHands_title"
  }, "The outside view is better"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "demo__redHands_body"
  }, "...But you already know that")), /*#__PURE__*/_react["default"].createElement(ImageFrame, {
    active: isActive,
    image: "assets/hands.jpg",
    position: "left",
    color: backdropValue.value,
    theme: backdropTheme
  })));
};

var Bridge = function Bridge(_ref7) {
  var isActive = _ref7.isActive,
      backdropValue = _ref7.backdropValue,
      backdropTheme = _ref7.backdropTheme;
  var textClassNames = ['demo__bridge_text', isActive ? 'active' : ''].join(' ');
  var textNode = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loaded = _useState2[0],
      declareLoaded = _useState2[1];

  if (!loaded) declareLoaded(true);

  if (loaded && textNode.current) {
    var el = textNode.current;
    el.innerHTML = el.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    _animejs["default"].timeline({
      loop: false
    }).add({
      targets: '.demo__bridge_text .letter',
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: function delay(el, i) {
        return 500 + 30 * i;
      }
    }).add({
      targets: '.demo__bridge_text .letter',
      translateX: [0, -30],
      opacity: [1, 1],
      easing: "easeInExpo",
      duration: 1100,
      delay: function delay(el, i) {
        return 100 + 30 * i;
      }
    });
  }

  return /*#__PURE__*/_react["default"].createElement("section", {
    className: "demo__bridge_container"
  }, /*#__PURE__*/_react["default"].createElement(Container, {
    position: "center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: textNode,
    className: textClassNames
  }, "The outside view is better...")));
};

var Layout = /*#__PURE__*/function (_React$Component) {
  _inherits(Layout, _React$Component);

  var _super = _createSuper(Layout);

  function Layout(props) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _super.call(this, props);
    _this.state = {
      hasLoaded: false
    };
    return _this;
  }

  _createClass(Layout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        hasLoaded: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return /*#__PURE__*/_react["default"].createElement(_index.BackdropContainer, {
        defaultValue: {
          value: "transparent",
          type: 'color'
        },
        fromTop: 350,
        animationDuration: 800
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "layout"
      }, /*#__PURE__*/_react["default"].createElement(_reactHelmet.Helmet, null, /*#__PURE__*/_react["default"].createElement("link", {
        href: "https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Ramaraja&display=swap",
        rel: "stylesheet"
      }), /*#__PURE__*/_react["default"].createElement("link", {
        href: "https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap",
        rel: "stylesheet"
      })), children));
    }
  }]);

  return Layout;
}(_react["default"].Component);

var Content = function Content() {
  return /*#__PURE__*/_react["default"].createElement(Layout, null, /*#__PURE__*/_react["default"].createElement(_index.BackdropColor, {
    value: "#252629",
    instant: true
  }, "this is a test", /*#__PURE__*/_react["default"].createElement(SplashSection, null)), /*#__PURE__*/_react["default"].createElement(_index.BackdropColor, {
    value: "#CD9CAE",
    theme: "dark"
  }, function (active, currentTheme, currentValue) {
    return /*#__PURE__*/_react["default"].createElement(PinkBricks, {
      isActive: active,
      backdropValue: currentValue,
      backdropTheme: currentTheme
    });
  }), /*#__PURE__*/_react["default"].createElement(_index.BackdropColor, {
    value: "#414953",
    theme: "light"
  }, function (active, currentTheme, currentValue) {
    return /*#__PURE__*/_react["default"].createElement(GraySkies, {
      isActive: active,
      backdropValue: currentValue,
      backdropTheme: currentTheme
    });
  }), /*#__PURE__*/_react["default"].createElement(_index.BackdropColor, {
    color: "#BB1702",
    theme: "light"
  }, function (active, currentTheme, currentValue) {
    return /*#__PURE__*/_react["default"].createElement(RedHands, {
      isActive: active,
      backdropValue: currentValue,
      backdropTheme: currentTheme
    });
  }), /*#__PURE__*/_react["default"].createElement(_index.BackdropZone, {
    image: 'assets/bridge.jpg',
    theme: "dark"
  }, function (active, currentTheme, currentValue) {
    return /*#__PURE__*/_react["default"].createElement(Bridge, {
      isActive: active,
      backdropValue: currentValue,
      backdropTheme: currentTheme
    });
  }));
};
/*  */


_reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(Content, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8udHN4Il0sIm5hbWVzIjpbIkNvbnRhaW5lciIsImNoaWxkcmVuIiwicG9zaXRpb24iLCJJbWFnZUZyYW1lIiwiYWN0aXZlIiwiaW1hZ2UiLCJjb2xvciIsInRoZW1lIiwiY29udGFpbmVyQ2xhc3NlcyIsImpvaW4iLCJkZWNvckNvbnRhaW5lckNsYXNzZXMiLCJiYWNrZ3JvdW5kQ29sb3JTdHlsZSIsImJhY2tncm91bmRDb2xvciIsIlNwbGFzaFNlY3Rpb24iLCJQbGFudFNlY3Rpb24iLCJpc0FjdGl2ZSIsImJhY2tkcm9wVmFsdWUiLCJiYWNrZHJvcFRoZW1lIiwiUGlua0JyaWNrcyIsInZhbHVlIiwiR3JheVNraWVzIiwiUmVkSGFuZHMiLCJCcmlkZ2UiLCJ0ZXh0Q2xhc3NOYW1lcyIsInRleHROb2RlIiwibG9hZGVkIiwiZGVjbGFyZUxvYWRlZCIsImN1cnJlbnQiLCJlbCIsImlubmVySFRNTCIsInRleHRDb250ZW50IiwicmVwbGFjZSIsImFuaW1lIiwidGltZWxpbmUiLCJsb29wIiwiYWRkIiwidGFyZ2V0cyIsInRyYW5zbGF0ZVgiLCJ0cmFuc2xhdGVaIiwib3BhY2l0eSIsImVhc2luZyIsImR1cmF0aW9uIiwiZGVsYXkiLCJpIiwiTGF5b3V0IiwicHJvcHMiLCJzdGF0ZSIsImhhc0xvYWRlZCIsInNldFN0YXRlIiwidHlwZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiQ29udGVudCIsImN1cnJlbnRUaGVtZSIsImN1cnJlbnRWYWx1ZSIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0NBLElBQU1BLFNBQTJCLEdBQUcsU0FBOUJBLFNBQThCLE9BQWlDO0FBQUEsTUFBOUJDLFFBQThCLFFBQTlCQSxRQUE4QjtBQUFBLDJCQUFwQkMsUUFBb0I7QUFB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QUFULGVBQWdCLGdDQUFDLE9BQUQsT0FBaEIsRUFBNEJDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixLQUF4QixDQUE1QiIsImZpbGUiOiJkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtIZWxtZXR9IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgYW5pbWUgZnJvbSAnYW5pbWVqcyc7XG5cbi8qIGFzc2V0cyAqL1xuaW1wb3J0IHtcbiAgQmFja2Ryb3BDb250YWluZXIsXG4gIEJhY2tkcm9wWm9uZSxcbiAgQmFja2Ryb3BDb2xvcixcbiAgQmFja2Ryb3BJbWFnZSxcbiAgQmFja2Ryb3BDb250ZXh0XG59IGZyb20gJy4uLy4uL2xpYi9pbmRleC5qcyc7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PVxuICogICBsYXlvdXQgY29tcG9uZW50c1xuICogPT09PT09PT09PT09PT09PT09PT09Ki9cblxuaW50ZXJmYWNlIElNUHJvcHMge1xuICBhY3RpdmU/OiBib29sZWFuO1xuICBpbWFnZTogc3RyaW5nO1xuICBjb2xvcj86IHN0cmluZztcbiAgcG9zaXRpb246ICdyaWdodCcgfCAnbGVmdCdcbiAgdGhlbWU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIENQcm9wcyB7XG4gIGNoaWxkcmVuOiBhbnk7XG4gIHBvc2l0aW9uOiAnJyB8ICdjZW50ZXInO1xufVxuXG5pbnRlcmZhY2UgU1Byb3BzIHtcbiAgaXNBY3RpdmU/OiBib29sZWFuO1xuICBiYWNrZHJvcFZhbHVlPzoge1xuICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nXG4gIH07XG4gIGJhY2tkcm9wVGhlbWU/OiBzdHJpbmc7XG59XG5cbmNvbnN0IENvbnRhaW5lcjogUmVhY3QuRkM8Q1Byb3BzPiA9ICh7IGNoaWxkcmVuLCBwb3NpdGlvbiA9ICcnIH0pID0+IHtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXsgYGRlbW9fX2NvbnRhaW5lciAke3Bvc2l0aW9ufWAgfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5jb25zdCBJbWFnZUZyYW1lOiBSZWFjdC5GQzxJTVByb3BzPiA9ICh7IGFjdGl2ZSwgaW1hZ2UsIHBvc2l0aW9uLCBjb2xvciwgdGhlbWUgfSkgPT4ge1xuXG4gIGNvbnN0IGNvbnRhaW5lckNsYXNzZXMgPSBbXG4gICAgJ2RlbW9fX2ltYWdlRnJhbWVfY29udGFpbmVyJyxcbiAgICBwb3NpdGlvbiA9PT0gJ3JpZ2h0JyA/ICdyaWdodCcgOiAnbGVmdCcsXG4gICAgYWN0aXZlID8gJ2FjdGl2ZScgOiAnJyxcbiAgXS5qb2luKCcgJyk7XG5cbiAgY29uc3QgZGVjb3JDb250YWluZXJDbGFzc2VzID0gW1xuICAgICdkZW1vX19pbWFnZUZyYW1lX2RlY29yYXRpdmUnLFxuICAgIHRoZW1lLFxuICBdLmpvaW4oJyAnKTtcblxuICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JTdHlsZSA9IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGAke2NvbG9yID8gY29sb3IgOiAndHJhbnNwYXJlbnQnfWAsXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjb250YWluZXJDbGFzc2VzfT5cbiAgICAgIDxmaWd1cmU+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBjbGFzc05hbWU9XCJkZW1vX19pbWFnZUZyYW1lX2ltYWdlXCJcbiAgICAgICAgICBzcmM9e2ltYWdlfVxuICAgICAgICAgIGFsdD1cIlwiXG4gICAgICAgIC8+XG4gICAgICA8L2ZpZ3VyZT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtkZWNvckNvbnRhaW5lckNsYXNzZXN9IC8+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuLyogPT09PT09PT09PT09PT09PVxuICogICAgUGxhbnQgZGVtb1xuICogPT09PT09PT09PT09PT09PSovXG5cbmNvbnN0IFNwbGFzaFNlY3Rpb24gPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZGVtb19fc3BsYXNoX2NvbnRhaW5lclwiPlxuICAgICAgPENvbnRhaW5lciBwb3NpdGlvbj1cImNlbnRlclwiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkZW1vX19zcGxhc2hfdGl0bGVcIj5cbiAgICAgICAgICBTY3JvbGwgRG93blxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBzcmM9XCJhc3NldHMvYXJyb3cuc3ZnXCJcbiAgICAgICAgICBhbHQ9XCJcIlxuICAgICAgICAvPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgPC9zZWN0aW9uPlxuICApXG59XG5cbmNvbnN0IFBsYW50U2VjdGlvbjogUmVhY3QuRkM8U1Byb3BzPiA9ICh7aXNBY3RpdmUsIGJhY2tkcm9wVmFsdWUsIGJhY2tkcm9wVGhlbWV9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZGVtb19fcGxhbnRfY29udGFpbmVyXCI+XG4gICAgICA8Q29udGFpbmVyIHBvc2l0aW9uPVwiY2VudGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVtb19fcGxhbnRfdGV4dEJveFwiPlxuICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJkZW1vX19wbGFudF9zbWFsbEhlYWRlclwiPlNtYWxsIGhlYWRlcjwvaDQ+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImRlbW9fX3BsYW50X3RpdGxlXCI+SGVhZGVyPC9oMT5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZGVtb19fcGxhbnRfc3VidGl0bGVcIj5zdWJ0aXRsZTwvaDM+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGVtb19fcGxhbnRfYm9keVwiPlxuICAgICAgICAgICAgQmFjb24gaXBzdW0gZG9sb3IgYW1ldCBidWZmYWxvIG5pc2kgYW5kb3VpbGxlIGJhbGxcbiAgICAgICAgICAgIHRpcCBraWVsYmFzYSBwb3JrIGxvaW4sIGV4ZXJjaXRhdGlvbiBqZXJreSBmaWxldFxuICAgICAgICAgICAgbWlnbm9uIGV4Y2VwdGV1ciBkb25lciBkbyBwb3JrIGNob3AuXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVtb19fcGxhbnRfYnV0dG9uXCI+XG4gICAgICAgICAgICBMZWFybiBtb3JlXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9Db250YWluZXI+XG4gICAgICA8aW1nXG4gICAgICAgIGNsYXNzTmFtZT1cImRlbW9fX3BsYW50X2ltZ1wiXG4gICAgICAgIHNyYz1cImFzc2V0cy9wbGFudC5zdmdcIlxuICAgICAgICBhbHQ9XCJcIlxuICAgICAgLz5cbiAgICA8L3NlY3Rpb24+XG4gIClcbn1cblxuY29uc3QgUGlua0JyaWNrczogUmVhY3QuRkM8U1Byb3BzPiA9ICh7IGlzQWN0aXZlLCBiYWNrZHJvcFZhbHVlLCBiYWNrZHJvcFRoZW1lfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImRlbW9fX3BpbmtCcmlja3NfY29udGFpbmVyXCI+XG4gICAgICA8Q29udGFpbmVyIHBvc2l0aW9uPSdjZW50ZXInPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlbW9fX3BpbmtCcmlja3NfdGV4dEJveFwiPlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJkZW1vX19waW5rQnJpY2tzX3RpdGxlXCI+VGhlIG91dHNpZGUgdmlldyBpcyBiZXR0ZXI8L2gxPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlbW9fX3BpbmtCcmlja3NfYm9keVwiPi4uLkJ1dCB5b3UgYWxyZWFkeSBrbm93IHRoYXQ8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8SW1hZ2VGcmFtZVxuICAgICAgICAgIGFjdGl2ZT17aXNBY3RpdmV9XG4gICAgICAgICAgaW1hZ2U9XCJhc3NldHMvcGlua0JyaWNrcy5qcGdcIlxuICAgICAgICAgIHBvc2l0aW9uPSdsZWZ0J1xuICAgICAgICAgIGNvbG9yPXtiYWNrZHJvcFZhbHVlLnZhbHVlfVxuICAgICAgICAgIHRoZW1lPXtiYWNrZHJvcFRoZW1lfVxuICAgICAgICAvPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgPC9zZWN0aW9uPlxuICApXG59XG5cbmNvbnN0IEdyYXlTa2llczogUmVhY3QuRkM8U1Byb3BzPiA9ICh7IGlzQWN0aXZlLCBiYWNrZHJvcFZhbHVlLCBiYWNrZHJvcFRoZW1lfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImRlbW9fX2dyYXlTa2llc19jb250YWluZXJcIj5cbiAgICAgIDxDb250YWluZXIgcG9zaXRpb249J2NlbnRlcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVtb19fZ3JheVNraWVzX3RleHRCb3hcIj5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiZGVtb19fZ3JheVNraWVzX3RpdGxlXCI+VGhlIG91dHNpZGUgdmlldyBpcyBiZXR0ZXI8L2gxPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlbW9fX2dyYXlTa2llc19ib2R5XCI+Li4uQnV0IHlvdSBhbHJlYWR5IGtub3cgdGhhdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxJbWFnZUZyYW1lXG4gICAgICAgICAgYWN0aXZlPXtpc0FjdGl2ZX1cbiAgICAgICAgICBpbWFnZT1cImFzc2V0cy9jbG91ZENvdmVyLmpwZ1wiXG4gICAgICAgICAgcG9zaXRpb249J3JpZ2h0J1xuICAgICAgICAgIGNvbG9yPXtiYWNrZHJvcFZhbHVlLnZhbHVlfVxuICAgICAgICAgIHRoZW1lPXtiYWNrZHJvcFRoZW1lfVxuICAgICAgICAvPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgPC9zZWN0aW9uPlxuICApXG59XG5cbmNvbnN0IFJlZEhhbmRzOiBSZWFjdC5GQzxTUHJvcHM+ID0gKHtpc0FjdGl2ZSwgYmFja2Ryb3BWYWx1ZSwgYmFja2Ryb3BUaGVtZX0pID0+IHtcbiAgcmV0dXJuICAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZGVtb19fcmVkSGFuZHNfY29udGFpbmVyXCI+XG4gICAgICA8Q29udGFpbmVyIHBvc2l0aW9uPVwiY2VudGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVtb19fcmVkSGFuZHNfdGV4dEJveFwiPlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJkZW1vX19yZWRIYW5kc190aXRsZVwiPlRoZSBvdXRzaWRlIHZpZXcgaXMgYmV0dGVyPC9oMT5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZW1vX19yZWRIYW5kc19ib2R5XCI+Li4uQnV0IHlvdSBhbHJlYWR5IGtub3cgdGhhdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxJbWFnZUZyYW1lXG4gICAgICAgICAgYWN0aXZlPXtpc0FjdGl2ZX1cbiAgICAgICAgICBpbWFnZT1cImFzc2V0cy9oYW5kcy5qcGdcIlxuICAgICAgICAgIHBvc2l0aW9uPSdsZWZ0J1xuICAgICAgICAgIGNvbG9yPXtiYWNrZHJvcFZhbHVlLnZhbHVlfVxuICAgICAgICAgIHRoZW1lPXtiYWNrZHJvcFRoZW1lfVxuICAgICAgICAvPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgPC9zZWN0aW9uPlxuICApXG59XG5cbmNvbnN0IEJyaWRnZTogUmVhY3QuU0ZDPFNQcm9wcz4gPSAoe2lzQWN0aXZlLCBiYWNrZHJvcFZhbHVlLCBiYWNrZHJvcFRoZW1lfSkgPT4ge1xuXG4gIGNvbnN0IHRleHRDbGFzc05hbWVzID0gW1xuICAgICdkZW1vX19icmlkZ2VfdGV4dCcsXG4gICAgaXNBY3RpdmUgPyAnYWN0aXZlJyA6ICcnLFxuICBdLmpvaW4oJyAnKTtcblxuICBsZXQgdGV4dE5vZGUgPSB1c2VSZWYobnVsbCk7XG5cbiAgY29uc3QgW2xvYWRlZCwgZGVjbGFyZUxvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgaWYoIWxvYWRlZCkgZGVjbGFyZUxvYWRlZCh0cnVlKTtcblxuICBpZihsb2FkZWQgJiYgdGV4dE5vZGUuY3VycmVudCkge1xuICAgIGNvbnN0IGVsID0gdGV4dE5vZGUuY3VycmVudDtcblxuICAgIGVsLmlubmVySFRNTCA9IGVsXG4gICAgICAudGV4dENvbnRlbnRcbiAgICAgIC5yZXBsYWNlKC9cXFMvZywgXCI8c3BhbiBjbGFzcz0nbGV0dGVyJz4kJjwvc3Bhbj5cIik7XG5cbiAgICBhbmltZS50aW1lbGluZSh7bG9vcDogZmFsc2V9KVxuICAgICAgLmFkZCh7XG4gICAgICAgIHRhcmdldHM6ICcuZGVtb19fYnJpZGdlX3RleHQgLmxldHRlcicsXG4gICAgICAgIHRyYW5zbGF0ZVg6IFs0MCwwXSxcbiAgICAgICAgdHJhbnNsYXRlWjogMCxcbiAgICAgICAgb3BhY2l0eTogWzAsMV0sXG4gICAgICAgIGVhc2luZzogXCJlYXNlT3V0RXhwb1wiLFxuICAgICAgICBkdXJhdGlvbjogMTIwMCxcbiAgICAgICAgZGVsYXk6IChlbCwgaSkgPT4gNTAwICsgMzAgKiBpXG4gICAgICB9KS5hZGQoe1xuICAgICAgICB0YXJnZXRzOiAnLmRlbW9fX2JyaWRnZV90ZXh0IC5sZXR0ZXInLFxuICAgICAgICB0cmFuc2xhdGVYOiBbMCwtMzBdLFxuICAgICAgICBvcGFjaXR5OiBbMSwxXSxcbiAgICAgICAgZWFzaW5nOiBcImVhc2VJbkV4cG9cIixcbiAgICAgICAgZHVyYXRpb246IDExMDAsXG4gICAgICAgIGRlbGF5OiAoZWwsIGkpID0+IDEwMCArIDMwICogaVxuICAgICAgfSk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImRlbW9fX2JyaWRnZV9jb250YWluZXJcIj5cbiAgICAgIDxDb250YWluZXIgcG9zaXRpb249XCJjZW50ZXJcIj5cbiAgICAgICAgPGRpdiByZWY9e3RleHROb2RlfSBjbGFzc05hbWU9e3RleHRDbGFzc05hbWVzfT5UaGUgb3V0c2lkZSB2aWV3IGlzIGJldHRlci4uLjwvZGl2PlxuICAgICAgPC9Db250YWluZXI+XG4gICAgPC9zZWN0aW9uPlxuICApXG59XG5cbmludGVyZmFjZSBMUHJvcHMge1xuICBjaGlsZHJlbjogYW55O1xufVxuXG5pbnRlcmZhY2UgTFN0YXRlIHtcbiAgaGFzTG9hZGVkOiBib29sZWFuO1xufVxuXG5jbGFzcyBMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8TFByb3BzLCBMU3RhdGU+IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaGFzTG9hZGVkOiBmYWxzZSxcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtoYXNMb2FkZWQ6IHRydWV9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEJhY2tkcm9wQ29udGFpbmVyXG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXt7IHZhbHVlOiBcInRyYW5zcGFyZW50XCIsIHR5cGU6ICdjb2xvcicgfX1cbiAgICAgICAgICBmcm9tVG9wPXszNTB9XG4gICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb249ezgwMH1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsYXlvdXQnPlxuICAgICAgICAgICAgPEhlbG1ldD5cbiAgICAgICAgICAgICAgPGxpbmtcbiAgICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVBsYXlmYWlyK0Rpc3BsYXk6NDAwLDcwMHxSYW1hcmFqYSZkaXNwbGF5PXN3YXBcIlxuICAgICAgICAgICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8bGlua1xuICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9UGVybWFuZW50K01hcmtlciZkaXNwbGF5PXN3YXBcIlxuICAgICAgICAgICAgICAgIHJlbD1cInN0eWxlc2hlZXRcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9IZWxtZXQ+XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQmFja2Ryb3BDb250YWluZXI+XG4gICAgKVxuICB9XG59XG5cbmNvbnN0IENvbnRlbnQgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPExheW91dD5cblxuICAgICAgICA8QmFja2Ryb3BDb2xvciB2YWx1ZT1cIiMyNTI2MjlcIiBpbnN0YW50PXt0cnVlfT5cbiAgICAgICAgICB0aGlzIGlzIGEgdGVzdFxuICAgICAgICAgIDxTcGxhc2hTZWN0aW9uIC8+XG4gICAgICAgIDwvQmFja2Ryb3BDb2xvcj5cblxuICAgICAgICA8QmFja2Ryb3BDb2xvciB2YWx1ZT1cIiNDRDlDQUVcIiB0aGVtZT1cImRhcmtcIj5cbiAgICAgICAgICB7KCBhY3RpdmUsIGN1cnJlbnRUaGVtZSwgY3VycmVudFZhbHVlICkgPT5cbiAgICAgICAgICAgIDxQaW5rQnJpY2tzXG4gICAgICAgICAgICAgIGlzQWN0aXZlPXthY3RpdmV9XG4gICAgICAgICAgICAgIGJhY2tkcm9wVmFsdWU9e2N1cnJlbnRWYWx1ZX1cbiAgICAgICAgICAgICAgYmFja2Ryb3BUaGVtZT17Y3VycmVudFRoZW1lfVxuICAgICAgICAgICAgLz59XG4gICAgICAgIDwvQmFja2Ryb3BDb2xvcj5cblxuICAgICAgICA8QmFja2Ryb3BDb2xvciB2YWx1ZT1cIiM0MTQ5NTNcIiB0aGVtZT1cImxpZ2h0XCI+XG4gICAgICAgICAgeyggYWN0aXZlLCBjdXJyZW50VGhlbWUsIGN1cnJlbnRWYWx1ZSApID0+XG4gICAgICAgICAgICA8R3JheVNraWVzIFxuICAgICAgICAgICAgICBpc0FjdGl2ZT17YWN0aXZlfVxuICAgICAgICAgICAgICBiYWNrZHJvcFZhbHVlPXtjdXJyZW50VmFsdWV9XG4gICAgICAgICAgICAgIGJhY2tkcm9wVGhlbWU9e2N1cnJlbnRUaGVtZX1cbiAgICAgICAgICAgIC8+fVxuICAgICAgICA8L0JhY2tkcm9wQ29sb3I+XG5cbiAgICAgICAgPEJhY2tkcm9wQ29sb3IgY29sb3I9XCIjQkIxNzAyXCIgdGhlbWU9XCJsaWdodFwiPlxuICAgICAgICAgIHsoIGFjdGl2ZSwgY3VycmVudFRoZW1lLCBjdXJyZW50VmFsdWUgKSA9PlxuICAgICAgICAgICAgPFJlZEhhbmRzXG4gICAgICAgICAgICAgIGlzQWN0aXZlPXthY3RpdmV9XG4gICAgICAgICAgICAgIGJhY2tkcm9wVmFsdWU9e2N1cnJlbnRWYWx1ZX1cbiAgICAgICAgICAgICAgYmFja2Ryb3BUaGVtZT17Y3VycmVudFRoZW1lfVxuICAgICAgICAgICAgLz59XG4gICAgICAgIDwvQmFja2Ryb3BDb2xvcj5cblxuICAgICAgICA8QmFja2Ryb3Bab25lIGltYWdlPXsnYXNzZXRzL2JyaWRnZS5qcGcnfSB0aGVtZT1cImRhcmtcIj5cbiAgICAgICAgICB7KCBhY3RpdmUsIGN1cnJlbnRUaGVtZSwgY3VycmVudFZhbHVlICkgPT5cbiAgICAgICAgICAgIDxCcmlkZ2VcbiAgICAgICAgICAgICAgaXNBY3RpdmU9e2FjdGl2ZX1cbiAgICAgICAgICAgICAgYmFja2Ryb3BWYWx1ZT17Y3VycmVudFZhbHVlfVxuICAgICAgICAgICAgICBiYWNrZHJvcFRoZW1lPXtjdXJyZW50VGhlbWV9XG4gICAgICAgICAgICAvPn1cbiAgICAgICAgPC9CYWNrZHJvcFpvbmU+XG5cbiAgICA8L0xheW91dD5cbiAgKVxufVxuLyogICovXG5SZWFjdERPTS5yZW5kZXIoPENvbnRlbnQvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsgXG4iXX0=
