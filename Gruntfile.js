var gelato = require('./gelato.js');

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
        path: grunt.option('path'),
        port: grunt.option('port') === undefined ? '8080' : grunt.option('port'),
        protocol: grunt.option('protocol') === undefined ? 'http' : grunt.option('protocol')
    };

    /**
     * TESTING: Handles when grunt is run from framework directory.
     * TODO: make setting project package variables cleaner
     */
    if (gelato.path === gelato.project.path) {
        option.name = 'test';
        if (process.argv.join().indexOf('grunt,create-project') === -1) {
            var projectPkg = grunt.file.readJSON(option.name + '/package.json');
            gelato.project.description = projectPkg.description;
            gelato.project.name = option.name;
            gelato.project.path += '/' + option.name;
            gelato.project.packageName = projectPkg['package-name'];
            gelato.project.title = projectPkg.title;
            gelato.project.type = projectPkg.type;
            gelato.project.version = projectPkg.version;
        }
    }

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
         * GELATO
         */
        gelato: gelato,
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
                    '<%= gelato.project.path %>/cordova'
                ],
                options: {force: true}
            },
            'cordova-android': {
                src: [
                    '<%= gelato.project.path %>/cordova/platforms/android'
                ],
                options: {force: true}
            },
            'cordova-android-cordovalib': {
                src: [
                    '<%= gelato.project.path %>/cordova/platforms/android/CordovaLib/**/*'
                ],
                options: {force: true}
            },
            'cordova-crosswalk': {
                src: [
                    '<%= gelato.crosswalk.path %>/**/*',
                    '!<%= gelato.crosswalk.path %>/crosswalk-cordova-<%= gelato.crosswalk.version %>-arm.zip',
                    '!<%= gelato.crosswalk.path %>/crosswalk-cordova-<%= gelato.crosswalk.version %>-x86.zip'
                ],
                options: {force: true}
            },
            'cordova-www': {
                src: [
                    '<%= gelato.project.path %>/cordova/www/**/*'
                ],
                options: {force: true}
            },
            'project-www': {
                src: [
                    '<%= gelato.project.path %>/www/**/*'
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
                        cwd: '<%= gelato.framework.path %>',
                        src: '**/*.coffee',
                        dest: '<%= gelato.project.path %>/www',
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: '<%= gelato.project.path %>/src',
                        src: '**/*.coffee',
                        dest: '<%= gelato.project.path %>/www',
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
                    base: '<%= gelato.project.path %>/www',
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
                        cwd: '<%= gelato.project.path %>/www',
                        src: ['**/*'],
                        dest: '<%= gelato.project.path %>/cordova/www'
                    }
                ]
            },
            'cordova-crosswalk': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= gelato.crosswalk.path %>/crosswalk-cordova-<%= gelato.crosswalk.version %>-<%= option.architecture %>/framework',
                        src: ['**/*'],
                        dest: '<%= gelato.project.path %>/cordova/platforms/android/CordovaLib'
                    },
                    {
                        expand: true,
                        cwd: '<%= gelato.crosswalk.path %>/crosswalk-cordova-<%= gelato.crosswalk.version %>-<%= option.architecture %>',
                        src: ['VERSION'],
                        dest: '<%= gelato.project.path %>/cordova/platforms/android'
                    },
                ]
            },
            'project-www': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= gelato.framework.path %>',
                        src: ['**/*', '!**/*.coffee', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: '<%= gelato.project.path %>/www'
                    },
                    {
                        expand: true,
                        cwd: '<%= gelato.project.path %>/src',
                        src: ['**/*', '!**/*.coffee', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: '<%= gelato.project.path %>/www'
                    }
                ]
            },
            'structure': {
                files: [
                    {
                        expand: true,
                        cwd: '<%= gelato.structure.path %>/',
                        src: ['copy-gitignore', 'copy-package', 'copy-readme'],
                        dest: '<%= gelato.project.path %>',
                        rename: function(dest, src) {
                            switch (src) {
                                case 'copy-gitignore':
                                    return dest + '/.gitignore';
                                case 'copy-package':
                                    return dest + '/package.json';
                                case 'copy-readme':
                                    return dest + '/README.md';
                                default:
                                    return dest + '/' + src;
                            }
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
                    '<%= gelato.project.path %>/www/**/styles/**.*.css',
                    '!<%= gelato.project.path %>/www/**/styles/bootstrap.css',
                    '!<%= gelato.project.path %>/www/**/styles/bootstrap.switch.css',
                    '!<%= gelato.project.path %>/www/**/styles/font.awesome.css'
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
                        cwd: '<%= gelato.framework.path %>',
                        src: ['**/*.jade'],
                        dest: '<%= gelato.project.path %>/www',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: '<%= gelato.project.path %>/src',
                        src: ['**/*.jade'],
                        dest: '<%= gelato.project.path %>/www',
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
                    '<%= gelato.project.path %>/www/**/*.js',
                    '!<%= gelato.project.path %>/www/libraries/**/*.js',
                    '!<%= gelato.project.path %>/www/core/libraries/**/*.js'
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
                        cwd: '<%= gelato.framework.path %>',
                        src: '**/*.jsx',
                        dest: '<%= gelato.project.path %>/www',
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: '<%= gelato.project.path %>/src',
                        src: '**/*.jsx',
                        dest: '<%= gelato.project.path %>/www',
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
                        'application-description': '<%= gelato.project.description %>',
                        'application-name': '<%= gelato.project.name %>',
                        'application-title': '<%= gelato.project.title %>',
                        'application-version': '<%= gelato.project.version %>',
                        'framework-version': '<%= gelato.version %>'
                    }
                },
                files: [
                    {
                        expand: true,
                        src: 'index.html',
                        cwd: '<%= gelato.project.path %>/www',
                        dest: '<%= gelato.project.path %>/www'
                    },
                    {
                        expand: true,
                        src: 'core/config/app.js',
                        cwd: '<%= gelato.project.path %>/www',
                        dest: '<%= gelato.project.path %>/www'
                    },
                    {
                        expand: true,
                        src: 'locale/nls/**/*.js',
                        cwd: '<%= gelato.project.path %>/www',
                        dest: '<%= gelato.project.path %>/www'
                    }
                ]
            },
            'structure': {
                options: {
                    variables: {
                        'project-name': '<%= gelato.project.name %>'
                    }
                },
                files: [
                    {
                        expand: true,
                        src: ['package.json', 'README.md'],
                        cwd: '<%= gelato.project.path %>',
                        dest: '<%= gelato.project.path %>'
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
                        cwd: '<%= gelato.framework.path %>',
                        src: ['**/*.scss'],
                        dest: '<%= gelato.project.path %>/www',
                        ext: '.css'

                    },
                    {
                        expand: true,
                        cwd: '<%= gelato.project.path %>/src',
                        src: ['**/*.scss'],
                        dest: '<%= gelato.project.path %>/www',
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
                    'cd <%= gelato.project.path %>',
                    'cordova create cordova <%= gelato.project.packageName %> <%= gelato.project.title %>',
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'install-cordova-android': {
                command: [
                    'cd <%= gelato.project.path %>/cordova',
                    'cordova platform add android'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'install-cordova-crosswalk': {
                command: [
                    'cd <%= gelato.project.path %>/cordova/platforms/android/CordovaLib',
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
                    'cd <%= gelato.project.path %>/cordova',
                    'cordova plugin add <%= gelato.path %>/cordova/plugins/gelato-core'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            'run-cordova-android': {
                command: [
                    'cd <%= gelato.project.path %>/cordova',
                    'cordova run android'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderr: true
                }
            },
        },
        /**
         * UNZIP
         */
        unzip: {
            'cordova-crosswalk-arm': {
                src: '<%= gelato.crosswalk.path %>/crosswalk-cordova-<%= gelato.crosswalk.version %>-arm.zip',
                dest: '<%= gelato.crosswalk.path %>'
            },
            'cordova-crosswalk-x86': {
                src: '<%= gelato.crosswalk.path %>/crosswalk-cordova-<%= gelato.crosswalk.version %>-x86.zip',
                dest: '<%= gelato.crosswalk.path %>'
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
            'react:project-www',
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
        gelato.project.name = option.name;
        gelato.project.path += '/' + option.name;
        grunt.config.set('gelato', gelato);
        grunt.task.run([
            'copy:structure',
            'replace:structure'
        ]);
        grunt.log.writeln('Created project ' + gelato.project.name + '.');
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
