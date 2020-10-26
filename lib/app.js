let _Symbol$toStringTag;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import shortid from 'shortid';
/* ======= Color Container ========
 * =============================*/

const defaultValues = {
  type: 'color',
  value: 'transparent',
  theme: 'default',
  id: 'default'
};
_Symbol$toStringTag = Symbol.toStringTag;

class Backdrop {
  constructor(fromTop = 0, userDefaultValues = defaultValues, renderCallback) {
    _defineProperty(this, "store", []);

    _defineProperty(this, "current", void 0);

    _defineProperty(this, "previous", void 0);

    _defineProperty(this, "default", void 0);

    _defineProperty(this, "register", (entryProps, element, listener) => {
      const {
        instant = false,
        off = false,
        ...standardValues
      } = entryProps;
      const newEntry = { ...standardValues
      };

      if (!newEntry.id) {
        newEntry.id = shortid.generate();
      }

      if (!newEntry.theme) {
        newEntry.theme = 'default';
      }

      if (!off) {
        this.store.push({
          element: element,
          value: newEntry,
          listener: listener
        });

        if (instant) {
          this.set(newEntry);
          listener();
        }
      }
    });

    this.fromTop = fromTop;
    this.userDefaultValues = userDefaultValues;
    this.renderCallback = renderCallback;
    const {
      type = defaultValues.type,
      value = defaultValues.value,
      theme = defaultValues.theme,
      id = defaultValues.id
    } = userDefaultValues;
    this.default = {
      type,
      value,
      theme,
      id
    };
    this.init();
    this.register = this.register.bind(this);
  }
  /*
   * */


  get [_Symbol$toStringTag]() {
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
    this.store.forEach(zoneItem => {
      const {
        top,
        bottom
      } = zoneItem.element.getBoundingClientRect();

      if (top <= this.fromTop && bottom >= this.fromTop) {
        inZoneRange = true;
        const {
          value
        } = zoneItem;

        if (this.current.id !== value.id) {
          this.set(value);
        }
      }
    });

    if (!inZoneRange && this.current.id !== 'default') {
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
  /*
   * */


}

export default Backdrop;