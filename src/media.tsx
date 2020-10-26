import React, { createRef } from 'react';
import shortid from 'shortid';
import { BackdropContext } from '.';
import { RegistrationProps } from './app';

/* ======= Zone HOC ========
 * ========================*/

interface BZState {
  didRender: boolean;
  hasRegistered: boolean;
  isActive: boolean;
}

function createZoneComponent(componentType: 'color' | 'image') {
  // eslint-disable-next-line 
  return class extends React.PureComponent<RegistrationProps, BZState> {

    static contextType = BackdropContext;

    declare context: React.ContextType<typeof BackdropContext>

    public Element: React.RefObject<HTMLDivElement>;

    constructor(props: RegistrationProps) {
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

      if (this.id !== current.id) {
        if (isActive !== false) {
          this.setState({ isActive: false });
        }
      }

      if (this.id === current.id) {
        if (isActive !== true) {
          this.setState({ isActive: true });
        }
      }
    }

    componentDidUpdate() {
      const { value, theme, off, instant } = this.props;
      const { hasRegistered } = this.state;
      const { register } = this.context;

      if (!hasRegistered) {
        if (typeof register === 'function') {

          const registerProps = {
            type: componentType,
            value,
            theme,
            id: this.id,
            off,
            instant,
          }

          register(
            registerProps,
            this.Element.current,
            this.setZoneActiveState
          );

          this.setState({ hasRegistered: true });
        }
      }

      this.setZoneActiveState();
    }

    componentDidMount() {

      this.setState({
        didRender: true,
      });
    }

    render() {
      const { children } = this.props;
      const { current: { theme, value} } = this.context;
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
                ? children(isActive, theme, value)
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


export const BackdropColor = createZoneComponent('color');
export const BackdropImage = createZoneComponent('image');
