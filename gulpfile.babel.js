import gulp from 'gulp';
import gulpWebpack from 'gulp-webpack';
import eslint from 'gulp-eslint';
import shell from 'gulp-shell';
import { Server } from 'karma';
import { argv } from 'yargs';
import { WEBPACK_CONFIG_MAJOR, WEBPACK_CONFIG_MAJOR_MIN } from './webpack.conf';

gulp.task('test', [ 'lint', 'karma', 'typecheck' ]);
gulp.task('build', [ 'test', 'webpack' ]);

gulp.task('webpack', [ 'webpack-major', 'webpack-major-min' ]);

gulp.task('webpack-major', ['lint'], function() {
  return gulp.src('src/index.js')
      .pipe(gulpWebpack(WEBPACK_CONFIG_MAJOR))
      .pipe(gulp.dest('dist'));
});

gulp.task('webpack-major-min', ['lint'], function() {
  return gulp.src('src/index.js')
      .pipe(gulpWebpack(WEBPACK_CONFIG_MAJOR_MIN))
      .pipe(gulp.dest('dist'));
});

gulp.task('typecheck', shell.task(['npm run-script flow']));

gulp.task('lint', function() {
  return gulp.src([ 'src/**/*.js', 'test/**/*.js' ]).pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('karma', ['lint'], function (done) {

  let server = new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: !Boolean(argv['keep-browser-open']),
    client: {
      captureConsole: Boolean(argv['capture-console'])
    }
  });

  server.on('browser_error', function (browser, err) {
    console.log('Karma Run Failed: ' + err.message);
    throw err;
  });

  server.on('run_complete', function (browsers, results) {
    if (results.failed) {
      return done(new Error('Karma: Tests Failed'));
    }
    done();
  });

  server.start();
});
