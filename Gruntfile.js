var globals = require('./bin/globals.js');
var reload = require('./bin/reload.js');

module.exports = function(grunt) {

    /**
     * @property options
     * @type Object
     */
    var options = {
        appname: grunt.option('appname'),
        architecture: grunt.option('architecture') === undefined ? 'arm' : grunt.option('architecture'),
        hostname: grunt.option('hostname') === undefined ? 'localhost' : grunt.option('hostname'),
        name: grunt.option('name'),
        port: grunt.option('port') === undefined ? '8080' : grunt.option('port'),
        protocol: grunt.option('protocol') === undefined ? 'http' : grunt.option('protocol'),
        novalidate: grunt.option('novalidate')
    };

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
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
         * GLOBALS
         */
        globals: globals,
        /**
         * OPTIONS
         */
        options: options,
        /**
         * CLEAN
         */
        clean: {
            'cordova': {
                src: [
                    '<%= globals.project.path %>/cordova'
                ],
                options: {force: true}
            },
            'cordova-android': {
                src: [
                    '<%= globals.project.path %>/cordova/platforms/android'
                ],
                options: {force: true}
            },
            'cordova-android-cordovalib': {
                src: [
                    '<%= globals.project.cordova.platforms.android.cordovalib.path %>/**/*'
                ],
                options: {force: true}
            },
            'cordova-crosswalk': {
                src: [
                    '<%= globals.gelato.includes.crosswalk.path %>/**/*',
                    '!<%= globals.gelato.includes.crosswalk.arm.path %>.zip',
                    '!<%= globals.gelato.includes.crosswalk.x86.path %>.zip'
                ],
                options: {force: true}
            },
            'cordova-www': {
                src: [
                    '<%= globals.project.path %>/cordova/www/**/*'
                ],
                options: {force: true}
            },
            'docs': {
                src: [
                    '<%= globals.project.docs.path %>'
                ],
                options: {force: true}
            },
            'project-gelato': {
                src: [
                    '<%= globals.project.gelato.path %>/**/*'
                ],
                options: {force: true}
            },
            'project-www': {
                src: [
                    '<%= globals.project.www.path %>/**/*'
                ],
                options: {force: true}
            }
        },
        /**
         * COFFEE
         */
        coffee: {
            'project-www': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= globals.gelato.framework.path %>',
                        src: '**/*.coffee',
                        dest: '<%= globals.project.www.path %>',
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: '<%= globals.project.src.path %>',
                        src: '**/*.coffee',
                        dest: '<%= globals.project.www.path %>',
                        ext: '.js'
                    }
                ]
            }
        },
        /**
         * CONNECT
         */
        connect: {
            'project-www': {
                options: {
                    base: '<%= globals.project.www.path %>',
                    hostname: '<%= options.hostname %>',
                    keepalive: true,
                    open: {
                        appName: '<%= options.appname %>'
                    },
                    port: '<%= options.port %>',
                    protocol: '<%= options.protocol %>'
                }
            }
        },
        /**
         * COPY
         */
        copy: {
            'cordova-www': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= globals.project.www.path %>',
                        src: ['**/*'],
                        dest: '<%= globals.project.cordova.www.path %>'
                    }
                ]
            },
            'cordova-crosswalk': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= globals.gelato.includes.crosswalk.base.path %>-<%= options.architecture %>/framework',
                        src: ['**/*'],
                        dest: '<%= globals.project.cordova.platforms.android.cordovalib.path %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= globals.gelato.includes.crosswalk.base.path %>-<%= options.architecture %>',
                        src: ['VERSION'],
                        dest: '<%= globals.project.cordova.platforms.android.path %>'
                    },
                ]
            },
            'project-gelato': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= globals.gelato.framework.path %>',
                        src: ['core/**/*', '!**/*.coffee', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: '<%= globals.project.gelato.path %>'
                    }
                ]
            },
            'project-www': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= globals.gelato.framework.path %>',
                        src: ['**/*', '!**/*.coffee', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: '<%= globals.project.www.path %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= globals.project.src.path %>',
                        src: ['**/*', '!**/*.coffee', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: '<%= globals.project.www.path %>'
                    }
                ]
            },
            'structure': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= globals.gelato.includes.structure.path %>/',
                        src: [
                            'copy-gitattributes',
                            'copy-gitignore',
                            'copy-htaccess',
                            'copy-package',
                            'copy-readme'
                        ],
                        dest: '<%= globals.project.path %>',
                        rename: function(dest, src) {
                            switch (src) {
                                case 'copy-gitattributes':
                                    return dest + '/.gitattributes';
                                case 'copy-gitignore':
                                    return dest + '/.gitignore';
                                case 'copy-htaccess':
                                    return dest + '/.htaccess';
                                case 'copy-package':
                                    return dest + '/package.json';
                                case 'copy-readme':
                                    return dest + '/README.md';
                            }
                            return dest + '/' + src;
                        }
                    }
                ]
            }
        },
        /**
         * CSSLINT
         */
        csslint: {
            'project-www': {
                options: {
                    csslintrc: '.csslintrc',
                    import: 2
                },
                src: [
                    '<%= globals.project.www.path %>/styles/**/*.css',
                    '!<%= globals.project.www.path %>/styles/fonts.css'
                ]
            }
        },
        /**
         * JADE
         */
        jade: {
            'project-www': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= globals.gelato.framework.path %>',
                        src: ['**/*.jade'],
                        dest: '<%= globals.project.www.path %>',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: '<%= globals.project.src.path %>',
                        src: ['**/*.jade'],
                        dest: '<%= globals.project.www.path %>',
                        ext: '.html'
                    }
                ]
            }
        },
        /**
         * JSHINT
         */
        jshint: {
            'project-www': {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    'Gruntfile.js',
                    '<%= globals.project.www.path %>/**/*.js',
                    '!<%= globals.project.www.path %>/libraries/**/*.js',
                    '!<%= globals.project.www.path %>/core/libraries/**/*.js'
                ]
            }
        },
        /**
         * REACT
         */
        react: {
            'project-www': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= globals.gelato.framework.path %>',
                        src: '**/*.jsx',
                        dest: '<%= globals.project.www.path %>',
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: '<%= globals.project.src.path %>',
                        src: '**/*.jsx',
                        dest: '<%= globals.project.www.path %>',
                        ext: '.js'
                    }
                ]
            }
        },
        /**
         * REPLACE
         */
        replace: {
            'project-www': {
                options: {
                    variables: {
                        'application-description': '<%= globals.project.pkg.description %>',
                        'application-name': '<%= globals.project.pkg.name %>',
                        'application-title': '<%= globals.project.pkg.title %>',
                        'application-version': '<%= globals.project.pkg.version %>',
                        'framework-version': '<%= globals.gelato.pkg.version %>'
                    }
                },
                files: [
                    {
                        expand: true,
                        src: ['index.html', 'tests.html'],
                        cwd: '<%= globals.project.www.path %>',
                        dest: '<%= globals.project.www.path %>'
                    },
                    {
                        expand: true,
                        src: 'core/config/app.js',
                        cwd: '<%= globals.project.www.path %>',
                        dest: '<%= globals.project.www.path %>'
                    },
                    {
                        expand: true,
                        src: 'locale/nls/**/*.js',
                        cwd: '<%= globals.project.www.path %>',
                        dest: '<%= globals.project.www.path %>'
                    }
                ]
            },
            'structure': {
                options: {
                    variables: {
                        'project-name': '<%= options.name %>'
                    }
                },
                files: [
                    {
                        expand: true,
                        src: ['package.json', 'README.md'],
                        cwd: '<%= globals.project.path %>',
                        dest: '<%= globals.project.path %>'
                    }
                ]
            }
        },
        /**
         * SASS
         */
        sass: {
            'project-www': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= globals.gelato.framework.path %>',
                        src: ['**/*.scss'],
                        dest: '<%= globals.project.www.path %>',
                        ext: '.css'

                    },
                    {
                        expand: true,
                        cwd: '<%= globals.project.src.path %>',
                        src: ['**/*.scss'],
                        dest: '<%= globals.project.www.path %>',
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
                    'cd <%= globals.project.path %>',
                    'cordova create cordova <%= globals.project.pkg.packageId %> "<%= globals.project.pkg.packageName %>"'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'install-cordova-android': {
                command: [
                    'cd <%= globals.project.cordova.path %>',
                    'cordova platform add android'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'install-cordova-crosswalk': {
                command: [
                    'cd <%= globals.project.cordova.platforms.android.cordovalib.path %>',
                    'android update project --subprojects --path . --target android-19',
                    'ant debug'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'install-cordova-plugins': {
                command: [
                    'cd <%= globals.project.cordova.path %>',
                    'cordova plugin add <%= globals.gelato.includes.plugins.path %>/gelato-core'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'kill-adb': {
                command: 'taskkill /F /IM adb.exe',
                options: {
                    failOnError: false,
                    stderr: true,
                    stdout: true
                }
            },
            'run-cordova-android': {
                command: [
                    'cd <%= globals.project.cordova.path %>',
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
            'cordova-crosswalk-arm': {
                src: '<%= globals.gelato.includes.crosswalk.path %>/crosswalk-cordova-<%= globals.gelato.includes.crosswalk.version %>-arm.zip',
                dest: '<%= globals.gelato.includes.crosswalk.path %>'
            },
            'cordova-crosswalk-x86': {
                src: '<%= globals.gelato.includes.crosswalk.path %>/crosswalk-cordova-<%= globals.gelato.includes.crosswalk.version %>-x86.zip',
                dest: '<%= globals.gelato.includes.crosswalk.path %>'
            }
        },
        /**
         * WATCH
         */
        watch: {
            'project-src': {
                files: [
                    '<%= globals.project.path %>/**/*.coffee',
                    '<%= globals.project.path %>/**/*.css',
                    '<%= globals.project.path %>/**/*.html',
                    '<%= globals.project.path %>/**/*.jade',
                    '<%= globals.project.path %>/**/*.js',
                    '<%= globals.project.path %>/**/*.jsx',
                    '<%= globals.project.path %>/**/*.scss'
                ],
                tasks: [
                    'copy:project-www',
                    'coffee:project-www',
                    'jade:project-www',
                    'sass:project-www',
                    'replace:project-www',
                    'validate-project'
                ]
            }
        },
        /**
         * YUIDOC
         */
        yuidoc: {
            'default': {
                name: '<%= globals.project.pkg.name %>',
                description: '<%= globals.project.pkg.description %>',
                version: '<%= globals.project.pkg.version %>',
                options: {
                    paths: ['<%= globals.gelato.framework.path %>', '<%= globals.project.src.path %>'],
                    themedir: '<%= globals.project.src.path %>/yuidoc',
                    outdir: '<%= globals.project.docs.path %>'
                }
            }
        }
    });

    /**
     * TASK: build-project
     */
    grunt.registerTask('build-project', function() {
        grunt.task.run([
            'clean:project-www',
            'copy:project-www',
            'coffee:project-www',
            'jade:project-www',
            'sass:project-www',
            'replace:project-www',
            'validate-project'
        ]);
    });

    /**
     * TASK: create-project
     */
    grunt.registerTask('create-project', function() {
        process.env.projectPath = globals.project.path + '/' + options.name;
        globals = reload('./globals.js');
        grunt.file.mkdir(globals.project.path);
        grunt.config.set('globals', globals);
        grunt.task.run([
            'copy:structure',
            'replace:structure',
            'install-gelato'
        ]);
    });

    /**
     * TASK: docs
     */
    grunt.registerTask('docs', function() {
        grunt.task.run([
            'clean:docs',
            'yuidoc:default'
        ]);
    });

    /**
     * TASK: install-cordova
     */
    grunt.registerTask('install-cordova', function() {
        grunt.task.run([
            'clean:cordova',
            'shell:install-cordova',
            'shell:install-cordova-plugins',
            'install-cordova-android'
        ]);
    });

    /**
     * TASK: install-cordova-android
     */
    grunt.registerTask('install-cordova-android', function() {
        if (!grunt.file.isFile(globals.project.cordova.path + '/config.xml')) {
            grunt.task.run('install-cordova');
        }
        if (!grunt.file.isFile(globals.gelato.includes.crosswalk.arm.path + '/VERSION')) {
            grunt.task.run('unzip-cordova-crosswalk');
        }
        if (!grunt.file.isFile(globals.gelato.includes.crosswalk.x86.path + '/VERSION')) {
            grunt.task.run('unzip-cordova-crosswalk');
        }
        grunt.task.run([
            'clean:cordova-android',
            'shell:install-cordova-android',
            'clean:cordova-android-cordovalib',
            'copy:cordova-crosswalk',
            'shell:install-cordova-crosswalk'
        ]);
    });

    /**
     * TASK: install-gelato
     */
    grunt.registerTask('install-gelato', function() {
        grunt.task.run([
            'clean:project-gelato',
            'copy:project-gelato'
        ]);
    });

    /**
     * TASK: run-android
     */
    grunt.registerTask('run-android', function() {
        grunt.task.run('build-project');
        if (!grunt.file.isFile(globals.project.cordova.platforms.android.path + '/VERSION')) {
            grunt.task.run('install-cordova-android');
        }
        grunt.task.run([
            'clean:cordova-www',
            'copy:cordova-www',
            'shell:run-cordova-android',
            'shell:kill-adb'
        ]);
    });

    /**
     * TASK: run-web
     */
    grunt.registerTask('run-web', function() {
        grunt.task.run([
            'connect:project-www'
        ]);
    });

    /**
     * TASK: unzip-cordova-crosswalk
     */
    grunt.registerTask('unzip-cordova-crosswalk', function() {
        grunt.task.run([
            'clean:cordova-crosswalk',
            'unzip:cordova-crosswalk-arm',
            'unzip:cordova-crosswalk-x86'
        ]);
    });

    /**
     * TASK: validate
     */
    grunt.registerTask('validate-project', function() {
        if (options.novalidate) {
            grunt.log.writeln('Skipping.');
        } else {
            grunt.task.run([
                'csslint:project-www',
                'jshint:project-www'
            ]);
        }
    });

    /**
     * TASK: validate
     */
    grunt.registerTask('watch-project', function() {
        grunt.task.run([
            'watch:project-src'
        ]);
    });

};
