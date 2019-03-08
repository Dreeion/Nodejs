module.exports = function(grunt) {
    
    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
        


    /*
    1. Je configure ma tâche
    (la doc de chaque package vous fournira les options disponibles)
    */
        
    ncsslint:
    {
        name:
        {
            options:
            {
                config: '.ncsslintrc',
                html: null,
                path: null,
                url: ["./css/*.css"],
                namespace: null,
                logLevel: 'warn',
                thresholdError: 0,
                thresholdWarn: 0,
                haltOnError: false,
                haltOnWarn: false
            }
        }
    },


    jshint: {
      options: {
        force: true
      },
      all: ['./js/*.js']
    },


      sass: {                              
        dist: {                            
          options: {
            style: 'expanded'
          },
          files: [{
            expand: true,
            src: ['./css/*.scss'],
            dest: './css/',
            ext: '.css'
          }],
        }
      },

    browserify: {
      dist: {
          files: [{
            expand: true,
            src: ['./js/*.js'],
            dest: './js_pur',
            ext: '.js'
          }],
          options: {
              transform: [['babelify', { presets: "es2015" }]],
              browserifyOptions: {
                  debug: true
              }
          }
      }
  },



      concatCss: {
        options: {
        separator: ' ',
        },
            dist: {
              src: ['./css/*.css'],
              dest: 'concat/concat.css'
              }
        },
   

        concatJs: {
          options: {
          separator: ';',
          },
          
          
			  dist: {
              src: ['./js_pur/js/*.js'],
              dest: './concat/concat.js'
              }
          },

           uglify: {
              options: {
                mangle: false
              },
              my_target: {
                files: {
                  './concat/concat.js': ['./concat/concat.js']
                }
              }
            }, 


            cssmin: {
                target: {
                  files: {
                    './concat/concat.css':['./concat/concat.css']
                  }
                }
              },

              zip: {
                'archive.zip': ['./concat/*.*']
              }


    });
    
    // 2. Je charge ma tâche
     
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.renameTask('concat', 'concatCss');
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.renameTask('concat', 'concatJs');
    
    grunt.loadNpmTasks('grunt-ncss-linter');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.loadNpmTasks("grunt-browserify");

    // J'assigne ma tâche à la commande par défaut de Grunt
    grunt.registerTask('default',['ncsslint','jshint','sass','browserify','concatJs','concatCss','uglify','cssmin','zip']);
    };