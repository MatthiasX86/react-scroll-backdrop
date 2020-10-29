"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _shortid = _interopRequireDefault(require("shortid"));

var _Symbol$toStringTag;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_Symbol$toStringTag = Symbol.toStringTag;

var Backdrop = /*#__PURE__*/function () {
  function Backdrop() {
    var _this = this;

    var scrollPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var defaultBackdrop = arguments.length > 1 ? arguments[1] : undefined;
    var renderCallback = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, Backdrop);

    _defineProperty(this, "_store", new Map());

    _defineProperty(this, "current", void 0);

    _defineProperty(this, "previous", void 0);

    _defineProperty(this, "default", void 0);

    _defineProperty(this, "kill", function () {
      window.removeEventListener('scroll', _this.scrollEvent);
    });

    _defineProperty(this, "scrollEvent", function () {
      window.requestAnimationFrame(_this.calculate);
    });

    this.scrollPosition = scrollPosition;
    this.defaultBackdrop = defaultBackdrop;
    this.renderCallback = renderCallback;

    if (!defaultBackdrop) {
      this["default"] = {
        type: defaultBackdrop.type || 'color',
        value: defaultBackdrop.value || 'transparent',
        theme: 'default',
        id: 'default',
        element: null,
        renderCallback: null
      };
    } else {
      this["default"] = {
        type: 'color',
        value: 'transparent',
        theme: 'default',
        id: 'default',
        element: null,
        renderCallback: null
      };
    }

    this.init();
    this.register = this.register.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  _createClass(Backdrop, [{
    key: "init",

    /* 
     * */
    value: function init() {
      this.current = this["default"];
      this.previous = this["default"];

      this._store.set('default', this["default"]);

      this.render();
      window.addEventListener('scroll', this.scrollEvent);
    }
    /*
     * */

  }, {
    key: "calculate",

    /*
     * */
    value: function calculate() {
      var _this2 = this;

      var inZoneRange = false;

      this._store.forEach(function (backdropItem) {
        if (backdropItem.id === 'default') return;

        var _backdropItem$element = backdropItem.element.getBoundingClientRect(),
            top = _backdropItem$element.top,
            bottom = _backdropItem$element.bottom;

        if (top <= _this2.scrollPosition && bottom >= _this2.scrollPosition) {
          inZoneRange = true;
          var id = backdropItem.id,
              value = backdropItem.value;

          if (_this2.current.id !== id && _this2.current.value !== value) {
            _this2.set(backdropItem);
          }
        }
      });

      if (!inZoneRange && this.current.id !== 'default') {
        this.set(this["default"]);
      }
    }
    /*
     * */

  }, {
    key: "set",
    value: function set(newValue) {
      this.previous = this.current;
      this.current = newValue;
      this.render();
    }
    /*
     * */

  }, {
    key: "render",
    value: function render() {
      if (typeof this.renderCallback === 'function') {
        this.renderCallback();
      }
    }
    /*
     * */

  }, {
    key: "register",
    value: function register(backdrop, options) {
      var _backdrop$id = backdrop.id,
          id = _backdrop$id === void 0 ? _shortid["default"].generate() : _backdrop$id,
          _backdrop$theme = backdrop.theme,
          theme = _backdrop$theme === void 0 ? 'default' : _backdrop$theme,
          required = _objectWithoutProperties(backdrop, ["id", "theme"]);

      var _options$instant = options.instant,
          instant = _options$instant === void 0 ? false : _options$instant,
          _options$off = options.off,
          off = _options$off === void 0 ? false : _options$off;

      var newEntry = _objectSpread(_objectSpread({}, required), {}, {
        id: id,
        theme: theme
      });

      if (!off) {
        if (backdrop.type === 'image') {
          var preloadedImage = new Image().src = newEntry.value;
          newEntry.value = preloadedImage;
        }

        this._store.set(id, newEntry);

        if (instant) {
          this.set(newEntry);
        }
      }
    }
  }, {
    key: "store",
    get: function get() {
      return new Map(_toConsumableArray(this._store));
    }
    /*
     * */

  }, {
    key: _Symbol$toStringTag,
    get: function get() {
      return JSON.stringify(this.store);
    }
  }]);

  return Backdrop;
}();

exports["default"] = Backdrop;