// Gulp dependencies
const gulp = require('gulp');

// Build dependencies
const babelify =  require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Style dependencies
const concatCss = require('gulp-concat-css');
const sass = require('gulp-sass');

// Development dependencies
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');

// Asset dependencies
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');


gulp.task('default', function(callback){
	runSequence(['sass', 'jslibs', 'es6', 'images', 'fonts', 'browserSync', 'watch'], callback )
});

gulp.task('watch', function(){
	gulp.watch('host/views/*.pug', reload);
	gulp.watch('host/*.js', ['serverRestart']);
	gulp.watch('host/routes/*.js', ['routesRestart']);
	gulp.watch('host/config/*.js', ['configRestart']);
	gulp.watch('host/services/*.js', ['servicesRestart']);
	gulp.watch('client/src/js/**/*.js', ['es6']);
	gulp.watch('client/src/js/libs/*.js', ['jslibs']);
	gulp.watch('client/src/scss/**/*.scss', ['sass']);
});

gulp.task('serverRestart', function(){
	return gulp.src('host/*.js')
	.pipe(gulp.dest('host'))
	.pipe(browserSync.reload({
		stream: true
	})); //build folder
});

gulp.task('routesRestart', function(){
	return gulp.src('host/routes/*.js')
	.pipe(gulp.dest('host/routes'))
	.pipe(browserSync.reload({
		stream: true
	})); //build folder
});

gulp.task('configRestart', function(){
	return gulp.src('host/config/*.js')
	.pipe(gulp.dest('host/config'))
	.pipe(browserSync.reload({
		stream: true
	})); //build folder
});

gulp.task('servicesRestart', function(){
	return gulp.src('host/services/*.js')
	.pipe(gulp.dest('host/services'))
	.pipe(browserSync.reload({
		stream: true
	})); //build folder
});

//task to optimise images + put them in dist folder
gulp.task('images', function(){
	return gulp.src('client/src/assets/**/*.+(png|jpg|gif|svg|mp4|ogv|ogg)')
	.pipe(cache(imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('client/build/assets/'))
});

gulp.task('fonts', function(){
	return gulp.src('client/src/assets/fonts/**/*')
	.pipe(gulp.dest('client/build/assets/fonts/'))
});

gulp.task('es6', function() { //transform all code into es2015 format
	browserify('client/src/js/bundle.min.js') //take all code from index.js
	.transform('babelify', { //transform the code using the es2015 preset
		presets: ['es2015'],
	})
	.bundle() //return a stream of code
	.pipe(source('bundle.min.js')) //bundle into a new file name
	.pipe(buffer()) //put all new code into
	// .pipe(uglify()) //minifies code
	.pipe(gulp.dest('client/build/js/'))
	.pipe(browserSync.reload({
		stream: true
	})) //build folder
});

gulp.task('jslibs', function(){
	return gulp.src('client/src/js/libs/*.js')
	.pipe(concat('libs.min.js'))
	// .pipe(uglify()) //minifies code
	.pipe(gulp.dest('client/build/js/libs/'));
})

//task to turn sass into css and then reload browser
gulp.task('sass', function(){
	return gulp.src('client/src/scss/**/*.scss')
	.pipe(sass())
	.pipe(concatCss('styles.min.css'))
    .pipe(gulp.dest('client/build/css/'))
    .pipe(browserSync.reload({
		stream: true
	}))
});

// our gulp-nodemon task
gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'host/index.js'
	}).on('start', function () {
		//avoid nodemon being started multiple times
		if (!started) {
			console.log("server started");
			if(cb) {
				if (typeof cb == 'function') cb();
			}
			started = true;
			// setTimeout(function reload(){
			// 	browserSync.reload({
			// 		stream: false
			// 	});
			// }, 4000)
		}else{
			console.log("server restarted")
			// setTimeout(function reload(){
			// 	browserSync.reload({
			// 		stream: false
			// 	});
			// }, 2000)
		}
	})
	.on('crash', function() {
		console.log('nodemon.crash');
	})
	.once('quit', function () {
		// handle ctrl+c without a big weep
		process.exit();
	});
});



gulp.task('browserSync', ['nodemon'], function() {
	browserSync.init(null, {
	    proxy: "localhost:3000",
	    files: ["**/*.*"],
		port: 4000,
		browser: "google chrome",
    })
	console.log("Browser sync is working");
});


