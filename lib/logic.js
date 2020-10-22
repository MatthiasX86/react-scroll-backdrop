"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const shortid_1 = tslib_1.__importDefault(require("shortid"));
const defaultValues = {
    type: 'color',
    value: 'transparent',
    theme: 'default',
    id: 'default',
};
class Backdrop {
    constructor(fromTop = 0, userDefaultValues = defaultValues, renderCallback) {
        this.fromTop = fromTop;
        this.userDefaultValues = userDefaultValues;
        this.renderCallback = renderCallback;
        this.store = [];
        /*
         * */
        this.register = (entryProps, element, listener) => {
            const { instant = false, off = false } = entryProps, standardValues = tslib_1.__rest(entryProps, ["instant", "off"]);
            const newEntry = Object.assign({}, standardValues);
            if (!newEntry.id) {
                newEntry.id = shortid_1.default.generate();
            }
            if (!newEntry.theme) {
                newEntry.theme = 'default';
            }
            if (!off) {
                this.store.push({
                    element: element,
                    value: newEntry,
                    listener: listener,
                });
                if (instant) {
                    this.set(newEntry);
                    listener();
                }
            }
        };
        const { type = defaultValues.type, value = defaultValues.value, theme = defaultValues.theme, id = defaultValues.id, } = userDefaultValues;
        this.default = {
            type,
            value,
            theme,
            id,
        };
        this.init();
        this.register = this.register.bind(this);
    }
    /*
     * */
    get [Symbol.toStringTag]() {
        return JSON.stringify(this.store.map(item => item.value)) + '\n';
    }
    /*
     * */
    init() {
        this.current = this.default;
        this.render(this.current);
        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(() => {
                this.calculate();
            });
        });
    }
    /*
     * */
    calculate() {
        let inZoneRange = false;
        this.store.forEach((zoneItem) => {
            const { top, bottom } = zoneItem.element.getBoundingClientRect();
            if ((top <= this.fromTop) && (bottom >= this.fromTop)) {
                inZoneRange = true;
                const { value } = zoneItem;
                if (this.current.id !== value.id) {
                    this.set(value);
                }
            }
        });
        if (!inZoneRange && (this.current.id !== 'default')) {
            this.set(this.default);
        }
    }
    /*
     * */
    set(newValue) {
        this.previous = this.current;
        this.current = newValue;
        this.render(newValue);
    }
    render(setValue) {
        if (typeof this.renderCallback === 'function') {
            this.renderCallback(setValue);
        }
    }
}
exports.default = Backdrop;
