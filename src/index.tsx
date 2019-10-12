import React from 'react';
import globalColorClass from './logic';
import { generalChildrenType } from './types';
import shortid from 'shortid';

/* ======= React Color Component ========
 * ======================================*/

/* TODO: proper union type for undefined and function signature
 * */
interface CCmembers {
  registerColor: any;
  registerColorContainer: any;
}

const ColorContext = React.createContext<CCmembers>({
  registerColor: undefined,
  registerColorContainer: undefined,
});

/* ======= React Color Component ========
 * ======================================*/

interface CCProps {
  children: generalChildrenType;
  defaultColor: string;
  scroll?: boolean;
}

interface CCState {
  activeColor: undefined | string;
  isLoaded: boolean;
}

class ColorContainer extends React.Component<CCProps, CCState> {
  private colorState: undefined | globalColorClass;
  private DOMref: React.RefObject<HTMLDivElement>;

  constructor(props: CCProps) {
    super(props);

    this.DOMref = React.createRef<HTMLDivElement>();
    this.setColor = this.setColor.bind(this);
    this.colorState = undefined;

    this.state = {
      activeColor: undefined,
      isLoaded: false,
    };
  }

  setColor(newColor: string) {
    this.setState({
      activeColor: newColor,
    });
  }

  componentDidMount() {
    const { defaultColor, scroll } = this.props;
    const { isLoaded } = this.state;

    if(isLoaded != true) {
      this.colorState = new globalColorClass(
        defaultColor,
        this.setColor,
        this.DOMref.current,
        scroll,
      );

      this.setState({ 
        activeColor: this.colorState.currentColor,
        isLoaded: true 
      });
    }
  }

  render() {
    const { children, scroll } = this.props;
    const { isLoaded } = this.state;

    var styleObj = {
      transition: `all 1.5s ease-out`,
      backgroundColor: `${this.state.activeColor}`,
    };

    if(scroll) {
      Object.defineProperties(styleObj,  {
        position: { value: `relative`, enumerable: true },
        overflow: { value: `scroll`, enumerable: true },
        height: { value: `100%`, enumerable: true },
      })
    }

    const contextValues = {
      registerColor: isLoaded ? this.colorState.registerColor : undefined,
      registerColorContainer: isLoaded ? this.colorState.registerColor : undefined,
    };

    return (
      <div style={styleObj} ref={this.DOMref}>
        <ColorContext.Provider value={{...contextValues}}>
            {children}
        </ColorContext.Provider>
      </div>
    );
  }
}


/* ======= color consumer component ========
 * =========================================*/

interface CZProps {
  children: generalChildrenType;
  color: string;
  registerColor?: (element, HTMLDivElement, color: string) => void;
}

interface CZState {
  didRender: boolean;
  hasRegistered: boolean;
}

class ColorZone extends React.Component<CZProps, CZState> {
  static contextType = ColorContext;
  private DOMRef: React.RefObject<HTMLDivElement>;

  constructor(props: CZProps) {
    super(props);
    this.state = {
      didRender: false,
      hasRegistered: false,
    };
    this.DOMRef = React.createRef<HTMLDivElement>();
  }

  componentDidUpdate() {
    const { color } = this.props;
    const { hasRegistered } = this.state;
    const sendColor = this.props.registerColor || this.context.registerColor;

    if (hasRegistered != true) {
      sendColor(this.DOMRef.current, color);
      this.setState({ hasRegistered: true });
    }
  }

  componentDidMount() {
    this.setState({
      didRender: true,
    });
  }

  render() {
    const { children } = this.props;
    const { didRender } = this.state;

    return (
      <>
        {didRender && (
          <div key={shortid.generate()} ref={this.DOMRef}>
            {children}
          </div>
        )}
      </>
    );
  }
}

export { ColorContainer, ColorZone };
