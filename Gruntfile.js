/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: ['Gruntfile.js', 'src/**/*.js', 'tests/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          require: true,
          define: true,
          requirejs: true,
          describe: true,
          expect: true,
          it: true
        }
      }
    },
    concat: {
      options: {
        separator: "\n",
        banner: "(function($){\n$.espacoGuerra = $.espacoGuerra || {};",
        footer: ";})(jQuery);"
      },
      dist: {
        src: [
          //include libs
          'bower_components/threejs/build/index.js',

          //own classes and files
          'src/**/*.js'
        ],
        // the location of the resulting JS file
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js', 'tests/**/*.js', 'tests/**/*.html'],
        tasks: ['dev-watch'],
        options: {
          interrupt: true
        }
      }
    },
    removelogging: {
      dist: {
        src: "js/<%= pkg.name %>.js",
        dest: "build/<%= pkg.name %>.js"
      }
    },
    uglify: {
      options: {
        banner: ""
      },
      build: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'js/<%= pkg.name %>.min.js'
      }
    },
    mocha: {
      all: {
        src: ['tests/index.html'],
      },
      options: {
        run: true
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-remove-logging');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('dev-watch', ['jshint', 'test', 'concat:dist']);
  grunt.registerTask('build', ['concat', 'removelogging', 'uglify']);
  grunt.registerTask('default', ['dev-watch']);
};
