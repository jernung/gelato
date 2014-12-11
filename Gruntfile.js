module.exports = function(grunt) {

    require('./framework/config.js');

    var path = {
        compilers: 'compilers',
        framework: 'framework',
        projects: 'projects',
        www: 'www'
    };

    var project = grunt.option('project') ? grunt.option('project') : 'gelato-starter';

    var setting = {
        crosswalk: {
            version: '10.39.235.12'
        }
    };

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-zip');

    grunt.initConfig({
        /**
         * GELATO
         */
        gelato: grunt.file.readJSON('package.json'),
        /**
         * CLEAN
         */
        clean: {
            'crosswalk': {
                src: [
                    path.compilers + '/android/crosswalk/**/*',
                    '!' + path.compilers + '/android/crosswalk/crosswalk-cordova-' + setting.crosswalk.version + '-arm.zip',
                    '!' + path.compilers + '/android/crosswalk/crosswalk-cordova-' + setting.crosswalk.version + '-x86.zip',
                    '!' + path.compilers + '/android/crosswalk/README.md'
                ],
                options: {force: true}
            },
            'node-modules': {
                src: ['nodemodules/**/*'],
                options: {force: true}
            },
            'www': {
                src: [path.www + '/' + project + '/**/*'],
                options: {force: true}
            },
            'www-all': {
                src: [
                    path.www + '/**/*',
                    '!' + path.www + '/README.md'
                ],
                options: {force: true}
            }
        },
        /**
         * COPY
         */
        copy: {
            'build': {
                files: [
                    {
                        expand: true,
                        cwd: path.framework,
                        src: ['**/*', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: path.www + '/' + project
                    },
                    {
                        expand: true,
                        cwd: '/' + project,
                        src: ['**/*', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: path.www + '/' + project
                    }
                ]
            }
        },
        /**
         * CSSLINT
         */
        csslint: {
            'www': {
                options: {
                    csslintrc: '.csslintrc',
                    import: 2
                },
                src: [
                    path.www + '/' + project + '/**/styles/**.*.css',
                    '!' + path.www + '/' + project + '/**/styles/bootstrap.css',
                    '!' + path.www + '/' + project + '/**/styles/bootstrap.switch.css',
                    '!' + path.www + '/' + project + '/**/styles/font.awesome.css'
                ]
            }
        },
        /**
         * JADE
         */
        jade: {
            'build': {
                files: [
                    {
                        expand: true,
                        cwd: path.framework,
                        src: ['**/*.jade'],
                        dest: path.www + '/' + project,
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: path.projects + '/' + project,
                        src: ['**/*.jade'],
                        dest: path.www + '/' + project,
                        ext: '.html'
                    }
                ]
            }
        },
        /**
         * JSHINT
         */
        jshint: {
            'www': {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    'Gruntfile.js',
                    path.www + '/' + project + '/**/*.js',
                    '!' + path.www + '/' + project + '/libraries/**/*.js'
                ]
            }
        },
        /**
         * REACT
         */
        react: {
            'build': {
                files: [
                    {
                        expand: true,
                        cwd: path.framework,
                        src: '**/*.jsx',
                        dest: path.www + '/' + project,
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: path.projects + '/' + project,
                        src: '**/*.jsx',
                        dest: path.www + '/' + project,
                        ext: '.js'
                    }
                ]
            }
        },
        /**
         * SASS
         */
        sass: {
            'build': {
                files: [
                    {
                        expand: true,
                        cwd: path.framework,
                        src: ['**/*.scss'],
                        dest: path.www + '/' + project,
                        ext: '.css'

                    },
                    {
                        expand: true,
                        cwd: path.projects + '/' + project,
                        src: ['**/*.scss'],
                        dest: path.www + '/' + project,
                        ext: '.css'
                    }
                ],
                options: {
                    sourcemap: 'none'
                }
            }
        },
        /**
         * UNZIP
         */
        unzip: {
            'crosswalk-arm': {
                src: path.compilers + '/android/crosswalk/crosswalk-cordova-' + setting.crosswalk.version + '-arm.zip',
                dest: path.compilers + '/android/crosswalk'
            },
            'crosswalk-x86': {
                src: path.compilers + '/android/crosswalk/crosswalk-cordova-' + setting.crosswalk.version + '-x86.zip',
                dest: path.compilers + '/android/crosswalk'
            }
        },
        /**
         * WATCH
         */
        watch: {
            'all': {
                files: [
                    path.projects + '/' + project + '/**/*.html',
                    path.projects + '/' + project + '/**/*.jade',
                    path.projects + '/' + project + '/**/*.js',
                    path.projects + '/' + project + '/**/*.jsx',
                    path.projects + '/' + project + '/**/*.scss',
                    path.framework + '/**/*.html',
                    path.framework + '/**/*.jade',
                    path.framework + '/**/*.js',
                    path.framework + '/**/*.jsx',
                    path.framework + '/**/*.scss'
                ],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        }
    });

    /**
     * TASK: build
     */
    grunt.registerTask('build', [
        'clean:www',
        'copy:build',
        'react:build',
        'jade:build',
        'sass:build',
        'validate'
    ]);

    /**
     * TASK: install-android
     */
    grunt.registerTask('install-android', [
        'clean:crosswalk',
        'unzip:crosswalk-arm',
        'unzip:crosswalk-x86'
    ]);

    /**
     * TASK: validate
     */
    grunt.registerTask('validate', [
        'csslint:www',
        'jshint:www'
    ]);

    /**
     * TASK: wash
     */
    grunt.registerTask('wash', [
        'clean:www-all'
    ]);

};
