import shortid from 'shortid';

/* ======= Color Container ========
 * =============================*/

export interface BackdropValue {
  type: 'color' | 'image';
  value: string;
  theme?: string;
  id?: string;
}

export interface AddtionalProps {
  off?: boolean;
  instant?: boolean;
}


export type RegistrationProps = BackdropValue & AddtionalProps;

export type CallbackType = (arg: BackdropValue) => void;
export type ListenerType = () => void;

export interface RegisterFn {
  (entry: RegistrationProps, element: HTMLDivElement, listener: ListenerType): void;
}

interface zoneObj {
  value: BackdropValue;
  element: HTMLDivElement;
  listener: ListenerType;
}

const defaultValues: BackdropValue = {
  type: 'color',
  value: 'transparent',
  theme: 'default',
  id: 'default',
};

class Backdrop {
  private store: zoneObj[] = [];

  public current: BackdropValue;
  public previous: BackdropValue;
  public default: BackdropValue;

  constructor(
    private fromTop: number = 0,
    private userDefaultValues: BackdropValue = defaultValues,
    private renderCallback?: CallbackType
  ) {
    const {
      type = defaultValues.type,
      value = defaultValues.value,
      theme =  defaultValues.theme,
      id = defaultValues.id,
    } = userDefaultValues;

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
  public get [Symbol.toStringTag](): string {
    return JSON.stringify(this.store.map(item => item.value)) + '\n';
  }

  /*
   * */
  private init(): void {
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
  private calculate(): void {
    let inZoneRange = false;

    this.store.forEach((zoneItem: zoneObj) => {
      const { top, bottom } = zoneItem.element.getBoundingClientRect();

      if (( top <= this.fromTop ) && ( bottom >= this.fromTop )) {
        inZoneRange = true;
        const { value } = zoneItem;

        if (this.current.id !== value.id) { this.set(value) }
      }
    });

    if (!inZoneRange && ( this.current.id !== 'default' ) ) {
      this.set(this.default);
    }
  }

  /*
   * */
  private set(newValue: BackdropValue): void {
    this.previous = this.current;
    this.current = newValue;
    this.render(newValue);
  }

  private render(setValue: BackdropValue): void {
    if (typeof this.renderCallback === 'function') {
      this.renderCallback(setValue);
    }
  }

  /*
   * */
  public register: RegisterFn = (entryProps: RegistrationProps, element: HTMLDivElement, listener: ListenerType)  => {
    const { instant = false, off = false, ...standardValues } = entryProps;

    const newEntry = { ...standardValues };

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
        listener: listener,
      });

      if(instant) {
        this.set(newEntry);
        listener();
      }
    }
  }
}

export default Backdrop;
