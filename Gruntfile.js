var gelato = require('./gelato.js');
var settings = gelato.load().getSettings();

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
         * SETTINGS
         */
        settings: settings,
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
                    '<%= settings.project.path %>/cordova'
                ],
                options: {force: true}
            },
            'cordova-android': {
                src: [
                    '<%= settings.project.path %>/cordova/platforms/android'
                ],
                options: {force: true}
            },
            'cordova-android-cordovalib': {
                src: [
                    '<%= settings.project.path %>/cordova/platforms/android/CordovaLib/**/*'
                ],
                options: {force: true}
            },
            'cordova-crosswalk': {
                src: [
                    '<%= settings.crosswalk.path %>/**/*',
                    '!<%= settings.crosswalk.path %>/crosswalk-cordova-<%= settings.crosswalk.version %>-arm.zip',
                    '!<%= settings.crosswalk.path %>/crosswalk-cordova-<%= settings.crosswalk.version %>-x86.zip'
                ],
                options: {force: true}
            },
            'cordova-www': {
                src: [
                    '<%= settings.project.path %>/cordova/www/**/*'
                ],
                options: {force: true}
            },
            'project-www': {
                src: [
                    '<%= settings.project.path %>/www/**/*'
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
                        cwd: '<%= settings.framework.path %>',
                        src: '**/*.coffee',
                        dest: '<%= settings.project.path %>/www',
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: '<%= settings.project.path %>/src',
                        src: '**/*.coffee',
                        dest: '<%= settings.project.path %>/www',
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
                    base: '<%= settings.project.path %>/www',
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
                        cwd: '<%= settings.project.path %>/www',
                        src: ['**/*'],
                        dest: '<%= settings.project.path %>/cordova/www'
                    }
                ]
            },
            'cordova-crosswalk': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= settings.crosswalk.path %>/crosswalk-cordova-<%= settings.crosswalk.version %>-<%= option.architecture %>/framework',
                        src: ['**/*'],
                        dest: '<%= settings.project.path %>/cordova/platforms/android/CordovaLib'
                    },
                    {
                        expand: true,
                        cwd: '<%= settings.crosswalk.path %>/crosswalk-cordova-<%= settings.crosswalk.version %>-<%= option.architecture %>',
                        src: ['VERSION'],
                        dest: '<%= settings.project.path %>/cordova/platforms/android'
                    },
                ]
            },
            'project-www': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= settings.framework.path %>',
                        src: ['**/*', '!**/*.coffee', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: '<%= settings.project.path %>/www'
                    },
                    {
                        expand: true,
                        cwd: '<%= settings.project.path %>/src',
                        src: ['**/*', '!**/*.coffee', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: '<%= settings.project.path %>/www'
                    }
                ]
            },
            'structure': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= settings.structure.path %>/src',
                        src: ['**/*'],
                        dest: '<%= settings.project.path %>/src'
                    },
                    {
                        expand: true,
                        cwd: '<%= settings.structure.path %>/',
                        src: ['copy-gitignore', 'copy-htaccess', 'copy-package', 'copy-readme'],
                        dest: '<%= settings.project.path %>',
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
                    '<%= settings.project.path %>/www/**/styles/**.*.css',
                    '!<%= settings.project.path %>/www/**/styles/bootstrap.css',
                    '!<%= settings.project.path %>/www/**/styles/bootstrap.switch.css',
                    '!<%= settings.project.path %>/www/**/styles/font.awesome.css'
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
                        cwd: '<%= settings.framework.path %>',
                        src: ['**/*.jade'],
                        dest: '<%= settings.project.path %>/www',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: '<%= settings.project.path %>/src',
                        src: ['**/*.jade'],
                        dest: '<%= settings.project.path %>/www',
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
                    '<%= settings.project.path %>/www/**/*.js',
                    '!<%= settings.project.path %>/www/libraries/**/*.js',
                    '!<%= settings.project.path %>/www/core/libraries/**/*.js'
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
                        cwd: '<%= settings.framework.path %>',
                        src: '**/*.jsx',
                        dest: '<%= settings.project.path %>/www',
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: '<%= settings.project.path %>/src',
                        src: '**/*.jsx',
                        dest: '<%= settings.project.path %>/www',
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
                        'application-description': '<%= settings.project.description %>',
                        'application-name': '<%= settings.project.name %>',
                        'application-title': '<%= settings.project.title %>',
                        'application-version': '<%= settings.project.version %>',
                        'framework-version': '<%= settings.version %>'
                    }
                },
                files: [
                    {
                        expand: true,
                        src: 'index.html',
                        cwd: '<%= settings.project.path %>/www',
                        dest: '<%= settings.project.path %>/www'
                    },
                    {
                        expand: true,
                        src: 'core/config/app.js',
                        cwd: '<%= settings.project.path %>/www',
                        dest: '<%= settings.project.path %>/www'
                    },
                    {
                        expand: true,
                        src: 'locale/nls/**/*.js',
                        cwd: '<%= settings.project.path %>/www',
                        dest: '<%= settings.project.path %>/www'
                    }
                ]
            },
            'structure': {
                options: {
                    variables: {
                        'project-name': '<%= settings.project.name %>'
                    }
                },
                files: [
                    {
                        expand: true,
                        src: ['package.json', 'README.md'],
                        cwd: '<%= settings.project.path %>',
                        dest: '<%= settings.project.path %>'
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
                        cwd: '<%= settings.framework.path %>',
                        src: ['**/*.scss'],
                        dest: '<%= settings.project.path %>/www',
                        ext: '.css'

                    },
                    {
                        expand: true,
                        cwd: '<%= settings.project.path %>/src',
                        src: ['**/*.scss'],
                        dest: '<%= settings.project.path %>/www',
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
                    'cd <%= settings.project.path %>',
                    'cordova create cordova <%= settings.project.packageName %> <%= settings.project.title %>',
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'install-cordova-android': {
                command: [
                    'cd <%= settings.project.path %>/cordova',
                    'cordova platform add android'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'install-cordova-crosswalk': {
                command: [
                    'cd <%= settings.project.path %>/cordova/platforms/android/CordovaLib',
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
                    'cd <%= settings.project.path %>/cordova',
                    'cordova plugin add <%= settings.path %>/cordova/plugins/gelato-core'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'run-cordova-android': {
                command: [
                    'cd <%= settings.project.path %>/cordova',
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
                src: '<%= settings.crosswalk.path %>/crosswalk-cordova-<%= settings.crosswalk.version %>-arm.zip',
                dest: '<%= settings.crosswalk.path %>'
            },
            'cordova-crosswalk-x86': {
                src: '<%= settings.crosswalk.path %>/crosswalk-cordova-<%= settings.crosswalk.version %>-x86.zip',
                dest: '<%= settings.crosswalk.path %>'
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
        settings.project.name = option.name;
        settings.project.path += '/' + option.name;
        grunt.file.mkdir(settings.project.path);
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
