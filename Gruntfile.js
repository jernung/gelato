module.exports = function(grunt) {

    require('./framework/core/config/app.js');

    var path = {
        build: 'build',
        cordova: 'cordova',
        docs: 'docs',
        framework: 'framework',
        projects: 'projects',
        www: 'www',
        yuidoc: 'yuidoc'
    };

    var framework = function() {
        return grunt.file.readJSON('package.json');
    }();

    var project = function() {
        var projectName = grunt.option('project');
        if (!projectName) {
            return;
        }
        if (grunt.file.isFile(path.projects + '/' + projectName + '/package.json')) {
            return grunt.file.readJSON(path.projects + '/' + projectName + '/package.json');
        }
        return grunt.file.readJSON('package.json');
    }();

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
         * CLEAN
         */
        clean: {
            'build': {
                src: [path.build + '/' + project.name + '/**/*'],
                options: {force: true}
            },
            'build-all': {
                src: [
                    path.build + '/**/*',
                    '!' + path.build + '/README.md'
                ],
                options: {force: true}
            },
            'cordova': {
                src: [path.cordova + '/' + project.name + '/**/*'],
                options: {force: true}
            },
            'cordova-all': {
                src: [
                    path.cordova + '/**/*',
                    '!' + path.cordova + '/README.md'
                ],
                options: {force: true}
            },
            'cordova-www': {
                src: [path.cordova + '/' + project.name + '/www/**/*'],
                options: {force: true}
            },
            'crosswalk': {
                src: [
                    path.cordova + '/crosswalk/**/*',
                    '!' + path.cordova + '/crosswalk/crosswalk-cordova-' + setting.crosswalk.version + '-arm.zip',
                    '!' + path.cordova + '/crosswalk/crosswalk-cordova-' + setting.crosswalk.version + '-x86.zip',
                    '!' + path.cordova + '/crosswalk/README.md'
                ],
                options: {force: true}
            },
            'docs': {
                src: [path.docs + '/' + project.name + '/**/*'],
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
                src: [path.www + '/' + project.name + '/**/*'],
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
                        dest: path.www + '/' + project.name,
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: path.projects + '/' + project.name,
                        src: '**/*.coffee',
                        dest: path.www + '/' + project.name,
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
                        dest: path.www + '/' + project.name
                    },
                    {
                        expand: true,
                        cwd: path.projects + '/' + project.name,
                        src: ['**/*', '!**/*.coffee', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: path.www + '/' + project.name
                    }
                ]
            },
            'www-cordova': {
                files: [
                    {
                        expand: true,
                        cwd: path.www + '/' + project.name,
                        src: ['**/*'],
                        dest: path.cordova + '/' + project.name + '/www'
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
                    path.www + '/' + project.name + '/**/styles/**.*.css',
                    '!' + path.www + '/' + project.name + '/**/styles/bootstrap.css',
                    '!' + path.www + '/' + project.name + '/**/styles/bootstrap.switch.css',
                    '!' + path.www + '/' + project.name + '/**/styles/font.awesome.css'
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
                        dest: path.www + '/' + project.name,
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: path.projects + '/' + project.name,
                        src: ['**/*.jade'],
                        dest: path.www + '/' + project.name,
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
                    path.www + '/' + project.name + '/**/*.js',
                    '!' + path.www + '/' + project.name + '/libraries/**/*.js'
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
                        dest: path.www + '/' + project.name,
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: path.projects + '/' + project.name,
                        src: '**/*.jsx',
                        dest: path.www + '/' + project.name,
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
                        'application-description': project.description,
                        'application-name': project.name,
                        'application-title': project.title,
                        'application-version': project.version,
                        'framework-version': framework.version
                    }
                },
                files: [
                    {src: 'index.html', dest: path.www + '/'+ project.name, expand: true, cwd: path.www + '/'+ project.name},
                    {src: 'core/config/app.js', dest: path.www + '/'+ project.name, expand: true, cwd: path.www + '/'+ project.name}
                ]
            }
        },
        /**
         * REQUIREJS
         */
        requirejs: {
            'build-combine': {
                options: {
                    baseUrl: path.www + '/' + project.name,
                    dir: path.build + '/' + project.name,
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
                    baseUrl: path.www + '/' + project.name,
                    dir: path.build + '/' + project.name,
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
                        dest: path.www + '/' + project.name,
                        ext: '.css'

                    },
                    {
                        expand: true,
                        cwd: path.projects + '/' + project.name,
                        src: ['**/*.scss'],
                        dest: path.www + '/' + project.name,
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
        shell: {
            'install-cordova': {
                command: [
                    'cd ' + path.cordova,
                    'cordova create "' + project.name + '" ' + project.package + ' "' + project.title + '"'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'install-cordova-android': {
                command: [
                    'cd ' + path.cordova + '/' + project.name,
                    'cordova platform add android'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'run-android': {
                command: [
                    'cd ' + path.cordova + '/' + project.name,
                    'cordova run android'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        },
        /**
         * UNZIP
         */
        unzip: {
            'crosswalk-arm': {
                src: path.cordova + '/crosswalk/crosswalk-cordova-' + setting.crosswalk.version + '-arm.zip',
                dest: path.cordova + '/crosswalk'
            },
            'crosswalk-x86': {
                src: path.cordova + '/crosswalk/crosswalk-cordova-' + setting.crosswalk.version + '-x86.zip',
                dest: path.cordova + '/crosswalk'
            }
        },
        /**
         * WATCH
         */
        watch: {
            'all': {
                files: [
                    path.projects + '/' + project.name + '/**/*.coffee',
                    path.projects + '/' + project.name + '/**/*.html',
                    path.projects + '/' + project.name + '/**/*.jade',
                    path.projects + '/' + project.name + '/**/*.js',
                    path.projects + '/' + project.name + '/**/*.jsx',
                    path.projects + '/' + project.name + '/**/*.scss',
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
                name: project.title,
                description: project.description,
                version: project.version,
                options: {
                    exclude: 'libraries',
                    paths: [
                        path.projects + '/' + project.name,
                        path.framework
                    ],
                    themedir: path.yuidoc,
                    outdir: path.docs + '/' + project.name
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
            grunt.log.error('No valid project declared.');
            return false;
        }
        if (!grunt.file.isDir(path.projects + '/' + project.name)) {
            grunt.log.error('Project directory not found.');
            return false;
        }
        if (!grunt.file.isFile(path.projects + '/' + project.name + '/package.json')) {
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
     * TASK: install-cordova
     */
    grunt.registerTask('install-cordova', function() {
        grunt.task.run([
            'check-requirements',
            'clean:cordova',
            'shell:install-cordova',
            'install-crosswalk'
        ]);
    });

    /**
     * TASK: install-crosswalk
     */
    grunt.registerTask('install-crosswalk', function() {
        if (!grunt.file.isFile(path.cordova + '/crosswalk/crosswalk-cordova-' + setting.crosswalk.version + '-arm/VERSION') ||
            !grunt.file.isFile(path.cordova + '/crosswalk/crosswalk-cordova-' + setting.crosswalk.version + '-x86/VERSION')) {
            grunt.task.run([
                'clean:crosswalk',
                'unzip:crosswalk-arm',
                'unzip:crosswalk-x86'
            ]);
        }
    });

    /**
     * TASK: run-android
     */
    grunt.registerTask('run-android', function() {
        grunt.task.run([
            'build',
            'clean:cordova-www',
            'copy:www-cordova'
        ]);
        if (!grunt.file.isDir(path.cordova + '/' + project.name + '/platforms/android')) {
            grunt.task.run('shell:install-cordova-android');
        }
        grunt.task.run('shell:run-android');
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
