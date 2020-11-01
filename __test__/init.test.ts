// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
import Backdrop, { BDOptions, BDValues } from "../src/app";

test('Initial values are properly set', () => {

  const options: BDOptions = {
    defaultBackdrop: { type: 'color', value: 'lightblue' },
    scrollPosition: 200,
  };

  const defaultValueObject: BDValues = {
    ...options.defaultBackdrop,
    id: "default",
    theme: "default",
    element: null,
    renderCallback: null,
  }

  // console.log('this default is: ', defaultValueObject)

  const sampleRenderCb = () => null;

  const BackdropApp = new Backdrop(sampleRenderCb, options);

  expect(BackdropApp.default)
    .toMatchObject<BDValues>(defaultValueObject);

  expect(BackdropApp.options.scrollPosition)
    .toBe<number>(200);

  // when no default option is given
  expect(new Backdrop(sampleRenderCb).default)
    .toMatchObject<BDValues>({
      type: 'color',
      value: 'transparent',
      id: 'default',
      theme: 'default',
      element: null,
      renderCallback: null
    });

  // scroll position must equal 0 when option not specified
  expect(new Backdrop(sampleRenderCb).options.scrollPosition)
    .toBe(0)

  expect({ current: BackdropApp.current, previous: BackdropApp.previous })
    .toMatchObject<{ current: BDValues, previous: BDValues}>({
      current: defaultValueObject,
      previous: defaultValueObject
    });

  expect(BackdropApp.store.get('default'))
    .toMatchObject<BDValues>(defaultValueObject)
});

// test('events register and detach', () => {
  // const sampleRenderFn = () => null;
//
  // const { window } = new JSDOM(`
    // <body>
      // <script>
        // const sampleRenderFn = () => null;
        // const backdropApp = ${ new Backdrop(sampleRenderFn) };
      // </script>
    // </body>
  // `)
//
// })
