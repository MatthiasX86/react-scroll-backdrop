/* ======= Color Container ========
 * =============================*/

type CCB = (color: string, theme: string) => void;
type ZCB = (state: string) => void;

interface zoneObj {
  element: HTMLDivElement;
  theme: string;
  color: string;
  callback: ZCB;
}

class globalBackdrop {
  /* state & storage */
  public colorCollections: zoneObj[] = [];
  public currentColor: string;
  public currentTheme: string;

  /* arguments */
  private fromTop: number;
  private defaultColor: string;
  private defaultTheme: string;
  private setColorCallback: CCB;
  private containerEl?: HTMLDivElement;

  constructor(
    fromTop: number,
    defaultColor: string,
    defaultTheme: string,
    setColorCallback: CCB,
    containerEl: HTMLDivElement
  ) {
    this.fromTop = fromTop;
    this.defaultColor = defaultColor;
    this.defaultTheme = defaultTheme;
    this.setColorCallback = setColorCallback;
    this.containerEl = containerEl;

    this.currentColor = this.defaultColor;
    this.currentTheme = this.defaultTheme;
    this.registerColor = this.registerColor.bind(this);
    this.init();
  }

  /*
   * */
  public init() {
    this.setColorCallback(this.defaultColor, this.defaultTheme);

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
        if (this.currentColor != colorItem.color) {
          this.setColor(colorItem.color, colorItem.theme);
        }
      }
    });

    /* if not in any backdrop registered zone and the current color
     * is not the default color set color and theme back to their default */
    if (!inZoneRange && ( this.currentColor != this.defaultColor )) {
      this.setColor(this.defaultColor, this.defaultTheme);
    }
  }

  /*
   * */
  private setColor(newColor: string, newTheme: string) {
    this.currentColor = newColor;
    this.currentTheme = newTheme;
    this.setColorCallback(this.currentColor, this.currentTheme);
  }

  /*
   * */
  public registerColor(
    color: string = this.defaultColor,
    theme: string = this.defaultTheme,
    instant: boolean,
    domRef: HTMLDivElement,
    zoneCallback: ZCB
  ): void {
    this.colorCollections.push({
      color: color,
      element: domRef,
      callback: zoneCallback,
      theme: theme,
    });

    if (instant) {
      this.setColor(color, theme);
      zoneCallback(color);
    }
  }
}

export default globalBackdrop;
