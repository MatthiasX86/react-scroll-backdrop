import React from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';

/* assets */
import { BackdropContainer, BackdropZone, BackdropContext } from '../../src/index';

/* =====================
 *   layout components
 * =====================*/

const Container = ({ children, position = '' }) => {

  return (
    <div className={ `demo__container ${position}` }>
      {children}
    </div>
  )
}

const ImageFrame = ({ image, position }) => {

  const containerClasses = [
    'demo__imageFrame_container',
    position === 'right' ? 'right' : 'left',
  ].join(' ');

  return (
    <div className={containerClasses}>
      <figure
      >
        <img
          className="demo__imageFrame_image"
          src={image}
          alt=""
        />
      </figure>
    </div>
  )
}

/* ================
 *    Plant demo
 * ================*/

const SplashSection = () => {
  return (
    <section className="demo__splash_container">
      <Container position="center">
        <span className="demo__splash_title">
          Scroll Down
        </span>
        <img
          src="assets/arrow.svg"
          alt=""
        />
      </Container>
    </section>
  )
}

const PlantSection = () => {
  return (
    <section className="demo__plant_container">
      <Container position="center">
        <div className="demo__plant_textBox">
          <h4 className="demo__plant_smallHeader">Small header</h4>
          <h1 className="demo__plant_title">Header</h1>
          <h3 className="demo__plant_subtitle">subtitle</h3>
          <p className="demo__plant_body">
            Bacon ipsum dolor amet buffalo nisi andouille ball
            tip kielbasa pork loin, exercitation jerky filet
            mignon excepteur doner do pork chop.
          </p>
          <div className="demo__plant_button">
            Learn more
          </div>
        </div>
      </Container>
      <img
        className="demo__plant_img"
        src="assets/plant.svg"
        alt=""
      />
    </section>
  )
}

const PinkBricks = () => {
  return (
    <section className="demo__pinkBricks_container">
      <Container position='center'>
        <div className="demo__pinkBricks_textBox">
          <h1 className="demo__pinkBricks_title">The outside view is better</h1>
          <p className="demo__pinkBricks_body">...But you already know that</p>
        </div>
        <ImageFrame
          image="assets/pinkBricks.jpg"
          position='left'
        />
      </Container>
    </section>
  )
}

const GraySkies = () => {
  return (
    <section className="demo__graySkies_container">
      <Container position='center'>
        <div className="demo__graySkies_textBox">
          <h1 className="demo__graySkies_title">The outside view is better</h1>
          <p className="demo__graySkies_body">...But you already know that</p>
        </div>
        <ImageFrame
          image="assets/cloudCover.jpg"
          position='right'
        />
      </Container>
    </section>
  )
}

const RedHands = () => {
  return (
    <section className="demo__redHands_container">
      <Container position="center">
        <div className="demo__redHands_textBox">
          <h1 className="demo__redHands_title">The outside view is better</h1>
          <p className="demo__redHands_body">...But you already know that</p>
        </div>
        <ImageFrame
          image="assets/hands.jpg"
          position='left'
        />
      </Container>
    </section>
  )
}

interface LProps {
  children: any;
}

interface LState {
  hasLoaded: boolean;
}

class Layout extends React.Component<LProps, LState> {
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
    const { children } = this.props;

    return (
        <BackdropContainer
          defaultValueType={{ value: "transparent", type: 'color' }}
          fromTop={350}
        >
          <div className='layout'>
            <Helmet>
              <link
                href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700|Ramaraja&display=swap"
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap"
                rel="stylesheet"
              />
            </Helmet>
            {children}
          </div>
        </BackdropContainer>
    )
  }
}

const Content = () => {
  return (
    <Layout>

        <BackdropZone color="#252629" instant={true}>
          <SplashSection />
        </BackdropZone>

        <BackdropZone
          color="#CD9CAE"
          theme="dark"
        >
          <PinkBricks />
        </BackdropZone>

        <BackdropZone
          color="#414953"
          theme="light"
        >
          <GraySkies />
        </BackdropZone>

        <BackdropZone
          color="#BB1702"
          theme="light"
        >
          <RedHands />
        </BackdropZone>

        <BackdropZone
          color="#98B3AE"
        >
          <PlantSection />
        </BackdropZone>

    </Layout>
  )
}
/*  */
ReactDOM.render(<Content/>, document.getElementById('app')); 
