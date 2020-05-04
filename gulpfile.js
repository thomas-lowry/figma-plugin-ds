// Initialize gulp + modules
const { src, dest, watch, series, parallel } = require('gulp');

// gulp plugins
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssSvg = require('gulp-css-svg');
const prettier = require('gulp-prettier');

// File paths
const files = { 
    scssPath: 'src/styles/**/*.scss',
    jsPathIIFE: 'src/js/iife/**/*.js',
    jsPathES6: 'src/js/modules/**/*.js',
    assetsPath: 'src/icons/**/*.svg'
}

// SCSS task: compiles the styles.scss file into styles.css
function scssTask(){    
    return src(files.scssPath)
        .pipe(sass({
            outputStyle: 'expanded'
        })) //compile to css
        .pipe(postcss([autoprefixer()])) // PostCSS plugins
        .pipe(cssSvg())
        .pipe(dest('dist')
    ); 
}

//JS Task Modules: Generates all modules ready for export
function jsTaskIIFE(){
    return src([files.jsPathIIFE])
        .pipe(concat('figma-plugin-ds.js'))
        .pipe(prettier({ 
            "parser":"babel",
            "printWidth":100,
            "tabWidth":4,
            "useTabs":true,
            "semi":true,
            "singleQuote":true,
            "trailingComma":"none",
            "bracketSpacing":true,
            "jsxBracketSameLine":true,
            "arrowParens":"always"
        }))
        .pipe(dest('dist/iife')
    );
}

// JS task: concatenates JS files to scripts.js (minifies on production build)
function jsTaskES6(){
    return src([files.jsPathES6])
        .pipe(prettier({ 
            "parser":"babel",
            "printWidth":100,
            "tabWidth":4,
            "useTabs":true,
            "semi":true,
            "singleQuote":true,
            "trailingComma":"none",
            "bracketSpacing":true,
            "jsxBracketSameLine":true,
            "arrowParens":"always"
        }))
        .pipe(dest('dist/modules')
    );
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
    watch([files.scssPath, files.jsPathIIFE, files.jsPathES6, files.assetsPath],
        {interval: 1000, usePolling: true}, 
        series(
            parallel(scssTask, jsTaskIIFE, jsTaskES6)
        )
    );    
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTaskIIFE, jsTaskES6),
    watchTask
);