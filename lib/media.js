function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef } from 'react';
import shortid from 'shortid';
import { BackdropContext } from '.';

function createZoneComponent(componentType) {
  var _class, _temp;

  // eslint-disable-next-line 
  return _temp = _class = class extends React.PureComponent {
    constructor(props) {
      super(props);

      _defineProperty(this, "Element", void 0);

      _defineProperty(this, "id", shortid.generate());

      this.state = {
        didRender: false,
        hasRegistered: false,
        isActive: false
      };
      this.Element = createRef();
      this.setZoneActiveState = this.setZoneActiveState.bind(this);
    }

    setZoneActiveState() {
      const {
        isActive
      } = this.state;
      const {
        current
      } = this.context;

      if (this.id !== current.id) {
        if (isActive !== false) {
          this.setState({
            isActive: false
          });
        }
      }

      if (this.id === current.id) {
        if (isActive !== true) {
          this.setState({
            isActive: true
          });
        }
      }
    }

    componentDidUpdate() {
      const {
        value,
        theme,
        off,
        instant
      } = this.props;
      const {
        hasRegistered
      } = this.state;
      const {
        register
      } = this.context;

      if (!hasRegistered) {
        if (typeof register === 'function') {
          const registerProps = {
            type: componentType,
            value,
            theme,
            id: this.id,
            off,
            instant
          };
          register(registerProps, this.Element.current, this.setZoneActiveState);
          this.setState({
            hasRegistered: true
          });
        }
      }

      this.setZoneActiveState();
    }

    componentDidMount() {
      this.setState({
        didRender: true
      });
    }

    render() {
      const {
        children
      } = this.props;
      const {
        current: {
          theme,
          value
        }
      } = this.context;
      const {
        didRender,
        isActive
      } = this.state;
      const containerClassNames = ['reactBackdrop__zone', isActive ? 'active' : ''].join(' ');
      return /*#__PURE__*/React.createElement(React.Fragment, null, didRender && /*#__PURE__*/React.createElement("div", {
        className: containerClassNames,
        ref: this.Element
      }, typeof children === 'function' ? children(isActive, theme, value) : children));
    }

  }, _defineProperty(_class, "contextType", BackdropContext), _temp;
}
/* ======= Media Components ========
 * ================================*/


export const BackdropColor = createZoneComponent('color');
export const BackdropImage = createZoneComponent('image');