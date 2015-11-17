/**
 * grunt-boiler
 * 
 * ** 開発開始手順
 * 
 * $ npm install
 * $ grunt sprite
 * $ grunt
 * 
 * ** 開発watchコマンド
 * 
 * $ grunt watch
 * 
 * ** spriteコマンド
 * 
 * $ grunt sprite
 * 
 * ** jshintコマンド
 * 
 * $ grunt test
 * 
 * ** dist、tmp削除コマンド
 * 
 * $ grunt clean
 * 
 * ---------------------------------------------------------------------- */

module.exports = function (grunt) {

  // manage
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    // sprite
    sprite: 'grunt-spritesmith'
  });

  // process
  grunt.initConfig({

    // path
    path: {
      src: 'src/',
      dist: 'dist/',
      tmp: 'tmp/',
      html_src: 'src/hbs/',
      scss_src: 'src/scss/',
      js_src: 'src/js/',
      img_src: 'src/img/',
      sprite_src: 'src/sprite/'
    },

    pkg: grunt.file.readJSON('package.json'),

    // clean
    clean: ['<%= path.tmp %>', '<%= path.dist %>'],

    // sprite
    sprite: {
      sample: {
        src: '<%= path.sprite_src %>sprite-sample/*.png',
        dest: '<%= path.dist %>img/sprite-sample.png',
        imgPath: '../img/sprite-sample.png',
        destCss: '<%= path.scss_src %>all/module/sprite-sample.scss',
        padding: 5
      }
    },

    // css
    sass: {
      all: {
        options: {
          style: 'compact',
          sourcemap: 'none',
          noCache: true
        },
        files: {
          '<%= path.tmp %>css/all.css': '<%= path.scss_src %>all/import.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 7', 'ie 8', 'ie 9']
      },
      file: {
        src: '<%= path.tmp %>css/all.css',
        dest: '<%= path.tmp %>css/all.css'
      }
    },

    csscomb: {
      app: {
        files: {
          '<%= path.tmp %>css/all.css': '<%= path.tmp %>css/all.css'
        }
      }
    },

    csso: {
      app: {
        options: {
          restructure: false
        },
        files: {
          '<%= path.dist %>css/all.css': '<%= path.tmp %>css/all.css'
        }
      }
    },

    // js
    concat: {
      options: {
        banner: [
          '(function(window, $, PROJECTNAMESPACE){',
          "  'use strict';",
          '  PROJECTNAMESPACE = PROJECTNAMESPACE || {};',
          '',
          ''
        ].join('\n'),
        footer: [
          '',
          '',
          '})(window, jQuery, window.PROJECTNAMESPACE);'
        ].join('\n')
      },
      all: {
        src: [
          '<%= path.js_src %>all/utility.js',
          '<%= path.js_src %>all/sample_a.js',
          '<%= path.js_src %>all/sample_b.js'
        ],
        dest: '<%= path.tmp %>js/all.js'
      }
    },

    uglify: {
      options: {
        compress: {
          drop_console: false
        }
      },
      app: {
        files: {
          '<%= path.dist %>js/all.js': '<%= path.tmp %>js/all.js'
        }
      }
    },

    // html
    assemble: {
      options: {
        data: ['<%= path.html_src %>data/**/*.json'],
        layoutdir: '<%= path.html_src %>layout/',
        partials: '<%= path.html_src %>include/**/*.hbs',
        pkg: '<%= pkg %>',
        helpers: [
          'handlebars-helpers',
          'handlebars-helper-minify'
        ],
        assets: '',
        minify: {
          removeComments: true
        }
      },
      files: {
        options: {
          layout: 'default.hbs',
          statPath: '/project',
          viewPath: '/project',
          isHeader: true,
          isFooter: true,
          isNav: true
        },
        expand: true,
        cwd: '<%= path.html_src %>html/',
        src: '**/*.hbs',
        dest: '<%= path.dist %>'
      }
    },

    // copy
    copy: {
      js_lib: {
        files: [
          {
            expand: true,
            cwd: '<%= path.js_src %>',
            src: ['lib.js'],
            dest: '<%= path.dist %>js'
          }
        ]
      },
      img: {
        files: [
          {
            expand: true,
            cwd: '<%= path.img_src %>',
            src: ['**/*'],
            dest: '<%= path.dist %>img'
          }
        ]
      }
    },

    // watch
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['<%= path.scss_src %>**/*.scss'],
        tasks: ['build:css']
      },
      js: {
        files: ['<%= path.js_src %>**/*.js'],
        tasks: ['build:js']
      },
      html: {
        files: ['<%= path.html_src %>**/*.hbs'],
        tasks: ['local'],
        options: {
          livereload: true
        }
      },
      img: {
        files: ['<%= path.img_src %>**/*'],
        tasks: ['local']
      },
      process: {
        files: ['Gruntfile.js'],
        tasks: ['local']
      }
    },

    // test
    jshint: {
      all: ['Gruntfile.js', '<%= path.js_src %>all/*.js']
    },

    eslint: {
      options: {},
      target: ['<%= path.js_src %>all/*.js']
    },

  });

  // task
  grunt.registerTask('build:css', ['sass', 'autoprefixer', 'csscomb', 'csso']);
  grunt.registerTask('build:js', ['concat', 'uglify']);
  grunt.registerTask('build:html', ['assemble']);
  grunt.registerTask('build:copy', ['copy']);
  grunt.registerTask('build', ['build:css', 'build:js', 'build:html', 'build:copy']);
  grunt.registerTask('test', ['jshint', 'eslint']);
  grunt.registerTask('styleguide', ['build', 'styledocco']);
  grunt.registerTask('default', ['build']);
  
  // option task
  grunt.registerTask('local', 'build for local', function () {
    grunt.config.set('assemble.files.options.statPath', '../');
    grunt.config.set('assemble.files.options.viewPath', '../');
    grunt.task.run(['build']);
  });
  grunt.registerTask('dev', 'build for dev', function () {
    grunt.config.set('assemble.files.options.statPath', '/');
    grunt.config.set('assemble.files.options.viewPath', '/');
    grunt.task.run(['build']);
  });
};