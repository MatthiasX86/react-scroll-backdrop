# react-scroll-backdrop

**Scroll based, Context API driven react component that provides a smooth fade-in transition between color and image background types.** **React-backdrop is built in React 16 and TypeScript.**

On component mount, transition zones will be registered with their respective color/image associations. As users scroll the page the transition zones will be listening to trigger a change in the parent container as they reach a specified viewport top position. A zone will remain active as long as the viewport top position is within the zone (somewhere in between the top and bottom of the zone component) 

[Demo](https://matthiasx86.github.io/react-scroll-backdrop/)

</br>

<p align="center">
  <img width="80%" src="https://github.com/MatthiasX86/react-scroll-backdrop/raw/master/demo/video/screencast.gif">
</p>

</br>

## Features

- [ Function as children ](https://reactjs.org/docs/jsx-in-depth.html#functions-as-children) pattern to access context state and backdrop zone variables.
- Customizable transition speed in milliseconds
- Customizable backdrop zone trigger in px from viewport top
- backdrop component context as named export for reuse in other react components
</br>
</br>

## Installation

</br>

## Usage

#### Compositional pattern

Common use case using just BackdropContainer and BackdropZone as parent/child React composition pattern

parentContainer.js
```javascript
import BackdropContainer from 'react-scroll-backdrop';

const Parent = () => {

  const containerProps = {
    fromTop: 350,
    defaultValue: { value: "#fff", type: 'color' },
  };

  return (
    <BackdropContainer {...containerProps}>
      {children}
    </BackdropContainer>
  )
};

export default Parent
```

childComponents.js
```javascript
import { BackdropZone } from 'react-scroll-backdrop';

const firstSection = () => {
  return (
    <BackdropZone color="#CD9CAE" theme="dark">
      <secion>
        //...
      </section>
    </BackdropZone>
  )
};

const SecondSection = () => {
  return (
    <BackdropZone image="assets/bridge.jpg" theme="dark">
      <secion>
        //...
      </section>
    </BackdropZone>
  )
}

export { FirstSection, SecondSection };
```
index.js
```javascript
import Parent from './parentContainer.js'
import { FirstSection, SecondSection } from './childComponents.js'

const Layout = () => {
  return (
    <Parent>
      <FirstSection />
      <SecondSection />
    </Parent>
  )
}

export default layout
```

</br>
</br>

#### Function as a child pattern

Function as children pattern can be used with the BackdropZone to access positional arguments that can be used to render child components and create different states/events.

</br>
</br>

```javascript
import { BackdropZone } from 'react-scroll-backdrop';

const SkiesSection = () => {
  return (
    <BackdropZone color="#414953" theme="light">

      {( active, currentValue ) =>
        <GraySkies 
          isActive={active}
          theme={currentTheme}
        />}

    </BackdropZone>
  )
};

export default SkiesSection
```

</br>

#### ( firstPosition, )

Type: Boolean 

Default: false

will trigger true when the BackdropZone is in scroll position

</br>

#### ( , secondPosition )

Type: String 

Default: 'Default'

will trigger a new theme string value throughout all backdrop zones when a backdropZone is in scroll position

</br>

## BackdropContainer Props

### children
Type: Node

Default: undefined

React children type. Accepts any as arguments

</br>

### defaultValue
Type: Object 

Default: { value: 'transparent', type: 'color'}

When the scroll position is not at an indicated backdrop zone scroll position the backdrop container background will transition to the default values


*for color type. value property accepts any css background-color value*
```javascript
const DefaultColorValues = {
  value: '#dedede',
  type: 'color',
};

<BackdropContainer defaultValue={DefaultColorValues}>
```

*for image type. value property accepts an asset path string*
```javascript
const DefaultImageValues = {
  value: '../assets/water.jpg',
  type: 'image',
};

<BackdropContainer defaultValue={DefaultImageValues}>
```

**Note**: Must only use one type. For instance, if both color and image are used the component will default to using only color. The logic will check for type values in this order: color -> image -> ...

</br>

### defaultTheme
Type: String 

Default: 'default'

Default theme can be any string value you choose. Similar to 'defaultValues', when the scroll position is not at a specified backdrop position the theme is set to defaultTheme values.

```javascript
const DefaultTheme = 'sunburn';

<BackdropContainer defaultTheme={DefaultTheme}>
```
**Note**: are passed back down to child components where you can do things like change the text and UI colors. Think 'light' and 'dark' theme

</br>

### fromTop
Type: Number 

Default: 0

The value of fromTop is used as the scroll position **in pixels** that will be used to check for and trigger backdrop color/image transitions. When a BackdropZone component reaches 100px from viewport top, for example, it will trigger that BackdropZone's color/image value.

```javascript
const topValue = 100;

<BackdropContainer fromTop={topValue}>
```

</br>

## BackdropZone Props


### children
Type: Node

Default: undefined

React children type. Accepts any as arguments

</br>

### color
Type: String

Default: undefined

CSS background-color string value that used for color based backdrop. You may use any acceptable background-color values.

```javascript
const colorValue = 'rgba(201, 76, 76, 0.3)';

<BackdropZone color={colorValue}>
```

</br>

### image
Type: String

Default: undefined

Asset path to image. Accepts any image type acceptable to modern browsers

```javascript
const imagePath = '../assets/bridge.jpg';

<BackdropZone image={imagePath}>
```


</br>

### theme
Type: String

Default: 'default'

Theme names are completely arbitrary names that you can provide to backdrop zones. Theme names are registered to a color zone and are triggered when a zone becomes active. When a zone becomes active the theme name is sent to all other backdrop zones and are available in the backdrop context. Use themes for rendering and events. Ex. change font & UI colors.

```javascript
const zoneTheme = 'dark';

<BackdropZone theme={zoneTheme}>
```

</br>

### instant
Type: Boolean

Default: false

Because the react-scroll-backdrop is triggered by user scroll, there are going to be times when there is no backdrop color/image because the user hasn't started scrolling. It will remain that way until a scroll in a backdrop zone is triggered. If you need a color/image to be triggered instantly you can provide this prop to the backdrop zone that you would like to trigger instantly.  


```javascript
const willTriggerInstantly = true;

<BackdropZone theme={willTriggerInstantly}>
```


</br>

### off
Type: Boolean

Default: false

In cases in which react-scroll-backdrop is used in a dynamic environment (Ex. CMS powered builds) you might have use cases in which you might want to have the option to turn a particular zone off. Providing the off property with a value of true prevents the backdrop zone from registering.

```javascript
const preventZoneRegister = true;

<BackdropZone off={preventZoneRegister}>
```
