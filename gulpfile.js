'use strict';

var buildDate = new Date();
var buildVersion = require('./package.json').version;

var fs = require('fs');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpInsert = require('gulp-insert');
var gulpReplace = require('gulp-replace');
var gulpSass = require('gulp-sass');
var gulpUmd = require('gulp-umd');

gulp.task('build', ['compile-js', 'compile-styles']);

gulp.task('watch', function() {
  gulp.watch('./src/**/*', ['build']);
});

gulp.task('compile-js', function() {
  return gulp
    .src(
      [
        './src/gelato.js',
        './src/modules/Application.js',
        './src/modules/View.js',
        './src/modules/Collection.js',
        './src/modules/Component.js',
        './src/modules/Model.js',
        './src/modules/Page.js',
        './src/modules/Router.js',
        './src/modules/Storage.js'
      ]
    )
    .pipe(gulpConcat('backbone-gelato.js'))
    .pipe(gulpBabel({presets: ['es2015']}))
    .pipe(gulpUmd({
      namespace: function() {
        return 'Gelato';
      },
      exports: function() {
        return 'Gelato';
      },
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
    .pipe(gulpInsert.prepend(fs.readFileSync('./src/header.js')))
    .pipe(gulpReplace('{!date!}', buildDate))
    .pipe(gulpReplace('{!version!}', buildVersion))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compile-styles', function() {
  return gulp
    .src(
      [
        './src/styles/application.scss',
        './src/styles/component.scss',
        './src/styles/page.scss'
      ]
    )
    .pipe(gulpSass())
    .pipe(gulpConcat('backbone-gelato.css'))
    .pipe(gulpInsert.prepend(fs.readFileSync('./src/header.js')))
    .pipe(gulpReplace('{!date!}', buildDate))
    .pipe(gulpReplace('{!version!}', buildVersion))
    .pipe(gulp.dest('./dist'));
});
