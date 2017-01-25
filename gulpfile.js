'use strict';

var gulp = require('gulp');
var path = require('path');
var rename = require('gulp-rename');
var template = require('gulp-template');
var yargs = require('yargs');

function resolveTemplatePath(type) {
  return path.join(__dirname, 'generate', type + '.js');
}

gulp.task('generate', () => {
  const type = yargs.argv.type;
  let name = yargs.argv.name;

  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  switch (type) {
    case 'component':
      name = cap(name);
      break;
    case 'container':
      name = cap(name) + 'Container';
      break;
  }

  const destPath = path.join(__dirname, 'src', type + 's');

  return gulp.src(resolveTemplatePath(type))
    .pipe(template({
      name: name
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace(type, name);
    }))
    .pipe(gulp.dest(destPath));
});
