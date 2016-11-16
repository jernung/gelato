import filesystem from 'fs';
import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpConcat from 'gulp-concat';
import gulpInsert from 'gulp-insert';
import gulpReplace from 'gulp-replace';
import gulpSass from 'gulp-sass';
import gulpUmd from 'gulp-umd';

const buildDate = new Date();
const buildVersion = require('./package.json').version;

gulp.task('build', ['compile-js', 'compile-styles']);

gulp.task('watch', () => gulp.watch('./src/**/*', ['build']));

gulp.task(
  'compile-js',
  () => {
    return gulp
      .src(
        [
          './src/gelato.js',
          './src/modules/Application.js',
          './src/modules/View.js',
          './src/modules/Cookies.js',
          './src/modules/Collection.js',
          './src/modules/Component.js',
          './src/modules/Dialog.js',
          './src/modules/Locale.js',
          './src/modules/Model.js',
          './src/modules/Page.js',
          './src/modules/Router.js',
          './src/modules/Storage.js'
        ]
      )
      .pipe(gulpBabel({presets: ['latest']}))
      .pipe(gulpConcat('backbone-gelato.js'))
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
      .pipe(gulpInsert.prepend(filesystem.readFileSync('./src/header.js')))
      .pipe(gulpReplace('{!date!}', buildDate))
      .pipe(gulpReplace('{!version!}', buildVersion))
      .pipe(gulp.dest('./dist'));
  }
);

gulp.task(
  'compile-styles', () => {
    return gulp
      .src(
        [
          './src/styles/application.scss',
          './src/styles/component.scss',
          './src/styles/dialog.scss',
          './src/styles/page.scss'
        ]
      )
      .pipe(gulpSass())
      .pipe(gulpConcat('backbone-gelato.css'))
      .pipe(gulpInsert.prepend(filesystem.readFileSync('./src/header.js')))
      .pipe(gulpReplace('{!date!}', buildDate))
      .pipe(gulpReplace('{!version!}', buildVersion))
      .pipe(gulp.dest('./dist'));
  }
);
