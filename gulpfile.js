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

var tsProject = ts.createProject("tsconfig.json");
gulp.task("default", function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});