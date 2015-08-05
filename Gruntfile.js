module.exports = function(grunt) {

	var PORT = process.env.PORT || 5000;
	var DB = grunt.file.readJSON('dbConf.json');

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-githooks');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
	      files: ['Gruntfile.js',
	      		  'src/**/*.js',
	      		  'test/**/*.js',
	      		  '*.js',
	      		  '!src/public/bower_components/**/*.js'],
	      options: {
	        globals: { jQuery: true }
	      }
	    },
	    watch: {
		    express: {
		      files:  ['<%= jshint.files %>'],
		      tasks:  [ 'jshint', 'express:dev' ],
		      options: { spawn: false }
		    }
		},
		express: {
		    options: {
		      port: PORT,
		    },
		    dev: {
		      options: {
		        script: 'src/app.js'
		      }
		    },
		    prod: {
		      options: {
		        script: 'build/app.js',
		        node_env: 'production'
		      }
		    },
		    test: {
		      options: {
		        script: 'path/to/test/server.js'
		      }
		    }
		},
		open : {
		    dev : {
		      path: 'http://127.0.0.1:' + PORT,
		    }
		  },
		githooks: {
			all: {
				'pre-commit': 'jshint'
			}
	  }
	});

  	grunt.registerTask('start', [
  		'express:dev',
  		'open:dev',
  		'watch' ]);
};