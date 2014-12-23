module.exports = function(grunt) {

    require('./framework/core/config/app.js');

    var path = {
        build: 'build',
        compilers: 'compilers',
        docs: 'docs',
        framework: 'framework',
        projects: 'projects',
        www: 'www',
        yuidoc: 'yuidoc'
    };

    var project = grunt.option('project');

    var setting = {
        crosswalk: {
            version: '10.39.235.13'
        }
    };

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
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
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-zip');

    grunt.initConfig({
        /**
         * PACKAGE
         */
        pkg: {
            application: function() {
                if (grunt.file.isFile(path.projects + '/' + project + '/package.json')) {
                    return grunt.file.readJSON(path.projects + '/' + project + '/package.json');
                }
                return grunt.file.readJSON('package.json');
            }(),
            framework: function() {
                return grunt.file.readJSON('package.json');
            }()
        },
        /**
         * CLEAN
         */
        clean: {
            'build': {
                src: [path.build + '/' + project + '/**/*'],
                options: {force: true}
            },
            'build-all': {
                src: [
                    path.build + '/**/*',
                    '!' + path.build + '/README.md'
                ],
                options: {force: true}
            },
            'crosswalk': {
                src: [
                    path.compilers + '/android/crosswalk/**/*',
                    '!' + path.compilers + '/android/crosswalk/crosswalk-cordova-' + setting.crosswalk.version + '-arm.zip',
                    '!' + path.compilers + '/android/crosswalk/crosswalk-cordova-' + setting.crosswalk.version + '-x86.zip',
                    '!' + path.compilers + '/android/crosswalk/README.md'
                ],
                options: {force: true}
            },
            'docs': {
                src: [path.docs + '/' + project + '/**/*'],
                options: {force: true}
            },
            'docs-all': {
                src: [
                    path.docs + '/**/*',
                    '!' + path.docs + '/README.md'
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
         * COFFEE
         */
        coffee: {
            'build': {
                files: [
                    {
                        expand: true,
                        cwd: path.framework,
                        src: '**/*.coffee',
                        dest: path.www + '/' + project,
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: path.projects + '/' + project,
                        src: '**/*.coffee',
                        dest: path.www + '/' + project,
                        ext: '.js'
                    }
                ]
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
                        src: ['**/*', '!**/*.coffee', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: path.www + '/' + project
                    },
                    {
                        expand: true,
                        cwd: path.projects + '/' + project,
                        src: ['**/*', '!**/*.coffee', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
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
         * REPLACE
         */
        replace: {
            'build': {
                options: {
                    variables: {
                        'application-description': '<%= pkg.application.description %>',
                        'application-name': '<%= pkg.application.name %>',
                        'application-title': '<%= pkg.application.title %>',
                        'application-version': '<%= pkg.application.version %>',
                        'framework-version': '<%= pkg.framework.version %>'
                    }
                },
                files: [
                    {src: 'index.html', dest: path.www + '/'+ project, expand: true, cwd: path.www + '/'+ project},
                    {src: 'config/app.js', dest: path.www + '/'+ project, expand: true, cwd: path.www + '/'+ project}
                ]
            }
        },
        /**
         * REQUIREJS
         */
        requirejs: {
            'build-combine': {
                options: {
                    baseUrl: path.www + '/' + project,
                    dir: path.build + '/' + project,
                    fileExclusionRegExp: undefined,
                    generateSourceMaps: false,
                    keepBuildDir: false,
                    modules: app.config.modules,
                    optimize: 'none',
                    optimizeCss: 'standard',
                    paths: app.config.paths,
                    preserveLicenseComments: true,
                    removeCombined: true,
                    shim: app.config.shim
                }
            },
            'build-compact': {
                options: {
                    baseUrl: path.www + '/' + project,
                    dir: path.build + '/' + project,
                    fileExclusionRegExp: undefined,
                    generateSourceMaps: false,
                    keepBuildDir: false,
                    modules: app.config.modules,
                    optimize: 'uglify',
                    optimizeCss: 'standard',
                    paths: app.config.paths,
                    preserveLicenseComments: false,
                    removeCombined: true,
                    shim: app.config.shim
                }
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
         * SHELL
         */
        shell: {},
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
                    path.projects + '/' + project + '/**/*.coffee',
                    path.projects + '/' + project + '/**/*.html',
                    path.projects + '/' + project + '/**/*.jade',
                    path.projects + '/' + project + '/**/*.js',
                    path.projects + '/' + project + '/**/*.jsx',
                    path.projects + '/' + project + '/**/*.scss',
                    path.framework + '/**/*.coffee',
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
        },
        /**
         * YUIDOC
         */
        yuidoc: {
            'build': {
                name: '<%= pkg.application.title %>',
                description: '<%= pkg.application.description %>',
                version: '<%= pkg.application.version %>',
                options: {
                    exclude: 'libraries',
                    paths: [
                        path.projects + '/' + project,
                        path.framework
                    ],
                    themedir: path.yuidoc,
                    outdir: path.docs + '/' + project
                }
            }
        }
    });

    /**
     * TASK: build
     */
    grunt.registerTask('build', function(type) {
        grunt.task.run([
            'check-requirements',
            'clean:www',
            'copy:build',
            'coffee:build',
            'react:build',
            'jade:build',
            'sass:build',
            'replace:build',
            'validate'
        ]);
        if (type === 'combine') {
            grunt.task.run('requirejs:build-combine');
        } else if (type === 'compact') {
            grunt.task.run('requirejs:build-compact');
        }
    });

    /**
     * TASK: check-requirements
     */
    grunt.registerTask('check-requirements', function() {
        if (!project) {
            grunt.log.error('No project declared.');
            return false;
        }
        if (!grunt.file.isDir(path.projects + '/' + project)) {
            grunt.log.error('Project directory not found.');
            return false;
        }
        if (!grunt.file.isFile(path.projects + '/' + project + '/package.json')) {
            grunt.log.error('Project directory missing package.json file.');
            return false;
        }
    });

    /**
     * TASK: docs
     */
    grunt.registerTask('docs', function() {
        grunt.task.run([
            'check-requirements',
            'clean:docs',
            'yuidoc:build'
        ]);
    });

    /**
     * TASK: install-android
     */
    grunt.registerTask('install-android', function() {
        grunt.task.run([
            'check-requirements',
            'clean:crosswalk',
            'unzip:crosswalk-arm',
            'unzip:crosswalk-x86'
        ]);
    });

    /**
     * TASK: validate
     */
    grunt.registerTask('validate', function() {
        grunt.task.run([
            'check-requirements',
            'csslint:www',
            'jshint:www'
        ]);
    });

    /**
     * TASK: wash
     */
    grunt.registerTask('wash', function() {
        grunt.task.run([
            'check-requirements',
            'clean:www-all'
        ]);
    });

};
