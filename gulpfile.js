var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");

// var paths = {
//   pages: ["src/*.html"],
// };
// gulp.task("copy-html", function () {
//   return gulp.src(paths.pages).pipe(gulp.dest("dist"));
// });

gulp.task("browserify", function () {
  return browserify({
    basedir: ".",
    debug: true,
    entries: ["src/main.ts"],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));
});

var filesToMove = [
  './src/css/**/*.css',
  './src/js/**/*.js',
  './images/**/*.*',
  './manifest.json'
];

gulp.task('moveFiles', function () {
  return gulp.src(filesToMove, { base: '.' }).pipe(gulp.dest('dist'))
})

gulp.task(
  "default",
  gulp.series(['browserify', 'moveFiles'])
);