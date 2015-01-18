var globals = require('./globals.js');

module.exports = function(grunt) {

    /**
     * @property option
     * @type Object
     */
    var option = {
        appname: grunt.option('appname'),
        architecture: grunt.option('architecture') === undefined ? 'arm' : grunt.option('architecture'),
        hostname: grunt.option('hostname') === undefined ? 'localhost' : grunt.option('hostname'),
        name: grunt.option('name'),
        port: grunt.option('port') === undefined ? '8080' : grunt.option('port'),
        protocol: grunt.option('protocol') === undefined ? 'http' : grunt.option('protocol')
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
        option: option,
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
                    '<%= globals.project.path %>/cordova/platforms/android/CordovaLib/**/*'
                ],
                options: {force: true}
            },
            'cordova-crosswalk': {
                src: [
                    '<%= globals.gelato.cordova.crosswalk.path %>/**/*',
                    '!<%= globals.gelato.cordova.crosswalk.path %>/crosswalk-cordova-<%= globals.gelato.cordova.crosswalk.version %>-arm.zip',
                    '!<%= globals.gelato.cordova.crosswalk.path %>/crosswalk-cordova-<%= globals.gelato.cordova.crosswalk.version %>-x86.zip'
                ],
                options: {force: true}
            },
            'cordova-www': {
                src: [
                    '<%= globals.project.path %>/cordova/www/**/*'
                ],
                options: {force: true}
            },
            'project-www': {
                src: [
                    '<%= globals.project.path %>/www/**/*'
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
                    hostname: '<%= option.hostname %>',
                    keepalive: true,
                    open: {
                        appName: '<%= option.appname %>'
                    },
                    port: '<%= option.port %>',
                    protocol: '<%= option.protocol %>'
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
                        cwd: '!<%= globals.gelato.cordova.crosswalk.path %>/crosswalk-cordova-<%= globals.gelato.cordova.crosswalk.version %>-' + option.architecture + '/framework',
                        src: ['**/*'],
                        dest: '<%= globals.project.cordova.platforms.android.cordovalib %>'
                    },
                    {
                        expand: true,
                        cwd: '!<%= globals.gelato.cordova.crosswalk.path %>/crosswalk-cordova-<%= globals.gelato.cordova.crosswalk.version %>-' + option.architecture,
                        src: ['VERSION'],
                        dest: '<%= globals.project.cordova.platforms.android %>'
                    },
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
                //TODO: copy required framework files into project
                files: [
                    {
                        expand: true,
                        cwd: '<%= globals.gelato.copy.path %>/',
                        src: ['copy-gitignore', 'copy-htaccess', 'copy-package', 'copy-readme'],
                        dest: '<%= globals.project.path %>',
                        rename: function(dest, src) {
                            switch (src) {
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
                    '<%= globals.project.www.path %>/**/styles/**.*.css',
                    '!<%= globals.project.www.path %>/**/styles/bootstrap.css',
                    '!<%= globals.project.www.path %>/**/styles/bootstrap.switch.css',
                    '!<%= globals.project.www.path %>/**/styles/font.awesome.css'
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
                        'project-name': '<%= globals.project.pkg.name %>'
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
                    'cordova create cordova <%= globals.project.pkg.packageName %> <%= globals.project.pkg.title %>'
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
                    'cd <%= globals.project.cordova.platforms.cordovalib.path %>',
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
                    'cordova plugin add <%= globals.gelato.cordova.plugins.path %>/gelato-core'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
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
                src: '<%= globals.gelato.cordova.crosswalk.path %>/crosswalk-cordova-<%= globals.gelato.cordova.crosswalk.version %>-arm.zip',
                dest: '<%= globals.gelato.crosswalk.path %>'
            },
            'cordova-crosswalk-x86': {
                src: '<%= globals.gelato.cordova.crosswalk.path %>/crosswalk-cordova-<%= globals.gelato.cordova.crosswalk.version %>-x86.zip',
                dest: '<%= globals.gelato.crosswalk.path %>'
            }
        }
    });

    /**
     * TASK: build-project
     */
    grunt.registerTask('build-project', function() {
        grunt.task.run([
            'clean:project-www',
            'coffee:project-www',
            'react:project-www',
            'jade:project-www',
            'sass:project-www',
            'copy:project-www',
            'replace:project-www',
            'validate-project'
        ]);
    });

    /**
     * TASK: create-project
     */
    grunt.registerTask('create-project', function() {
        globals.project.pkg.name = option.name;
        globals.project.path += '/' + option.name;
        grunt.file.mkdir(globals.project.path);
        grunt.task.run([
            'copy:structure',
            'replace:structure'
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
        if (!gelato.project.cordova.isInstalled()) {
            grunt.task.run('install-cordova');
        }
        if (gelato.crosswalk.isPacked()) {
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
     * TASK: run-android
     */
    grunt.registerTask('run-android', function() {
        grunt.task.run('build-project');
        if (!gelato.project.cordova.android.isInstalled()) {
            grunt.task.run('install-cordova-android');
        }
        grunt.task.run([
            'clean:cordova-www',
            'copy:cordova-www',
            'shell:run-cordova-android'
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
        grunt.task.run([
            'csslint:project-www',
            'jshint:project-www'
        ]);
    });

};
