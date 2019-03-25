var watch        = require('gulp-watch');
var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var rename       = require('gulp-rename');
var del          = require('del');
var cache        = require('gulp-cache');
var plumber      = require('gulp-plumber');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var include      = require("gulp-include");

// paths
var paths = {
    devDir: 'src/',
    outputDir: 'app/',
    buildDir: 'dist/',
    sassArr: [
        'node_modules/'
    ]
};

// tasks
gulp.task('scss', function(){
    gulp.src(paths.devDir + 'scss/*.scss') 
		.pipe(plumber())
        .pipe(sass({includePaths: paths.sassArr, outputStyle: 'expanded'}))
        .pipe(autoprefixer({browsers: ['last 10 versions'], cascade: true}))
        .pipe(gulp.dest(paths.outputDir + 'css'))
        .pipe(browserSync.stream())
});

// js 
gulp.task("scripts", function() {
    gulp.src(paths.devDir + "js/*.js")
        .pipe(plumber())
        .pipe(include({
            extensions: "js",
            hardFail: true,
            includePaths: [
                "node_modules/",
                paths.devDir + "js/"
            ]
        }))
        .pipe(gulp.dest(paths.outputDir + "js"))
        .pipe(browserSync.stream())
});

// watch
gulp.task('watch', function() {
    gulp.watch(paths.devDir + 'scss/**/*.scss', ['scss']);
    gulp.watch(paths.devDir + 'js/**/*.js', ['scripts']);
    gulp.watch(paths.devDir + '*.html', ['htmlCopy']);
    gulp.watch(paths.devDir + 'img/**/*.*', ['imgCopy']);
    gulp.watch(paths.devDir + 'fonts/', ['fontsCopy']);
});

// server
gulp.task('browser-sync', function() {
	browserSync.init({
        port: 3000,
        notify: false,
		server: {
			baseDir: paths.outputDir
		}
	});
});

/* copy html to outputDir */
gulp.task('htmlCopy',function () {
    gulp.src(paths.devDir + '*.html')
        .pipe(gulp.dest(paths.outputDir))
        .pipe(browserSync.stream())
});

// copy fonts to outputDir
gulp.task('fontsCopy', function() {
	gulp.src(paths.devDir + 'fonts/**/*.*')
		.pipe(gulp.dest(paths.outputDir + 'fonts/'))
        .pipe(browserSync.stream())
});

// copy imgs to outputDir
gulp.task('imgCopy', function() {
    del.sync(paths.outputDir + 'img/');
	gulp.src(paths.devDir + 'img/**/*.*')
        .pipe(gulp.dest(paths.outputDir + 'img/'))
});

//clean
gulp.task('cleanApp', function() {
    return del.sync(paths.outputDir);
});

// ---------- final tasks ---------- //

//default
gulp.task('default', ['cleanApp', 'htmlCopy', 'fontsCopy', 'imgCopy', 'browser-sync', 'watch', 'scss', 'scripts']);