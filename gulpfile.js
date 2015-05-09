var gulp = require('gulp'),
	connect = require('gulp-connect'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	del = require('del'),
	bower = require('main-bower-files'),
	watch = require('gulp-watch'),
	plumber = require('gulp-plumber'),
	babel = require('gulp-babel'),
	runSequence = require('run-sequence'),
	babelify = require('babelify'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream');

var SRC_PATH = './src',
	TEST_PATH = './test',
	BUILD_PATH = './lib',
	WEB_PATH = './.web',
	POLYFILLS_PATH = './polyfills';

gulp.task('del-build', function(cb) {
	del([ BUILD_PATH + '/*' ], function() {
		cb();
	});
});

gulp.task('del-web', function(cb) {
	del([ WEB_PATH + '/*' ], function() {
		cb();
	});
});

gulp.task('polyfills', function() {
	return gulp.src([ POLYFILLS_PATH + '/**/*.js' ])
				.pipe(plumber())
				.pipe(concat('polyfills.js'))
				.pipe(gulp.dest(WEB_PATH));
});

gulp.task('libs', function() {
	return gulp.src(bower())
				.pipe(plumber())
				.pipe(concat('libs.js'))
				.pipe(gulp.dest(WEB_PATH));
});

gulp.task('build', [ 'del-build' ], function() {
	return gulp.src([ SRC_PATH + '/**/*.js' ])
				.pipe(plumber())
				.pipe(babel({ blacklist: [ 'useStrict' ] }))
				.pipe(gulp.dest(BUILD_PATH));
});

gulp.task('app', [ 'build' ], function() {
	return browserify({
					entries: TEST_PATH + '/app.js',
					debug: true
				})
				.transform(babelify)
				.bundle()
				.pipe(source('app.js'))
				.pipe(gulp.dest(WEB_PATH));
});

gulp.task('index', function() {
	return gulp.src([ TEST_PATH + '/index.html' ])
		.pipe(gulp.dest(WEB_PATH));
});

gulp.task('connect', function(cb) {
	connect.server({
		root: WEB_PATH,
		livereload: true
	});

	cb();
})

gulp.task('livereload', function () {
	return gulp.src( WEB_PATH + '/**/*' )
		.pipe(connect.reload());
});

gulp.task('serve', [ 'del-web' ], function(cb) {
	runSequence(
		[ 'polyfills', 'libs', 'app', 'index' ],
		'connect',
		function() {
			watch([ './bower_components/**/*.js' ], function() { gulp.start('libs'); });

			watch([ TEST_PATH + '/app.js', SRC_PATH + '/**/*.js', POLYFILLS_PATH + '/**/*.js' ], function() { gulp.start('app'); });

			watch([ TEST_PATH + '/index.html' ], function() { gulp.start('index'); });

			watch([ WEB_PATH + '/**/*' ], function() { gulp.start('livereload'); });

			cb();
		}
	);
});

gulp.task('default', function() {
	gulp.start('build');
});