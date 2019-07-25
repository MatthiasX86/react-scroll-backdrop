/* ======= Color Container ========
 * =============================*/

interface zoneObj {
  element: HTMLDivElement;
  top: number;
  bottom: number;
  color: string;
}

interface containerObj {
  element: HTMLDivElement;
  callback: () => void;
}

type CCB = (color: string) => void;

class globalColorClass {
  public colorCollections: zoneObj[] = [];
  private colorContainers: containerObj[] = [];
  public currentColor: string;

  /* arguments */
  private defaultColor: string;
  private setColorCallback: CCB;
  private containerEl?: HTMLDivElement;
  private isScroll?: boolean;

  constructor(
    defaultColor: string,
    setColorCallback: CCB,
    containerEl: HTMLDivElement,
    isScroll: boolean = false,
  ) {
    this.defaultColor = defaultColor;
    this.setColorCallback = setColorCallback;
    this.isScroll = isScroll;
    this.containerEl = containerEl;

    this.currentColor = this.defaultColor;
    this.registerColor = this.registerColor.bind(this);
    this.init();
  }

  /*
   * */
  public init() {
    const windowOrContainer = this.isScroll ? this.containerEl : window;

    windowOrContainer.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
        this.logic();
      });
    });
  }

  /*
   * */
  private logic() {
    const windowPosition = this.isScroll
      ? ( this.containerEl.clientHeight * 0.7  ) + this.containerEl.scrollTop
      : ( window.innerHeight * 0.7 ) + window.scrollY;

    const isNotDefaultColor = this.currentColor != this.defaultColor;
    let inZoneRange = false;

    this.colorCollections.forEach((colorItem: zoneObj) => {
      const isAtZoneTop = windowPosition >= colorItem.top;
      const isAtZoneBottom = windowPosition <= colorItem.bottom;
      const isNotCurrentColor = this.currentColor != colorItem.color;

      if (isAtZoneTop && isAtZoneBottom) {
        inZoneRange = true;
        isNotCurrentColor && this.setColor(colorItem.color);
      }
    });

    !inZoneRange && isNotDefaultColor && this.setColor(this.defaultColor);
  }

  /*
   * */
  private setColor(newColor: string) {
    this.currentColor = newColor;
    this.setColorCallback(this.currentColor);
  }

  /* TODO: re-register logic is node moves
   * */
  public registerColor(domRef: HTMLDivElement, color: string): void {
    const element = domRef;
    const elementDim = element.getBoundingClientRect();

    this.colorCollections.push({
      element: domRef,
      top: this.containerEl ? element.offsetTop : elementDim.top,
      bottom: this.containerEl ? ( element.offsetTop + element.offsetHeight) : elementDim.bottom,
      color: color,
    });
  }

  /* 
   * */
  private registerColorContainer<T>(domRef: HTMLDivElement, activeCallback: T) {
    this.colorContainers.push({
      element: domRef,
      callback: activeCallback,
    });
  }
}

export default globalColorClass;
