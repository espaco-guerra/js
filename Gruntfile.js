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
    mocha_istanbul: {
      require: ['bower_components/jquery/dist/jquery.js', 'test_helper.js'],
      coverage: {
        src: 'tests',
        options: {
          coverageFolder: 'coverage',
          mask: '**/*_tests.js',
          root: 'src/'
        }
      }
    },
    'saucelabs-mocha': {
      all: {
        options: {
          // username: ENV SAUCE_USERNAME
          // key: ENV SAUCE_ACCESS_KEY
          urls: ["http://localhost:9999/tests/saucelabs.html"],
          testname: 'Sauce Unit Test for EspacoGuerra JS Client',
          browsers: [
            ["Windows 8.1", "firefox", 34], ["Windows 8.1", "chrome", 39],
            ["Windows 8.1", "internet explorer", 11],// ["Windows 7", "opera", 12],
            ["OS X 10.10", "firefox", 34], ["OS X 10.10", "chrome", 39],
            ["OS X 10.10", "safari", 8],
            ["Linux", "firefox", 34], ["Linux", "chrome", 39],
            // ["Linux", "opera", 12]
          ]
        }
      }
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9999,
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-remove-logging');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['mocha_istanbul:coverage']);
  grunt.registerTask('dev-watch', ['jshint', 'test', 'concat:dist']);
  grunt.registerTask('build', ['concat', 'removelogging', 'uglify']);
  grunt.registerTask('server', ['connect']);
  grunt.registerTask('default', ['dev-watch']);
};
