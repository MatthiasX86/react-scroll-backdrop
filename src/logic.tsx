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

interface cacheValue {
  value: string
}

interface cache {
  'image': { [ uniqueID: string ]: cacheValue | undefined; };
  'color': { [ uniqueID: string ]: cacheValue | undefined; };
}

class globalBackdrop {
  /* state & storage */
  private zoneCollections: zoneObj[] = [];
  public currentValueType: VT;
  public currentTheme: string;
  public valuesCache: cache;

  /* arguments */
  private fromTop: number;
  private defaultValueType: VT;
  private defaultTheme: string;
  private setStateCallback: CCB;

  constructor(
    fromTop: number,
    defaultValueType: VT,
    defaultTheme: string,
    setStateCallback: CCB,
  ) {
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
  public init() {
    /* initializing current and previous value/type */
    this.currentValueType = this.defaultValueType;
    /* initialize current and previous theme */
    this.currentTheme = this.defaultTheme;

    this.setStateCallback(this.currentValueType, this.currentTheme);

    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
        this.logic();
      });
    });
  }

  /*
   * */
  private logic() {
    const currentUniqueID = JSON.stringify(this.currentValueType);
    const defaultUniqueID = JSON.stringify(this.defaultValueType);
    let inZoneRange = false;

    this.zoneCollections.forEach((zoneItem: zoneObj) => {
      const zoneUniqueID = JSON.stringify(zoneItem.valueType);
      const zoneElement = zoneItem.element.getBoundingClientRect();

      if (zoneElement.top <= this.fromTop && zoneElement.bottom >= this.fromTop) {
        inZoneRange = true;
        if (currentUniqueID !== zoneUniqueID) {
          this.setValue(zoneItem.valueType, zoneItem.theme);
        }
      }
    });

    /* if not in any backdrop registered zone and the current color
     * is not the default color set color and theme back to their default */
    if (!inZoneRange && currentUniqueID !== defaultUniqueID ) {
      this.setValue(this.defaultValueType, this.defaultTheme);
    }
  }

  /*
   * */
  private setValue(newValueType: VT, newTheme: string) {
    /* set value/type to current value */
    this.currentValueType = newValueType;
    /* set theme  to current value */
    this.currentTheme = newTheme;
    /* send information to React component */
    this.setStateCallback(this.currentValueType, this.currentTheme);
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
    this.zoneCollections.push({
      element: domRef,
      theme: theme,
      valueType: valueType,
      callback: zoneCallback,
    });

    if(instant) {
      this.setValue(valueType, theme);
      zoneCallback(valueType);
    }

    const key = JSON.stringify(valueType);

    switch(valueType.type) {

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
  }
}

export default globalBackdrop;
