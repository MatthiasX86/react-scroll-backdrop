function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { BackdropContext } from './context';
import Backdrop from './app';
import { ParentContainer, ContentContainer, Color, Image } from './presentational';
/* ======= React Color Component ========
 * ======================================*/

export class BackdropContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "backdropState", void 0);

    this.state = {
      current: null,
      previous: null,
      isLoaded: false
    };
    this.updateState = this.updateState.bind(this);
  }
  /* TODO: remove arg and update from backdrop instance */


  updateState(newValue) {
    const {
      current: previousValue
    } = this.state;
    this.setState({
      previous: previousValue,
      current: newValue
    });
  }

  componentDidMount() {
    const {
      fromTop = 0,
      defaultValues
    } = this.props;
    const {
      isLoaded
    } = this.state;

    if (!isLoaded) {
      this.backdropState = new Backdrop(fromTop, defaultValues, this.updateState);
      this.setState({
        current: this.backdropState.current,
        isLoaded: true
      });
    }
  }

  render() {
    if (!this.state.isLoaded) return false;
    const {
      isLoaded,
      current,
      previous
    } = this.state;
    const {
      children,
      animationDuration = 600
    } = this.props;
    const {
      register
    } = this.backdropState;
    const contextValues = {
      register,
      current,
      previous
    };
    const templateProps = {
      animationDuration,
      current,
      previous
    };
    const template = {
      image: /*#__PURE__*/React.createElement(Image, templateProps),
      color: /*#__PURE__*/React.createElement(Color, templateProps)
    }[current.type];
    return isLoaded && /*#__PURE__*/React.createElement(ParentContainer, {
      className: "reactBackdrop__container"
    }, /*#__PURE__*/React.createElement(BackdropContext.Provider, {
      value: { ...contextValues
      }
    }, /*#__PURE__*/React.createElement(ContentContainer, null, children)), template);
  }

}