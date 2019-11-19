let gulp = require("gulp"),
    imagemin = require('gulp-imagemin'),              //压缩图片1
    tinypngWeb = require('gulp-tinypng-compress'),       //压缩图片2 需要有KEY,
    tinypngWx = require('gulp-tinypng-compress'),       //压缩图片2 需要有KEY,
    tinypngAnroid = require('gulp-tinypng-compress'),       //压缩图片2 需要有KEY,
    tinypng_nokey = require('gulp-tinypng-nokey'),   //压缩图片3 免费
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');
// runSequence = require('run-sequence');


//图片压缩1(感觉压缩程度不够)
gulp.task('compress_img', function () {
    gulp.src('./build/web-mobile/**/*.{png,jpg,jpeg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true,    //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true,     //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true       //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('./build/web-mobile/'))
});

//压缩图片2 (需要有KEY,并且每个月只有500张)
//qXKDfhml2xCYQq6q1gQNFLgwJ3gY9DS5
gulp.task('tinypngWeb', () => {
    return new Promise((resolve, reject) => {
        gulp.src('./build/web-mobile/**/*.{png,jpg,jpeg,gif,ico}')
            .pipe(tinypngWeb({
                key: 'Hdow30XfbJBkLWjRZaitoc9hGVtKKTLN',
                sigFile: 'gulptest/yes/img/.tinypng-sigs',
                log: true
            }))
            .pipe(gulp.dest('./build/web-mobile/'));
        resolve();
    })
})
/**
 *
 6SBQYMHNvzCKLC0H5R0stv8LtNffrKRG
 Hdow30XfbJBkLWjRZaitoc9hGVtKKTLN
 */

gulp.task('tinypngWx', () => {
    return new Promise((resolve, reject) => {
        gulp.src('./build/wechatgame/**/*.{png,jpg,jpeg,gif,ico}')
            .pipe(tinypngWx({
                key: 'Hdow30XfbJBkLWjRZaitoc9hGVtKKTLN',
                sigFile: 'gulptest/yes/img/.tinypng-sigs',
                log: true
            }))
            .pipe(gulp.dest('./build/wechatgame/'));
        resolve();
    })

})

gulp.task('tinypngAnroid', () => {
    return new Promise((resolve, reject) => {
        gulp.src('./build/jsb-link/**/*.{png,jpg,jpeg,gif,ico}')
            .pipe(tinypngAnroid({
                key: 'Hdow30XfbJBkLWjRZaitoc9hGVtKKTLN',
                sigFile: 'gulptest/yes/img/.tinypng-sigs',
                log: true
            }))
            .pipe(gulp.dest('./build/jsb-link/'));
        resolve();
    })

})

//压缩图片3 (免费 常用)
gulp.task('tp', function () {
    return new Promise((resolve, reject) => {
        gulp.src('./build/web-mobile/**/*.{png,jpg,jpeg,gif,ico}')
            .pipe(tinypng_nokey())
            .pipe(gulp.dest('./build/web-mobile/'))
        resolve();
    })

})

gulp.task('copy-allJS', function () {
    return new Promise((resolve, reject) => {
        gulp.src('./assets/**/*.ts')
            .pipe(concat('allCode.ts'))
            // .pipe(uglify())            //压缩
            .pipe(gulp.dest('./code/'))
        resolve();
    })

})

//copy
gulp.task('copy', function () {
    return gulp.src('./plugin-resource/**/*')
        .pipe(gulp.dest('./code/'))
});


// gulp.task('build', function (done) {
//     return new Promise((resolve, reject) => {
//         condition = false;
//         runSequence(
//             'compress_img',
//             'tinypng',
//             'tinypngWx',
//             'tp',
//             done);
//         resolve();
//     })
// });