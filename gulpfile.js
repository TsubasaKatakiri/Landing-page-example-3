const { src, dest, watch, parallel, series } = require('gulp');

const webpack = require('webpack-stream');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');


function browsersync(){
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}


function cleanDist(){
    return del('dist');
}


function images(){
    return src('app/images/**/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/images'))
}


function scripts(){
    return src([
        'app/js/app.js'
    ])
    // .pipe(webpack({
    //     mode: 'development',
    //     output: {
    //         filename: 'app.js'
    //     },
    //     watch: false,
    //     devtool: "source-map",
    //     module: {
    //         rules: [
    //           {
    //             test: /\.m?js$/,
    //             exclude: /(node_modules|bower_components)/,
    //             use: {
    //               loader: 'babel-loader',
    //               options: {
    //                 presets: [['@babel/preset-env', {
    //                     debug: true,
    //                     corejs: 3,
    //                     useBuiltIns: "usage"
    //                 }]]
    //               }
    //             }
    //           }
    //         ]
    //       }
    // }))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}


function styles(){
    return src('app/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({        
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}


function build(){
    return src([
        'app/css/style.min.css',
        'app/js/app.min.js',
        'app/*.html'
    ], {base: 'app'}).pipe(dest('dist'))
}

function watching(){
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/app.js', '!app/js/app.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}


exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);