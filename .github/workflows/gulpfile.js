const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("sass"));

// Compile SCSS to CSS and minify
gulp.task("styles", function () {
  return gulp
    .src("src/scss/**/*.scss") // Source SCSS files
    .pipe(sass().on("error", sass.logError)) // Compile SCSS
    .pipe(cleanCSS()) // Minify CSS
    .pipe(concat("styles.min.css")) // Merge into one file
    .pipe(gulp.dest("dist/css")); // Save output
});

// Minify and concatenate JavaScript
gulp.task("scripts", function () {
  return gulp
    .src("src/js/**/*.js") // Source JS files
    .pipe(uglify()) // Minify JS
    .pipe(concat("scripts.min.js")) // Merge into one file
    .pipe(gulp.dest("dist/js")); // Save output
});

// Default task (runs all tasks)
gulp.task("default", gulp.parallel("styles", "scripts"));
