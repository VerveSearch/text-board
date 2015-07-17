var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	jsdoc = require('gulp-jsdoc'); 


var PATHS = {
	JS:{
		SRC:'./src/*.js',
		TEST:'./test/*.js',
		DIST:'./dist'
	}
};

gulp.task('compile', function() {
    return gulp.src(PATHS.JS.SRC)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(concat('textspinner.js'))
      .pipe(gulp.dest(PATHS.JS.DIST))
      .pipe(concat('textspinner.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(PATHS.JS.DIST)); 
});

gulp.task('watch',['compile'],function(){
	return gulp.watch(PATHS.JS.SRC,['compile']); 
});

gulp.task('default',['watch'],function(){

});