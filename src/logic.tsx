/* ======= Color Container ========
 * =============================*/

interface VT {
  value: string;
  type: string;
}

type CCB = (valueType: VT, theme: string) => void;
type ZCB = (valueTypeState: VT) => void;

interface zoneObj {
  element: HTMLDivElement;
  theme: string;
  valueType: VT;
  callback: ZCB;
}

class globalBackdrop {
  /* state & storage */
  public colorCollections: zoneObj[] = [];
  public currentValueType: VT;
  public currentTheme: string;

  /* arguments */
  private fromTop: number;
  private defaultValueType: VT;
  private defaultTheme: string;
  private setValueCallback: CCB;

  constructor(
    fromTop: number,
    defaultValueType: VT,
    defaultTheme: string,
    setValueCallback: CCB,
  ) {
    this.fromTop = fromTop;
    this.defaultValueType = defaultValueType;
    this.defaultTheme = defaultTheme;
    this.setValueCallback = setValueCallback;

    this.registerColor = this.registerColor.bind(this);
    this.init();
  }

  /*
   * */
  public init() {
    this.currentValueType = this.defaultValueType;
    this.currentTheme = this.defaultTheme;
    this.setValueCallback(this.currentValueType, this.currentTheme);

    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
        this.logic();
      });
    });
  }

  /*
   * */
  private logic() {
    let inZoneRange = false;

    this.colorCollections.forEach((colorItem: zoneObj) => {
      const el = colorItem.element.getBoundingClientRect();

      if (el.top <= this.fromTop && el.bottom >= this.fromTop) {
        inZoneRange = true;
        if (JSON.stringify(this.currentValueType) !== JSON.stringify(colorItem.valueType)) {
          this.setValue(colorItem.valueType, colorItem.theme);
        }
      }
    });

    /* if not in any backdrop registered zone and the current color
     * is not the default color set color and theme back to their default */
    if (!inZoneRange && (JSON.stringify(this.currentValueType) !== JSON.stringify(this.defaultValueType)) ) {
      this.setValue(this.defaultValueType, this.defaultTheme);
    }
  }

  /*
   * */
  private setValue(newValueType: VT, newTheme: string) {
    this.currentValueType = newValueType;
    this.currentTheme = newTheme;
    this.setValueCallback(this.currentValueType, this.currentTheme);
  }

  /*
   * */
  public registerColor(
    valueType: VT = this.defaultValueType,
    theme: string = this.defaultTheme,
    instant: boolean,
    domRef: HTMLDivElement,
    zoneCallback: ZCB
  ): void {
    this.colorCollections.push({
      element: domRef,
      theme: theme,
      valueType: valueType,
      callback: zoneCallback,
    });

    if (instant) {
      this.setValue(valueType, theme);
      zoneCallback(valueType);
    }
  }
}

export default globalBackdrop;
