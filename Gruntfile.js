/*global module */
module.exports = function (grunt) {

    // configuration
    grunt.initConfig({

        // js hint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['coverage/**/*.js']
            },
            files: {
                src: [
                    'lib/**/*.js',
                    'test/**/*.js'
                ]
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },

        // testing
        mochaTest: {
            unit: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/unit/**/*.js']
            }
        },

        /*
        watch: {
            lint: {
                files: '<%= jshint.files.src %>',
                tasks: 'jshint'
            },
            test: {
                files: ['test/unit/*.js'],
                tasks: ['jshint', 'mochaTest:unit']
            }
        },
        */

        // code coverage / istanbul
        clean: {
            coverage: {
                src:['coverage/']
            }
        },

        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: '../coverage/instrument/'
            }
        },

        instrument: {
            files: [
                'lib/**/*.js',
                'main.js',
            ],
            options: {
                lazy: true,
                basePath: 'coverage/instrument/'
            }
        },

        storeCoverage: {
            options: {
                dir: 'coverage/reports'
            }
        },

        makeReport: {
            src: 'coverage/reports/**/*.json',
            options: {
                type: 'html',
                dir: 'coverage/reports',
                print: 'detail'
            }
        }

    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // tasks
    grunt.registerTask('test', ['jshint', 'mochaTest']);
    grunt.registerTask('coverage', ['jshint', 'clean', 'env:coverage',
        'instrument', 'mochaTest', 'storeCoverage', 'makeReport']);

};
