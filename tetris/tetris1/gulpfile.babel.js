'use stritc';

import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import scss from 'gulp-sass';
import watch from 'gulp-watch';
// import webserver from 'gulp-webserver'; 느려서 안씀
import browser from 'browser-sync';
const browserSync = browser.create();

const dirs = {
  src: './src', dest: './dist'
}

const scssoptions = {
  outputStyle: "expanded",
  indentType: "tab",
  indentWidth: 1,
  precision: 6,
  sourceComments: true
}


gulp.task('babel', () => {
  console.log('[run babel]');
  return gulp.src(
    [dirs.src + '/js/tetris.js',
    dirs.src + '/js/**/*.js'])
    .pipe(babel())
    .pipe(concat('total.js'))
    .pipe(gulp.dest(dirs.dest))
    .pipe(browserSync.reload( {stream : true} ));

});

gulp.task('sass', () => {
  console.log('[run sass]');
  return gulp.src(dirs.src + '/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(scss(scssoptions).on('error', scss.logError))
    .pipe(sourcemaps.write())
    .pipe(concat('total.css'))
    .pipe(gulp.dest(dirs.dest))
    .pipe(browserSync.reload( {stream : true} ));
});

gulp.task('moveHTML', () => {
  console.log('[run moveHTML]');
  return gulp.src(dirs.src + '/index.html')
    .pipe(gulp.dest(dirs.dest))
    .pipe(browserSync.reload( {stream : true} ));
});

gulp.task('watch', () => {
  console.log('==='.repeat(50), '[watch run]');
  gulp.watch(dirs.src + '/js/**/*.js', ['babel']);
  gulp.watch(dirs.src + '/sass/**/*.scss', ['sass']);
  gulp.watch(dirs.src + '/index.html', ['moveHTML']);
});

// gulp.task('webserver', () => {
//   gulp.src(dirs.dest)
//     .pipe(webserver({
//       livereload: true,
//       open: true
//     }));
// });

gulp.task('browserSync', ['babel', 'sass', 'moveHTML'], ()=>{
  return browserSync.init({
    port: 8888,
    server: {
      baseDir: dirs.dest
    }
  })
})


// gulp.task('default', ['babel', 'sass', 'moveHTML','watch'], () => {
//   console.log("=".repeat(50), "[default run]");
// });

gulp.task('default', ['browserSync', 'watch'], () => {
  console.log("=".repeat(50), "[default run]");
});
