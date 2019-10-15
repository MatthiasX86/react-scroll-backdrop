import React from 'react';
import ReactDOM from 'react-dom';

import { BackdropContainer, BackdropZone, BackdropContext } from '../../src/index';

interface LState {
  hasLoaded: boolean;
}

class Layout extends React.Component<{}, LState> {
  constructor(props) {
    super(props)
    this.state = {
      hasLoaded: false,
    }
  }

  componentDidMount() {
    this.setState({hasLoaded: true});
  }

  render() {
    return (
      <BackdropContainer>
        <div className="something">this is just a test of something</div>
      </BackdropContainer>
    )
  }
}

/*  */
ReactDOM.render(<Layout/>, document.getElementById('app')); 
