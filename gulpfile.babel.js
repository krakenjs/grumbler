let gulp = require('gulp');
let gulpIf = require('gulp-if');
let webpack = require('webpack');
let webpackStream = require('webpack-stream');
let friendlyFormatter = require('eslint-friendly-formatter');
let gulpEslint = require('gulp-eslint');
let flow = require('gulp-flowtype');
let gulpFlowtype = require('gulp-flowtype');
let { Server } = require('karma');
let { argv } = require('yargs');

let { WEBPACK_CONFIG, WEBPACK_CONFIG_MIN } = require('./webpack.conf');

gulp.task('test', [ 'lint', 'karma', 'typecheck' ]);
gulp.task('build', [ 'test', 'webpack' ]);

gulp.task('webpack', [ 'webpack-major', 'webpack-min' ]);

gulp.task('webpack-major', function() {
  return gulp.src('src/index.js')
      .pipe(webpackStream(WEBPACK_CONFIG, webpack))
      .pipe(gulp.dest('dist'));
});

gulp.task('webpack-min', function() {
  return gulp.src('src/index.js')
      .pipe(webpackStream(WEBPACK_CONFIG_MIN, webpack))
      .pipe(gulp.dest('dist'));
});

gulp.task('typecheck', function() {
    return gulp.src([ 'src/**/*.js', 'test/**/*.js' ])
        .pipe(gulpFlowtype({
            abort: true
        }))
});

gulp.task('lint', ['lint-src', 'lint-test']);

function isFixed(file) {
	return file.eslint != null && file.eslint.fixed;
}

gulp.task('lint-src', function() {
    return gulp.src([ 'src/**/*.{js,jsx}' ]).pipe(gulpEslint({
        fix: Boolean(argv['fix'])
    }))
        .pipe(gulpEslint.format(friendlyFormatter))
        .pipe(gulpEslint.failAfterError())
        .pipe(gulpIf(isFixed, gulp.dest('./src')));
});

gulp.task('lint-test', function() {
    return gulp.src([ 'test/{tests,windows}/**/*.{js,jsx}' ]).pipe(gulpEslint({
        fix: Boolean(argv['fix'])
    }))
        .pipe(gulpEslint.format(friendlyFormatter))
        .pipe(gulpEslint.failAfterError())
        .pipe(gulpIf(isFixed, gulp.dest('./test')));
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
