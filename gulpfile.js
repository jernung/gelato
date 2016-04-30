'use strict';

var buildDate = new Date();
var buildVersion = require('./package.json').version;

var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var umd = require('gulp-umd');

gulp.task('build', ['compile-js', 'compile-styles']);

gulp.task('compile-js', function() {
  return gulp
    .src(
      [
        './src/init.js',
        './src/js/application.js',
        './src/js/view.js',
        './src/js/collection.js',
        './src/js/component.js',
        './src/js/dialog.js',
        './src/js/model.js',
        './src/js/page.js',
        './src/js/router.js'
      ]
    )
    .pipe(concat('gelato.js'))
    .pipe(umd({
      dependencies: function() {
        return [
          {
            name: 'jquery',
            amd: 'jquery',
            cjs: 'jquery',
            global: '$',
            param: '$'
          },
          {
            name: 'lodash',
            amd: 'lodash',
            cjs: 'lodash',
            global: '_',
            param: '_'
          },
          {
            name: 'backbone',
            amd: 'backbone',
            cjs: 'backbone',
            global: 'Backbone',
            param: 'Backbone'
          }
        ];
      }
    }))
    .pipe(insert.prepend(fs.readFileSync('./src/header.js')))
    .pipe(replace('{!date!}', buildDate))
    .pipe(replace('{!version!}', buildVersion))
    .pipe(gulp.dest('./'));
});

gulp.task('compile-styles', function() {
  return gulp
    .src(
      [
        './src/styles/application.scss',
        './src/styles/component.scss',
        './src/styles/dialog.scss',
        './src/styles/page.scss'
      ]
    )
    .pipe(sass())
    .pipe(concat('gelato.css'))
    .pipe(insert.prepend(fs.readFileSync('./src/header.js')))
    .pipe(replace('{!date!}', buildDate))
    .pipe(replace('{!version!}', buildVersion))
    .pipe(gulp.dest('./'));
});
