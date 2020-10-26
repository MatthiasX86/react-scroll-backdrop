import gulp from 'gulp';
import browserify from 'browserify'
import browserSync from 'browser-sync';
// import source from 'vinyl-source-stream';
import tsify from 'tsify';
import loadPlugins from 'gulp-load-plugins';

// Need to use
import babel from 'gulp-babel';
// import babelify from 'babelify';

const $ = loadPlugins();

/* source paths */
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

gulp.task('types', () => {
  const tsResult = gulp
    .src(paths.src.all)
    .pipe(tsProject())

  return tsResult.dts.pipe(gulp.dest(paths.lib.types));
});

gulp.task('js', () => {
  return gulp
    .src(paths.src.all)
    .pipe(babel())
    .pipe(gulp.dest(paths.lib.main))
});


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
    // .pipe($.rename('demo.js'))
    .pipe($.sourcemaps.write())
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
        browserSync.reload
      )
    );

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
