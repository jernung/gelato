module.exports = function(grunt) {

    var framework = {
        crosswalk: {
            path: 'cordova/crosswalk',
            version: '10.39.235.14'
        },
        path: 'framework',
        pkg: grunt.file.readJSON('package.json')
    };

    framework.crosswalk.isInstalled = function() {
        if (!grunt.file.isFile(framework.crosswalk.path + '/' + framework.crosswalk.version + '-arm/VERSION')) {
            return false;
        }
        if (!grunt.file.isFile(framework.crosswalk.path + '/' + framework.crosswalk.version + '-x86/VERSION')) {
            return false;
        }
        return true;
    };

    var project = {
        name: grunt.option('name') === undefined ? null : grunt.option('name'),
        path: function() {
            if (grunt.option('path')) {
                return grunt.option('path') + '/' + grunt.option('name');
            } else {
                return grunt.option('name');
            }
        }(),
        template: grunt.option('template') === undefined ? 'default' : grunt.option('template')
    };

    project.isInstalled = function() {
        if (grunt.file.isFile(project.path + '/src/package.json')) {
            return true;
        }
        return false;
    };

    project.pkg = function() {
        if (grunt.file.isFile(project.path + '/src/package.json')) {
            return grunt.file.readJSON(project.path + '/src/package.json');
        } else {
            return new Object();
        }
    }();

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
            'crosswalk': {
                src: [
                    framework.crosswalk.path + '/**/*',
                    '!' + framework.crosswalk.path + '/crosswalk-cordova-' + framework.crosswalk.version + '-arm.zip',
                    '!' + framework.crosswalk.path + '/crosswalk-cordova-' + framework.crosswalk.version + '-x86.zip'
                ],
                options: {force: true}
            },
            'project-www': {
                src: [
                    project.path + '/www/**/*'
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
                        cwd: framework.path,
                        src: '**/*.coffee',
                        dest: project.path + '/www',
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: project.path + '/src',
                        src: '**/*.coffee',
                        dest: project.path + '/www',
                        ext: '.js'
                    }
                ]
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
                        cwd: framework.path,
                        src: ['**/*', '!**/*.coffee', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: project.path + '/www'
                    },
                    {
                        expand: true,
                        cwd: project.path + '/src',
                        src: ['**/*', '!**/*.coffee', '!**/*.jade', '!**/*.jsx', '!**/*.scss', '!README.md'],
                        dest: project.path + '/www'
                    }
                ]
            },
            'template': {
                files: [
                    {
                        expand: true,
                        cwd: 'templates/' + project.template,
                        src: ['**/*'],
                        dest: project.path + '/src'
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
                    project.path + '/www/**/styles/**.*.css',
                    '!' + project.path + '/www/**/styles/bootstrap.css',
                    '!' + project.path + '/www/**/styles/bootstrap.switch.css',
                    '!' + project.path + '/www/**/styles/font.awesome.css'
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
                        cwd: framework.path,
                        src: ['**/*.jade'],
                        dest: project.path + '/www',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: project.path + '/src',
                        src: ['**/*.jade'],
                        dest: project.path + '/www',
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
                    project.path + '/www/**/*.js',
                    '!' + project.path + '/www/libraries/**/*.js'
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
                        cwd: framework.path,
                        src: '**/*.jsx',
                        dest: project.path + '/www',
                        ext: '.js'
                    },
                    {
                        expand: true,
                        cwd: project.path + '/src',
                        src: '**/*.jsx',
                        dest: project.path + '/www',
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
                        'application-description': project.pkg.description,
                        'application-name': project.pkg.name,
                        'application-title': project.pkg.title,
                        'application-version': project.pkg.version,
                        'framework-version': framework.pkg.version
                    }
                },
                files: [
                    {
                        expand: true,
                        src: 'index.html',
                        cwd: project.path + '/www',
                        dest: project.path + '/www'
                    },
                    {
                        expand: true,
                        src: 'core/config/app.js',
                        cwd: project.path + '/www',
                        dest: project.path + '/www'
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
                        cwd: framework.path,
                        src: ['**/*.scss'],
                        dest: project.path + '/www',
                        ext: '.css'

                    },
                    {
                        expand: true,
                        cwd: project.path + '/src',
                        src: ['**/*.scss'],
                        dest: project.path + '/www',
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

        },
        /**
         * UNZIP
         */
        unzip: {
            'crosswalk-arm': {
                src: framework.crosswalk.path + '/crosswalk-cordova-' + framework.crosswalk.version + '-arm.zip',
                dest: framework.crosswalk.path
            },
            'crosswalk-x86': {
                src: framework.crosswalk.path + '/crosswalk-cordova-' + framework.crosswalk.version + '-x86.zip',
                dest: framework.crosswalk.path
            }
        }
    });

    /**
     * TASK: build-project
     */
    grunt.registerTask('build-project', function() {
        if (!grunt.file.isDir(project.path + '/www')) {
            grunt.file.mkdir(project.path + '/www');
        }
        grunt.task.run([
            'check-requirements',
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
     * TASK: check-requirements
     */
    grunt.registerTask('check-requirements', function() {
        if (!project.name) {
            grunt.log.error('Project name declaration required.');
            return false;
        }
        if (!project.isInstalled()) {
            grunt.log.error('Project ' + project.name + " doesn't exist.");
            return false;
        }
    });

    /**
     * TASK: create-project
     */
    grunt.registerTask('create-project', function() {
        if (!project.name) {
            grunt.log.error('Project name declaration required.');
            return false;
        }
        if (project.isInstalled()) {
            grunt.log.error('Project ' + project.name + ' already exists.');
            return false;
        }
        grunt.log.writeln('Creating project ' + project.name + ' using ' + project.template + ' template.');
        grunt.file.mkdir(project.path);
        grunt.task.run(['copy:template']);
    });

    /**
     * TASK: unzip-crosswalk
     */
    grunt.registerTask('unzip-crosswalk', function() {
        if (!framework.crosswalk.isInstalled()) {
            grunt.log.writeln('Unzipping crosswalk version ' + framework.crosswalk.version + '.');
            grunt.task.run([
                'clean:crosswalk',
                'unzip:crosswalk-arm',
                'unzip:crosswalk-x86'
            ]);
        }
    });

    /**
     * TASK: validate
     */
    grunt.registerTask('validate-project', function() {
        grunt.task.run([
            'check-requirements',
            'csslint:project-www',
            'jshint:project-www'
        ]);
    });

};
