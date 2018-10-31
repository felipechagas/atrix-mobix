/**
 * Script de Automação
 * Versão: 1.4
 * Author: Isael Sousa <faelp22@gmail.com>
 * Data: 21/11/2017
 */
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var del = require("del");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
// var debug = require("gulp-debug");
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var babel = require('gulp-babel');
var gulpSync = require('gulp-sync')(gulp);


/**
 * Variaveis
 */
var tmp = "./temp/";
var dist = "./www/";
var app = "./src/js/";
var css = "./src/scss/";
var path_pug = "./src/pug/";
var libs = "./bower_components/";


/*########################## BLOCK PUG #############################*/


/**
 * Pug task
 */
gulp.task("pug", function () {

    gulp.src(path_pug + "index.pug")
        .pipe(pug())
        .pipe(gulp.dest(dist));

    gulp.src(path_pug + "views/*.pug")
        .pipe(pug())
        .pipe(gulp.dest(dist + "views/"));

});


/*########################## BLOCK JS #############################*/


/**
 * JS Hint Task
 */
gulp.task("jshint", function () {
    return gulp.src(app + "**/*.js")
        // .pipe(debug({title: "jshint:"}))
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});


/**
 * Minificação
 */
gulp.task("jsminsrc", function () {
    return gulp.src([app  + "**/*.js"])
        // .pipe(debug({title: "jsminsrc:"}))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify().on("error", function (e) { console.log(e); }))
        .pipe(gulp.dest(tmp));
});


/**
 * Coletor de bibliotecas e js
 */
gulp.task("coletorjs", function () {
    return gulp.src([
        libs + "angular/angular.min.js",
        libs + "angular-ui-router/release/angular-ui-router.min.js",
        libs + "angucomplete-alt/dist/angucomplete-alt.min.js",
        libs + "ng-tags-input/ng-tags-input.min.js",
        libs + "moment/min/moment-with-locales.min.js",
        libs + "moment-timezone/builds/moment-timezone-with-data.min.js",
        libs + "jquery.maskedinput/dist/jquery.maskedinput.min.js",
        libs + "eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js",
        libs + 'angular-ui-mask/dist/mask.min.js',
        libs + 'angular-aria/angular-aria.js',
        libs + 'angular-animate/angular-animate.js',
        libs + 'angular-messages/angular-messages.js',
        libs + 'angular-material/angular-material.js',
        tmp + "**/*.js"
    ])
        // .pipe(debug({title: "coletorjs:"}))
        .pipe(concat("app_modulo_mobix.min.js"))
        .pipe(gulp.dest(dist + "js/"));
});


/*########################## BLOCK CSS #############################*/


gulp.task("scss", function () {
    gulp.src(css + "style.scss")
        // .pipe(debug({title: "scss:"}))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest(tmp));
});

/**
 * Coletando bibliotecas e css
 */
gulp.task("coletorcss", function () {
    return gulp.src([
            libs + "eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css",
            libs + "angucomplete-alt/angucomplete-alt.css",
            libs + "ng-tags-input/ng-tags-input.css",
            libs + "ng-tags-input/ng-tags-input.bootstrap.css",
            libs + "angular-material/angular-material.css",
            tmp + "**/*.css"
        ])
        // .pipe(debug({title: "coletorcss:"}))
        .pipe(concat("style_modulo_mobix.min.css"))
        .pipe(gulp.dest(dist + "css/"));
});

gulp.task("cleanBuild", function () {
    return del(dist, { force: true });
});

gulp.task("clean", function () {
    return del(tmp, { force: true });
});

/**
 * Ativa monitor automático
 */
gulp.task("monitor", function () {
    gulp.watch([path_pug + "**/*.pug"], ["pug"]);
    gulp.watch([app + "**/*.js"], ["jshint", "jsminsrc", "coletorjs"]);
    gulp.watch([css + "**/*.scss"], ["scss", "coletorcss"]);
});

gulp.task('default', gulpSync.sync(["pug", "jshint", "jsminsrc", "coletorjs", "scss", "coletorcss"]));

gulp.task('dev', gulpSync.sync(["pug", "jshint", "jsminsrc", "coletorjs", "scss", "coletorcss", "monitor"]));