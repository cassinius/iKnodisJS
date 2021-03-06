module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'dist/JSAlgorithms.js',
                dest: 'dist/JSAlgorithms.min.js'
            }
        },
        watch: {
            typescript: {
                files: ['**/*.ts'],
                tasks: ['compileTS']
            },
            tests: {
                files: ['**/*.js'],
                tasks: ['mocha']
            }
        },
        shell: {
            mocha: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'mocha'
            },
            compileTS: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'tsc **/*.ts'
            },
            copyMin: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'cp dist/JSAlgorithms.js /var/www/html/graphext/js/'
            },
            clean: {
              options: {
                    stdout: true,
                    stderr: true
                },
                command: 'rm src/*.js; rm test/*.js'
            }
        },
        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: ['src/Helper.js', 'src/Matrix.js', 'src/DisjointSet.js', 'src/Images.js', 'src/ImgGraphs.js', 'src/Region.js',
                      'test/browser/browsertest.js'],
                dest: 'dist/JSAlgorithms.js'
            }
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    // Default task(s).
    // grunt.registerTask('default', ['uglify']);
    grunt.registerTask('mocha', 'shell:mocha');
    grunt.registerTask('clean', 'shell:clean');
    grunt.registerTask('compileTS', 'shell:compileTS');
    grunt.registerTask('build', ['compileTS', 'concat', 'uglify', 'shell:copyMin']);

};