module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('/static/package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: [
                    'js/**/*.js',
                    'js/*.js',
                    'ts/**/*.js',
                    'ts/*.js'],
                // the location of the resulting JS file
                dest: 'script.js'
            }
        },
        cssmin: {
            dist: {
                files: {
                    'style.min.css': ['css/*.css']
                }
            }
        }
        ,
        uglify: {
            dist: {
                files: {
                    'script.min.js': ['script.js']
                }
            }
        },
        shell: {
            Compiler: {
                options: {
                    stdout: true
                },
                command: ['npm run tsc:w'].join('&&')
            }
        },
        watch: {
            css: {
                files: ['css/*.css'],
                tasks: ['cssmin']
            },
            js: {
                files: ['js/*.js', 'js/**/*.js','ts/*.js/','ts/**/*.js'],
                tasks: ['concat','uglify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-shell');
    grunt.registerTask('default', ['watch']);
    //grunt.registerTask('w', ['watch']);
    //grunt.registerTask('concat', ['concat']);
    grunt.registerTask('tsc', ['shell:Compiler']);
    //grunt.registerTask('c', ['cssmin']);
    //grunt.registerTask('uglify', ['uglify']);

};

