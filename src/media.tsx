import * as React from "react"
import { createRef } from 'react';
import shortid from 'shortid';
import { BackdropContext } from './context';
import { BDValues, BDZoneOptions } from './app';

/* ======= Zone HOC ========
 * ========================*/

interface BZState {
  didRender: boolean;
  hasRegistered: boolean;
  isActive: boolean;
}

type ZoneProps = { value: string; theme?: string; id?: string } & BDZoneOptions;

function createZoneComponent(backdropType: 'color' | 'image'): React.ComponentType<ZoneProps> {

  return class BackdropZone extends React.PureComponent<ZoneProps, BZState> {

    static contextType = BackdropContext;

    declare context: React.ContextType<typeof BackdropContext>

    public Element: React.RefObject<HTMLDivElement>;

    constructor(props: ZoneProps) {
      super(props);

      this.state = {
        didRender: false,
        hasRegistered: false,
        isActive: false,
      };

      this.Element = createRef<HTMLDivElement>();
      this.setZoneActiveState = this.setZoneActiveState.bind(this);
    }

    public id = shortid.generate();

    public setZoneActiveState(): void {
      const { isActive } = this.state;
      const { current } = this.context;

      if (this.id !== current.id && isActive !== false) {
        this.setState({ isActive: false });
      }

      if (this.id === current.id && isActive !== true) {
        this.setState({ isActive: true });
      }
    }

    componentDidUpdate() {
      const { value, theme, off, instant } = this.props;
      const { hasRegistered } = this.state;
      const { register } = this.context;

      if (!hasRegistered) {
        if (typeof register === 'function') {

          const registerValues: BDValues = {
            type: backdropType,
            value,
            theme,
            id: this.id,
            element: this.Element.current,
            renderCallback: this.setZoneActiveState
          }

          const registerOptions: BDZoneOptions = {
            off,
            instant,
          }

          register( registerValues, registerOptions );

          this.setState({ hasRegistered: true });
        }
      }

      this.setZoneActiveState();
    }

    componentDidMount() {
      this.setState({ didRender: true });
    }

    componentWillUnmount() {
      const { remove } = this.context;
      remove(this.id);
    }

    render() {
      const { children } = this.props;
      const { current: { theme, value, type} } = this.context;
      const { didRender, isActive } = this.state;

      const containerClassNames = [
        'reactBackdrop__zone',
        isActive ? 'active' : '',
      ].join(' ');

      return (
        <>
          {didRender && (
            <div className={containerClassNames} ref={this.Element}>
              {typeof children === 'function'
                ? children(isActive, { type, value }, theme )
                : children}
            </div>
          )}
        </>
      );
    }
  }
}


/* ======= Media Components ========
 * ================================*/

const ColorBackdrop = createZoneComponent('color');
const ImageBackdrop = createZoneComponent('image');

export { ColorBackdrop, ImageBackdrop };
