/* developement utilities */
const browserify = require('browserify');
const tsify = require('tsify');
const browserSync = require('browser-sync').create();

/* gulp plugins */
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

/* source and distrobution paths */
const paths = {
  src: {
    all: 'src/**/*.tsx',
    main: 'src/index.tsx',
  },
  dis: {
    main: 'dist/',
  },
  demo: {
    compiled: 'docs/',
    markup: 'demo/src/*.tsx',
    styles: 'demo/src/*.scss',
  }
}

/* ===================
 *    Gulp subtasks
 * ==================*/

/* Compile function for react-backdrop */
function compileJSFunction(location) {
  
  const compileLocation = {
    build: paths.dis.main,
    demo: paths.demo.compiled,
  }[location];

  const isBuild = location === 'build';

  function compileBackdropLogic() {
    return gulp.src(paths.src.main)
      .pipe(plugins.tap((file) => {
          file.contents = browserify()
            .add(file.path)
            .plugin(tsify)
            .bundle()
            .on('error', function (error) { console.error(error.toString()); })
        }
      ))
      .pipe(plugins.buffer())
      .pipe(plugins.rename('index.js'))
      .pipe(plugins.if(isBuild, plugins.uglify()))
      .pipe(gulp.dest(compileLocation))
  }

  return compileBackdropLogic;
}

/* For React demo components */
gulp.task('markup', () => {
  return gulp.src(paths.demo.markup)
    .pipe(plugins.tap((file) => {
        file.contents = browserify()
          .add(file.path)
          .plugin(tsify)
          .bundle()
          .on('error', function (error) { console.error(error.toString()); })
      }
    ))
    .pipe(plugins.buffer())
    .pipe(plugins.rename('markup.js'))
    .pipe(plugins.sourcemaps.init())
    .pipe(gulp.dest(paths.demo.compiled))
});

/* For React demo component styles */
gulp.task('styles', () => {
  return gulp.src(paths.demo.styles)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.demo.compiled))
});

/* ===================
 *    Gulp main tasks
 * ==================*/

/* build process for package distribution */
gulp.task('build', () => {
  const compileJS = compileJSFunction('build');
  return compileJS();
});


/* development process for demo */
gulp.task('develop', () => {
  const compileJS = compileJSFunction('demo');

  browserSync.init({
    server: {
    baseDir: "./docs"
    }
  });

  gulp.watch(paths.src.all)
    .on('change',
      gulp.series(
        compileJS,
        'markup',
        browserSync.reload
      )
    )

  gulp.watch(paths.demo.markup)
    .on('change',
      gulp.series(
        'markup',
        browserSync.reload
      )
    )

  gulp.watch(paths.demo.styles)
    .on('change',
      gulp.series(
        'styles',
        browserSync.reload
      )
    )
});
