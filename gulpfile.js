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
    all: 'src/**/*',
    main: 'src/index.tsx'
  },
  dis: {
    main: 'dis/',
    name: 'dis/index.js'
  }
}

function compileJS() {
  return gulp.src(paths.src.main)
    // .pipe(plugins.typescript())
    .pipe(plugins.tap((file, t) => {
        file.contents = browserify()
          .add(file.path)
          .plugin(tsify, { noImplicitAny: true })
          .bundle()
          .on('error', function (error) { console.error(error.toString()); })
          // .pipe(process.stdout);
      }
    ))
    .pipe(plugins.buffer())
    .pipe(plugins.rename('index.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.dis.main))
}

/* development process */
gulp.task('default', () => {

  browserSync.init({
    server: {
      baseDir: "./dis"
    }
  });

  gulp.watch(paths.src.all)
    .on('change',
      gulp.series(
        compileJS,
        browserSync.reload
      )
    )
})
