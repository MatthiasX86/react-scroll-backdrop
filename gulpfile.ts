import gulp from 'gulp';
import browserify from 'browserify'
import browserSync from 'browser-sync';
import tsify from 'tsify';
import merge from 'merge2';
import loadPlugins from 'gulp-load-plugins';

const $ = loadPlugins();

/* source and distrobution paths */
const paths = {
  src: {
    all: 'src/**/*.tsx',
    main: 'src/index.tsx',
  },
  lib: {
    main: 'lib/',
    file: 'lib/index.js',
    types: 'types/',
  },
  demo: {
    compiled: 'docs/',
    markup: 'demo/src/*.tsx',
    styles: 'demo/src/*.scss',
  }
}

const tsProject = $.typescript.createProject('tsconfig.json');

/* ===================
 *    Gulp subtasks
 * ==================*/

/* Compile function for react-backdrop */
gulp.task('js', () => {
  const tsResult = gulp.src(paths.src.all)
    .pipe(tsProject())

  return merge([
    tsResult.dts.pipe(gulp.dest(paths.lib.types)),
    tsResult.js.pipe(gulp.dest(paths.lib.main))
  ]);
})

/* For React demo components */
gulp.task('markup', () => {
  return gulp.src(paths.demo.markup)
    .pipe($.sourcemaps.init())
    .pipe($.tap(file => {
        file.contents = browserify()
          .add(file.path)
          .plugin(tsify)
          .bundle()
          .on('error', function (error) { console.error(error.toString()); })
      }
    ))
    .pipe($.buffer())
    .pipe($.rename('markup.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.demo.compiled))
});

/* For React demo component styles */
gulp.task('styles', () => {
  return gulp.src(paths.demo.styles)
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.demo.compiled))
});


/* ===================
 *    Gulp main tasks
 * ==================*/

/* build process for package distribution */
gulp.task('build', gulp.series('js'));

/* development w/o browserSync */
gulp.task('watch', () => {
  gulp.watch(paths.src.all)
    .on('change',
      gulp.series(
        'js',
      )
    )
});

/* development process for demo */
gulp.task('develop', () => {

  browserSync.init({
      server: {
      baseDir: "./docs"
    }
  });

  gulp.watch(paths.src.all)
    .on('change',
      gulp.series(
        'js',
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