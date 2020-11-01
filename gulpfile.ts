import gulp from 'gulp';
import browserify from 'browserify'
import browserSync from 'browser-sync';
import tsify from 'tsify';
import babelify from 'babelify';
import loadPlugins from 'gulp-load-plugins';
import babel from 'gulp-babel';
// @ts-ignore
import jest from 'gulp-jest';

const $ = loadPlugins();

/* source paths */
const paths = {
  src: {
    all: 'src/**/*{.tsx,.ts}',
    main: 'src/index.tsx',
    tests: '__test__/**/*.ts'
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

/* Generate types */
gulp.task('types', () => {
  const tsProjectResult = gulp
    .src(paths.src.all)
    .pipe(tsProject())

  return tsProjectResult.dts.pipe(gulp.dest(paths.lib.types));
});

gulp.task('test', () => {
  const config = {
    preprocessorIgnorePatterns: [
      "<rootDir>/dist/", "<rootDir>/node_modules/"
    ],
    // "automock": false
    name: 'React Scroll Backdrop',
    jest: {
      verbose: true
    }
  }

  return gulp
    .src(paths.src.tests)
    .pipe(jest(config))
});

/* Compile source code */
gulp.task('js', () => {
  return gulp
    .src(paths.src.all)
    .pipe(babel())
    .pipe(gulp.dest(paths.lib.main))
});


/* For React demo components */
gulp.task('markup', () => {
  return gulp.src(paths.demo.markup)
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.tap(file => {
        file.contents = browserify()
          .add(file.path)
          .plugin(tsify)
          .transform(babelify)
          .bundle()
          .on('error', function (error) { console.error(error.toString()); })
      }
    ))
    .pipe($.buffer())
    .pipe($.sourcemaps.write())
    .pipe($.rename('demo.js'))
    .pipe(gulp.dest(paths.demo.compiled))
});

/* For React demo component styles */
gulp.task('styles', () => {
  return gulp
    .src(paths.demo.styles)
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.concat('styles.css'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.demo.compiled))
});


/* ===================
 *    Gulp main tasks
 * ==================*/

gulp.task('build',
  gulp.series([
    'js',
    'types'
  ])
);

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
        'test',
        // 'markup',
        // browserSync.reload,
      )
    );

  gulp.watch(paths.src.tests)
    .on('change',
      gulp.series(
        'test'
      )
    )

  gulp.watch(paths.demo.markup)
    .on('change',
      gulp.series(
        'markup',
        browserSync.reload
      )
    );

  gulp.watch(paths.demo.styles)
    .on('change',
      gulp.series(
        'styles',
        browserSync.reload
      )
    );
});
