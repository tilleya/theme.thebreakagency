const {src, dest} = require('gulp');
const pump = require('pump');
const zip = require('gulp-zip');
const beeper = require('beeper');

function handleError(done) {
    return function (err) {
        if (err) {
            console.error('Error details:', err);
            beeper();
        }
        return done(err);
    };
}

function zipper(done) {
    const filename = require('./package.json').name + '.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**',
            '!.git', '!.git/**',
            '!.github', '!.github/**',
            '!yarn-error.log',
            '!yarn.lock',
            '!deploy.sh',
            '!gulpfile.js',
            '!.DS_Store',
            '!*.zip'
        ]),
        zip(filename),
        dest('dist/')
    ], handleError(done));
}

exports.zip = zipper;
exports.default = zipper;
