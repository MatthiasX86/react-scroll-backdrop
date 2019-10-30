import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import anime from 'animejs';

/* assets */
import { BackdropContainer, BackdropZone, BackdropContext } from '../../lib/index.js';

/* =====================
 *   layout components
 * =====================*/

interface IMProps {
  active?: boolean;
  image: string;
  color?: string;
  position: 'right' | 'left'
  theme: string;
}

interface CProps {
  children: any;
  position: '' | 'center';
}

interface SProps {
  isActive?: boolean;
  backdropValue?: {
    value: string,
    type: string
  };
  backdropTheme?: string;
}

const Container: React.FC<CProps> = ({ children, position = '' }) => {

  return (
    <div className={ `demo__container ${position}` }>
      {children}
    </div>
  )
}

const ImageFrame: React.FC<IMProps> = ({ active, image, position, color, theme }) => {

  const containerClasses = [
    'demo__imageFrame_container',
    position === 'right' ? 'right' : 'left',
    active ? 'active' : '',
  ].join(' ');

  const decorContainerClasses = [
    'demo__imageFrame_decorative',
    theme,
  ].join(' ');

  const backgroundColorStyle = {
    backgroundColor: `${color ? color : 'transparent'}`,
  }

  return (
    <div className={containerClasses}>
      <figure>
        <img
          className="demo__imageFrame_image"
          src={image}
          alt=""
        />
      </figure>
      <div className={decorContainerClasses} />
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

const PlantSection: React.FC<SProps> = ({isActive, backdropValue, backdropTheme}) => {
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

const PinkBricks: React.FC<SProps> = ({ isActive, backdropValue, backdropTheme}) => {
  return (
    <section className="demo__pinkBricks_container">
      <Container position='center'>
        <div className="demo__pinkBricks_textBox">
          <h1 className="demo__pinkBricks_title">The outside view is better</h1>
          <p className="demo__pinkBricks_body">...But you already know that</p>
        </div>
        <ImageFrame
          active={isActive}
          image="assets/pinkBricks.jpg"
          position='left'
          color={backdropValue.value}
          theme={backdropTheme}
        />
      </Container>
    </section>
  )
}

const GraySkies: React.FC<SProps> = ({ isActive, backdropValue, backdropTheme}) => {
  return (
    <section className="demo__graySkies_container">
      <Container position='center'>
        <div className="demo__graySkies_textBox">
          <h1 className="demo__graySkies_title">The outside view is better</h1>
          <p className="demo__graySkies_body">...But you already know that</p>
        </div>
        <ImageFrame
          active={isActive}
          image="assets/cloudCover.jpg"
          position='right'
          color={backdropValue.value}
          theme={backdropTheme}
        />
      </Container>
    </section>
  )
}

const RedHands: React.FC<SProps> = ({isActive, backdropValue, backdropTheme}) => {
  return  (
    <section className="demo__redHands_container">
      <Container position="center">
        <div className="demo__redHands_textBox">
          <h1 className="demo__redHands_title">The outside view is better</h1>
          <p className="demo__redHands_body">...But you already know that</p>
        </div>
        <ImageFrame
          active={isActive}
          image="assets/hands.jpg"
          position='left'
          color={backdropValue.value}
          theme={backdropTheme}
        />
      </Container>
    </section>
  )
}

const Bridge: React.SFC<SProps> = ({isActive, backdropValue, backdropTheme}) => {

  const textClassNames = [
    'demo__bridge_text',
    isActive ? 'active' : '',
  ].join(' ');

  let textNode = useRef(null);

  const [loaded, declareLoaded] = useState(false);

  if(!loaded) declareLoaded(true);

  if(loaded && textNode.current) {
    const el = textNode.current;

    el.innerHTML = el
      .textContent
      .replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false})
      .add({
        targets: '.demo__bridge_text .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 + 30 * i
      }).add({
        targets: '.demo__bridge_text .letter',
        translateX: [0,-30],
        opacity: [1,1],
        easing: "easeInExpo",
        duration: 1100,
        delay: (el, i) => 100 + 30 * i
      });
  }

  return (
    <section className="demo__bridge_container">
      <Container position="center">
        <div ref={textNode} className={textClassNames}>The outside view is better...</div>
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
          defaultValue={{ value: "transparent", type: 'color' }}
          fromTop={350}
          animationDuration={800}
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

        <BackdropZone color="#CD9CAE" theme="dark">
          {( active, currentTheme, currentValue ) =>
            <PinkBricks
              isActive={active}
              backdropValue={currentValue}
              backdropTheme={currentTheme}
            />}
        </BackdropZone>

        <BackdropZone color="#414953" theme="light">
          {( active, currentTheme, currentValue ) =>
            <GraySkies 
              isActive={active}
              backdropValue={currentValue}
              backdropTheme={currentTheme}
            />}
        </BackdropZone>

        <BackdropZone color="#BB1702" theme="light">
          {( active, currentTheme, currentValue ) =>
            <RedHands
              isActive={active}
              backdropValue={currentValue}
              backdropTheme={currentTheme}
            />}
        </BackdropZone>

        <BackdropZone image={'assets/bridge.jpg'} theme="dark">
          {( active, currentTheme, currentValue ) =>
            <Bridge
              isActive={active}
              backdropValue={currentValue}
              backdropTheme={currentTheme}
            />}
        </BackdropZone>

    </Layout>
  )
}
/*  */
ReactDOM.render(<Content/>, document.getElementById('app')); 
