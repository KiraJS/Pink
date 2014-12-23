var LessAutoprefixer = require('less-plugin-autoprefix');
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Lint Spaces in code
        lintspaces: {
            all: {
                src: [
                    '*.html'
                ],
                options: {
                    newline: true,
                    newlineMaximum: 2,
                    trailingspaces: true,
                    indentationGuess: true,
                    editorconfig: '.editorconfig',
                    ignores: [
                        'html-comments',
                        'js-comments'
                    ],
                    showTypes: true,
                    showCodes: true
                }
            }
        },
        less:{
            development: {
                options: {
                    sourceMap : true,
                    sourceMapFilename : 'style.css.map',
                    plugins: [
                        new LessAutoprefixer({ browsers: [ 'last 2 versions' ] }),
                    ],
                },
                files: {
                    'css/style.css' : 'css/style.less'
                }
            },
            production: {
                 options: {
                    plugins: [
                        new LessAutoprefixer({ browsers: [ 'last 2 versions' ] }),
                    ],
                },
                files: {
                    'css/style.css' : 'css/style.less'
                }
            }
            },
        cssmin: {
            style: {
                options: {
                    keepSpecialComments: 0,
                    report: 'gzip'
                },
                files: {
                    'css/style.css': ['css/style.css']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-lintspaces');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('development', ['less']);
    grunt.registerTask('production', ['less', 'cssmin']);
    grunt.registerTask('lint', [ 'lintspaces' ]);


};
