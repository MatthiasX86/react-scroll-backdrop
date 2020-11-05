# react-scroll-backdrop


[![npm version](https://badge.fury.io/js/react-scroll-backdrop.svg)](https://badge.fury.io/js/react-scroll-backdrop)
[![npm downloads](https://img.shields.io/npm/dm/react-scroll-backdrop.svg)](https://www.npmjs.com/package/react-scroll-backdrop)


**react-scroll-backdrop is a Context API based react component that provides a smooth animation/transition fade-in between color and image backdrops**

On component mount, backdrop transition zones will register their location on the page. As the `window` scrolls to a specified window scroll position it will scan for backdrop zones that reach that point & trigger their respective backdrop color/image. A zone will remain active as long as the scroll position is within the body of the backdrop zone component 



[Demo](https://matthiasx86.github.io/react-scroll-backdrop/)

</br>

<p align="center">
  <img width="80%" src="https://github.com/MatthiasX86/react-scroll-backdrop/raw/master/demo/video/screencast.gif">
</p>

</br>


## Install

```
$ npm install --save react-scroll-backdrop
```

</br>

## Usage

#### Compositional pattern

Common use case using just BackdropContainer and a BackdropZone as parent/child

</br>

```javascript
import { BackdropContainer, ColorBackdrop, ImageBackdrop } from 'react-scroll-backdrop';


const defaultValue = {
  value: '#fff',
  type: 'color'
};

<BackdropContainer fromTop={350} defaultValue={defaultValue}>

  <ColorBackdrop value='#CD9CAE' theme='dark'>
    // ...
  </ColorBackdrop>

  // perhaps some other components in between

  <ImageBackdrop value='assets/bridge.jpg' theme='light'>
    // ...
  </ImageBackdrop>

</BackdropContainer>
```

</br>
</br>

#### Function as a child pattern

Function as children pattern can be used with a BackdropZone to access positional arguments that can be useful when rendering child components to create different states/events.

</br>
</br>

```javascript
import { ColorBackdrop, ImageBackdrop } from 'react-scroll-backdrop';

/*
 * ex. 
 *
 * {
 *  active: false,
 *  value: { type: 'color', value: '#dedede' },
 *  theme: 'light'
 * }
 * */

<BackdropContainer>

  <ColorBackdrop value="#414953" theme="light">
    {( active, value, theme ) => <GraySkies isActive={active} theme={currentTheme} />}
  </ColorBackdrop>

  // ...or

  <ImageBackdrop value="#414953" theme="light">
    {( active, value, theme ) => <GraySkies isActive={active} theme={currentTheme} />}
  </ImageBackdrop>

</BackdropContainer>
```

</br>

#### ( active, )

Type: `boolean` 

Default: `false`

will trigger true when the BackdropZone is in scroll position

</br>

#### ( , value )

Type: `{ type: 'color' | 'image', value: string }` 

will trigger a new backdrop value throughout all backdrop zones when a backdropZone is in scroll position

</br>

#### ( , , theme )

Type: `string` 

will trigger a new theme string value throughout all backdrop zones when a backdropZone is in scroll position

</br>

## BackdropContainer Props

</br>

### defaultValue
Type: `{ type: 'image' | 'color', value: string }` 

When the scroll position is not at an indicated backdrop zone location the backdrop container background will transition to the default values


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

</br>

### animationDuration
Type: `number` 

default: `600`

Animation duration in milliseconds that will be applied to all animation/transitions in between zones


</br>

### fromTop
Type: `number` 

Default: `0`

The value of fromTop is used as the scroll position **in pixels** that will be used to check for and trigger backdrop color/image transitions. When a BackdropZone component reaches 100px from viewport top, for example, it will trigger that BackdropZone's color/image value.

</br>

## ColorBackdrop & ImageBackdrop Props

</br>

### value
Type: `string`

Default: `undefined`

Color backdrop: any acceptable CSS background-color value
</br>
Image backdrop: Asset path to image. Accepts any image type acceptable to modern browsers

</br>

### theme
Type: `string`

Default: `'default'`

Theme names are completely arbitrary names that you can provide to backdrop zones. Theme names are registered to a color zone and are triggered when a zone becomes active. When a zone becomes active the theme name is sent to all other backdrop zones and will also available in the backdrop context. Use themes for rendering and events. Ex. change font & UI colors.

</br>

### instant
Type: `boolean`

Default: `false`

Because the react-scroll-backdrop is triggered by user scroll, there are going to be times when there is no backdrop color/image because the user hasn't started scrolling. It will remain that way until a scroll in a backdrop zone is triggered. If you need a color/image to be triggered instantly you can provide this prop to the backdrop zone that you would like to trigger instantly.  

</br>

### off
Type: `boolean`

Default: `false`

In cases in which react-scroll-backdrop is used in a dynamic environment (Ex. CMS powered builds) you might have use cases in which you might want to have the option to turn a particular zone off. Providing the off property with a value of true prevents the backdrop zone from registering.
