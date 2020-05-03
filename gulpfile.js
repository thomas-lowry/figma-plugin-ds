// Initialize gulp + modules
const { src, dest, watch, series, parallel } = require('gulp');

// gulp plugins
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssSvg = require('gulp-css-svg');

// File paths
const files = { 
    scssPath: 'src/styles/**/*.scss',
    jsPath: 'src/js/**/*.js',
    html: 'src/index.html',
    assetsPath: 'src/icons/**/*.svg'
}

// SCSS task: compiles the styles.scss file into styles.css
function scssTask(){    
    return src(files.scssPath)
        .pipe(sass()) //compile to css
        .pipe(postcss([autoprefixer()])) // PostCSS plugins
        .pipe(cssSvg())
        .pipe(dest('dist')
    ); 
}

// JS task: concatenates JS files to scripts.js (minifies on production build)
function jsTask(){
    return src([files.jsPath])
        .pipe(concat('figma-plugin-ds.js'))
        .pipe(dest('dist')
    );
}

//HTML task: copies and minifies 
function htmlTask() {
    return src([files.html])
        .pipe(dest('dist'))
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
    watch([files.scssPath, files.jsPath, files.html, files.assetsPath],
        {interval: 1000, usePolling: true}, 
        series(
            parallel(scssTask, jsTask),
            htmlTask
        )
    );    
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask), 
    htmlTask,
    watchTask,
);