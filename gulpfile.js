var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
/*---------------------------------------------*/
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
/*-----------------------------------------------*/
var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['jshint']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});




/*---------------------------------------*/
gulp.task('jshint', function() {
  gulp.src('./www/js/controllers/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

var src = './www/js/controllers/*.js';
var dist = './www/js/controllers/dist'

gulp.task('uglify_controllers', function() {
  gulp.src(src)    
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest(dist));
});


//var src = '[./www/js/providers/*.js, ]';
/*var dist = './www/js/providers/dist';
gulp.task('uglify_providers', function() {
  gulp.src(['./www/js/providers/*.js','!./www/js/providers/angular-base64.js','!./www/js/providers/angular-resource.js','!./www/js/providers/angular-resource.min.js','!./www/js/providers/ui-bootstrap-tpls-0.12.0.js','!./www/js/providers/ui-bootstrap-tpls-0.12.0.min.js'])    
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(concat('script_providers.js'))
    .pipe(gulp.dest(dist));
});*/
/*----------------------------------------*/





gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
