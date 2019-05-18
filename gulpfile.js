'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var shell = require('gulp-shell');
var protractor = require("gulp-protractor").protractor;
var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
var reporterUtils;


// Delete previous generated folder
gulp.task('clean', function () {
  return gulp.src('./generated', {read: false, allowEmpty: true})
    .pipe(clean({force: true}));
});

// transpile js from ts files
gulp.task('tsc', shell.task('tsc'));

gulp.task('build', gulp.series('clean', 'tsc'));

gulp.task('webdriver:start', webdriver_standalone);

// run protractor tests
gulp.task('prot', function(callback) {
  var configFile = require('./qaprotractor.conf.js');

  gulp.src(configFile.config.specs)
    .pipe(protractor({
      configFile: "./qaprotractor.conf.js",
      args: [
        '--baseUrl', 'http://localhost:4444/wd/hub',
      ]
    }))
    .on('error', function(e) { throw e })
});

// this is task to Global HTML reports.
gulp.task('report', function () {
  setTimeout(function () {
    reporterUtils = require('./generated/fwk/reportUtils/ReporterUtils');
    reporterUtils.generateGlobalReports();
  }, 5000);
});

gulp.task('run', gulp.parallel('webdriver:start', 'prot'));

gulp.task('e2e', gulp.series('clean', 'tsc', 'run', 'report'));
