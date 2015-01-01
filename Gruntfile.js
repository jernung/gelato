var gelato = require('./gelato.js');

module.exports = function(grunt) {

    /**
     * @property option
     * @type Object
     */
    var option = {
        appname: grunt.option('appname') === undefined ? 'open' : grunt.option('appname'),
        hostname: grunt.option('hostname') === undefined ? 'localhost' : grunt.option('hostname'),
        name: grunt.option('name'),
        path: grunt.option('path'),
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
            'crosswalk': {
                src: [
                    '<%= gelato.crosswalk.path %>/**/*',
                    '!<%= gelato.crosswalk.path %>/crosswalk-cordova-<%= gelato.crosswalk.version %>-arm.zip',
                    '!<%= gelato.crosswalk.path %>/crosswalk-cordova-<%= gelato.crosswalk.version %>-x86.zip'
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
                        cwd: '<%= gelato.structures.path %>/default',
                        src: ['**/*'],
                        dest: '<%= gelato.project.path %>/src'
                    },
                    {
                        expand: true,
                        cwd: '<%= gelato.structures.path %>',
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
                    '!<%= gelato.project.path %>/www/libraries/**/*.js'
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
        shell: {},
        /**
         * UNZIP
         */
        unzip: {
            'crosswalk-arm': {
                src: '<%= gelato.crosswalk.path %>/crosswalk-cordova-<%= gelato.crosswalk.version %>-arm.zip',
                dest: '<%= gelato.crosswalk.path %>'
            },
            'crosswalk-x86': {
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
        gelato.project.path = gelato.project.path + '/' + option.name;
        grunt.config.set('gelato', gelato);
        grunt.task.run([
            'copy:structure',
            'replace:structure',
            'build-project'
        ]);
        grunt.log.writeln('Created project ' + gelato.project.name + '.');
    });

    /**
     * TASK: run-project
     */
    grunt.registerTask('run-project', function() {
        grunt.task.run([
            'connect:project-www'
        ]);
    });

    /**
     * TASK: unzip-crosswalk
     */
    grunt.registerTask('unzip-crosswalk', function() {
        grunt.task.run([
            'clean:crosswalk',
            'unzip:crosswalk-arm',
            'unzip:crosswalk-x86'
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
