var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var header = require('gulp-header');
var moment = require('moment');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
	'<%= today("YYYY-MM-DD") %>\n' +
	'* Copyright (c) <%= today("YYYY") %> ' +
	'<%= pkg.author.name %> */\n';

gulp.task('clean', function() {
	return gulp.src('app/dist')
		.pipe(clean());
});

gulp.task('less', function() {
	return gulp.src('app/styles/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('app/dist'));
});

gulp.task('cssmin', function() {
	return gulp.src(['app/dist/*.css', '!app/dist/*.min.css'])
		.pipe(cssmin())
		.pipe(header(banner, {
			pkg: require('./package.json'),
			today: function(pattern) {
				return moment().format(pattern)
			}
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('app/dist'));
});

gulp.task('concat', function() {
	return gulp.src('app/scripts/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('app/dist'));
});

gulp.task('uglify', function() {
	return gulp.src('app/dist/app.js')
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('app/dist'));
});

gulp.task('default', ['clean', 'less', 'cssmin', 'concat', 'uglify']);