/**
 * Created by jin on 16/3/4.
 */

const path = require('path');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const scp = require('gulp-scp2');
const webpackStream = require('webpack-stream');
const productConfig = require('./product-webpack');
const rev = require('gulp-rev');
const revreplace = require('gulp-rev-replace');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const RevAll = require('gulp-rev-all');
const watch = require('gulp-watch');
const deployPath = '/home/hbc/scoreweb-management/';
const host = '172.16.7.30';
const username = 'hbc';
const password = 'kD*0dfu^%Ldf&h';

gulp.task('thirdDev', function () {
    'use strict';
    let rootPath = './js/third';
    return gulp.src([rootPath + '/es5-shim.min.js', rootPath + '/es5-sham.min.js'])
        .pipe(concat('ie.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(scp({
            host: host,
            username: username,
            password: password,
            dest: deployPath + 'static',
            watch: function (client) {
                client.on('write', function (o) {
                    console.log('write %s', o.destination);
                });
            }
        }))
        .on('error', function (err) {
            console.log(err);
        });
});

gulp.task('streamDev', function () {
    return gulp.src(['js/app/**', 'js/components/**', 'js/lib/**', 'js/page/**', 'js/redux/**', 'js/swf/**', 'js/third/**', 'css/*.scss'])
        .pipe(webpackStream(productConfig))
        .pipe(gulp.dest('dist'))
        .pipe(scp({
            host: host,
            username: username,
            password: password,
            dest: deployPath + 'static',
            watch: function (client) {
                client.on('write', function (o) {
                    console.log('write %s', o.destination);
                });
            }
        }))
        .on('error', function (err) {
            console.log(err);
        });
});

gulp.task('htmlDev', function () {
    return gulp.src(['template/*'])
    .pipe(gulp.dest('dist'))
        .pipe(watch(['template/*']))
        .pipe(gulp.dest('dist'))
        .pipe(scp({
            host: host,
            username: username,
            password: password,
            dest: deployPath + 'template',
            watch: function (client) {
                client.on('write', function (o) {
                    console.log('write %s', o.destination);
                });
            }
        }))
        .on('error', function (err) {
            console.log(err);
        });
});

gulp.task('echartsDev', function() {
    return gulp.src('js/lib/echarts.min.js')
        .pipe(gulp.dest('dist'))
        .pipe(scp({
            host: host,
            username: username,
            password: password,
            dest: deployPath + 'static',
            watch: function (client) {
                client.on('write', function (o) {
                    console.log('write %s', o.destination);
                });
            }
        }))
        .on('error', function (err) {
            console.log(err);
        })
});

gulp.task('dev', ['thirdDev', 'htmlDev', 'streamDev', 'echartsDev']);
