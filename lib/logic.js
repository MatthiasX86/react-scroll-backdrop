"use strict";
/* ======= Color Container ========
 * =============================*/
Object.defineProperty(exports, "__esModule", { value: true });
var globalBackdrop = /** @class */ (function () {
    function globalBackdrop(fromTop, defaultValueType, defaultTheme, setStateCallback) {
        /* state & storage */
        this.zoneCollections = [];
        this.fromTop = fromTop;
        this.defaultValueType = defaultValueType;
        this.defaultTheme = defaultTheme;
        this.setStateCallback = setStateCallback;
        this.valuesCache = {
            'image': {},
            'color': {},
        };
        this.registerColor = this.registerColor.bind(this);
        this.init();
    }
    /*
     * */
    globalBackdrop.prototype.init = function () {
        var _this = this;
        /* initializing current and previous value/type */
        this.currentValueType = this.defaultValueType;
        /* initialize current and previous theme */
        this.currentTheme = this.defaultTheme;
        this.setStateCallback(this.currentValueType, this.currentTheme);
        window.addEventListener('scroll', function () {
            window.requestAnimationFrame(function () {
                _this.logic();
            });
        });
    };
    /*
     * */
    globalBackdrop.prototype.logic = function () {
        var _this = this;
        var currentUniqueID = JSON.stringify(this.currentValueType);
        var defaultUniqueID = JSON.stringify(this.defaultValueType);
        var inZoneRange = false;
        this.zoneCollections.forEach(function (zoneItem) {
            var zoneUniqueID = JSON.stringify(zoneItem.valueType);
            var zoneElement = zoneItem.element.getBoundingClientRect();
            if (zoneElement.top <= _this.fromTop && zoneElement.bottom >= _this.fromTop) {
                inZoneRange = true;
                if (currentUniqueID !== zoneUniqueID) {
                    _this.setValue(zoneItem.valueType, zoneItem.theme);
                }
            }
        });
        /* if not in any backdrop registered zone and the current color
         * is not the default color set color and theme back to their default */
        if (!inZoneRange && currentUniqueID !== defaultUniqueID) {
            this.setValue(this.defaultValueType, this.defaultTheme);
        }
    };
    /*
     * */
    globalBackdrop.prototype.setValue = function (newValueType, newTheme) {
        /* set value/type to current value */
        this.currentValueType = newValueType;
        /* set theme  to current value */
        this.currentTheme = newTheme;
        /* send information to React component */
        this.setStateCallback(this.currentValueType, this.currentTheme);
    };
    /*
     * */
    globalBackdrop.prototype.registerColor = function (valueType, theme, instant, domRef, zoneCallback) {
        if (valueType === void 0) { valueType = this.defaultValueType; }
        if (theme === void 0) { theme = this.defaultTheme; }
        this.zoneCollections.push({
            element: domRef,
            theme: theme,
            valueType: valueType,
            callback: zoneCallback,
        });
        if (instant) {
            this.setValue(valueType, theme);
            zoneCallback(valueType);
        }
        var key = JSON.stringify(valueType);
        switch (valueType.type) {
            case 'image':
                /* preload images */
                new Image().src = valueType.value;
                /* load assets into cache */
                this.valuesCache.image[key] = {
                    value: valueType.value,
                };
                break;
            case 'color':
                this.valuesCache.color[key] = {
                    value: valueType.value,
                };
                break;
        }
    };
    return globalBackdrop;
}());
exports.default = globalBackdrop;
