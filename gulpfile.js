var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect-php');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var del = require('del');



// const autoprefixer = require('gulp-autoprefixer');



gulp.task('connect-sync', function() {
  connect.server({
    port: 9001,
    base: 'app',
    open: false
  }, function (){
    browserSync({
      proxy: '127.0.0.1:9001',
      baseDir   : ['.tmp', 'app']
      // baseDir: 'app'
    });
  });
 
  gulp.watch(['app/**/*.html','app/*.php','app/css/*.css','app/js/*.js']).on('change', function () {
    browserSync.reload();
  });

  // gulp.watch('app/js/*.js').on('change', function () {
  //   browserSync.reload();
  // });

});

// SASS TASK

// BROWSER SYNC TASK?

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

  // browserSync.init({
  //   server: "./"
  // });

  gulp.watch("app/**/*.scss", ['sass']);
  // gulp.watch("./*.html").on('change', browserSync.reload);
});

// CSS MOVE TO DIST
gulp.task('css', function() {
  return gulp.src(['app/css/**/*'])
  .pipe(gulp.dest('dist/css'))
});


gulp.task('json', function() {
  return gulp.src(['app/js/*.json'])
  .pipe(gulp.dest('dist/js'))
});


gulp.task('images', function(){
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src("app/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream({ match: 'app/**/*.css' }));
});

// gulp.task('default', ['serve']);
gulp.task('default', ['connect-sync','serve']);

// BUILD ACTION
gulp.task('useref', function(){
  // return gulp.src(['app/*.php','app/includes/**/*.php'])

  return gulp.src(['!./node_modules/**','app/**/*.php','app/**/*.html'])
  // return gulp.src(['app/*.php','app/includes/*.php'])
  // return gulp.src(['app/*.php','app/includes/*.php'])
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});


// CLEAR DIST FOLDER
gulp.task('clean:dist', function() {
  return del.sync('dist');
});


// BUILD FOR PRODUCTION
gulp.task('build', function (callback) {
  runSequence('clean:dist', 'sass', 'css','json', 'useref', 'images', callback)
});