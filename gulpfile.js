import gulp  from 'gulp';
import pug  from 'gulp-pug';
import copy  from 'gulp-copy';
import concat  from 'gulp-concat';
import cleanCSS  from 'gulp-clean-css';
import webpackStream  from 'webpack-stream';
import plumber  from 'gulp-plumber';
import livereload from 'gulp-livereload'
import autoprefixer from 'gulp-autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
import sass from 'gulp-sass';
import * as sassModule from 'sass';
import gulpTypescript from "gulp-typescript";
import webpackConfig  from './webpack.config.js';


const gulpSass = sass(sassModule);
// Define a variable for your source and destination directories
const srcDir = 'src/';
const destDir = 'dist/';
const tsProject = gulpTypescript.createProject('tsconfig.json');


gulp.task('pug', function() {
    return gulp.src(srcDir + 'pug/pages/*.pug')
      .pipe(pug({
        pretty: true // Optional: Beautify the output HTML
      }))
      .pipe(gulp.dest(destDir))
      .pipe(livereload())
});


// Define a task for copying Bootstrap and Font Awesome files
gulp.task('copy-assets', function() {
    return gulp.src([
        srcDir + '../node_modules/bootstrap/dist/css/bootstrap.min.css',
        srcDir + '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        srcDir + '../node_modules/@fortawesome/fontawesome-free/css/all.min.css',
        srcDir + '../node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf',
        srcDir + '../node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2',
        srcDir + '../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf',
        srcDir + '../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2',
        srcDir + '../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf',
        srcDir + '../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2',
        srcDir + '../node_modules/@fortawesome/fontawesome-free/webfonts/fa-v4compatibility.ttf',
        srcDir + '../node_modules/@fortawesome/fontawesome-free/webfonts/fa-v4compatibility.woff2',


      ])
      .pipe(copy(destDir, { prefix: 3 }))
      .pipe(livereload())

});

  gulp.task('sass', async function() {
    return gulp.src('src/sass/**/*.scss') // Path to your Sass files
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(gulpSass().on('error', gulpSass.logError)) // Compile Sass to CSS
    .pipe(autoprefixer()) // Add vendor prefixes
    .pipe(cleanCSS()) // Minify the CSS
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(sourcemaps.init())

    .pipe(livereload())
  });

  gulp.task('js', function() {
   
    return gulp.src('./src/ts/index.ts')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload());
  });

  


gulp.task('copy-images', ()=>{
    return gulp.src('src/images/*')
    .pipe(copy('dist/images', { prefix: 2 }))
    .pipe(livereload())

});

gulp.task('watch', function() {
    import('./server.js')
    livereload.listen()
    gulp.watch(srcDir + 'pug/**/*.pug', gulp.series('pug'));
    gulp.watch(srcDir + 'sass/**/*.scss', gulp.series('sass'));
    gulp.watch(srcDir + 'ts/**/*.ts', gulp.series('js'));
    gulp.watch('src/images/*', gulp.series('copy-images'));
});