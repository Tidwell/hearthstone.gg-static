var sitePackage = require('./src');
var Dgeni = require('dgeni');
var path = require('canonical-path');

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	//group files to be passed to watching or jshint
	var jsFiles = ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'assets/js/**/*.js', 'bower.json', 'package.json'];
	var otherFiles = ['content/**/*', 'templates/**/*', 'assets/css/**/*', 'assets/images/**/*'];
	var allFiles = jsFiles.concat(otherFiles);

	//define paths for the static site generator
	var contentFiles = ['content/'];
	var buildPath = 'build/';
	var defaultTemplate = 'templates/index.hbs';

	grunt.initConfig({
		jshint: {
			files: jsFiles,
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		watch: {
			files: allFiles,
			tasks: ['live-reload-build'],
			options: {
				//when watch is called we want to spin up a livereload server
				livereload: {
					host: 'localhost'
				}
			}
		},
		copy: {
			// for the dev task we just copy everything from assets into build
			dev: {
				files: [
					{
						expand: true,
						src: ['assets/**/*'],
						dest: 'build/'
					},
					{
						expand: true,
						dot: true,
						cwd: 'assets',
						dest: 'build/',
						src: [
							'*.{ico,txt,json}'
						]
					}
				],
			},
			/*
				for the build task we need to only copy the images and any extra
				files as usemin will take care of copying over the js and css files
			*/
			build: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'assets',
					dest: 'build/assets',
					src: [
						'*.{txt,json}',
						'images/**/*'
					]
				},{
					expand: true,
					dot: true,
					cwd: 'assets',
					dest: 'build/',
					src: [
						'*.{ico,txt,json}'
					]
				},{
					expand: true,
					flatten: true,
					dot: true,
					cwd: 'assets',
					dest: 'build/assets/fonts',
					src: [
						'bower_components/**/*.{eot,svg,ttf,woff,woff2}'
					]
				}
				/*
					ADD ADDITIONAL THINGS THAT NEED TO BE COPIED FROM BOWER_COMPONENTS
				*/
				]
			},
		},
		// for the build task configure usemin to make sure to find references in all of our generated markup
		useminPrepare: {
			html: ['build/**/*.html'],
			options: {
				dest: 'build',
				root: './'
			}
		},
		// for the build task configure the files we want to revision
		filerev: {
			build: {
				src: [
					'build/assets/js/**/*.js',
					'build/assets/css/**/*.css',
					'build/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
				]
			}
		},
		// for the build task configure usemin for all the references it will replace
		usemin: {
			html: ['build/**/*.html'],
			css: ['build/assets/css/**/*.css'],
			js: ['build/assets/js/**/*.js'],
			options: {
				assetsDirs: 'build/', // tell it where the built files can be found
				// "hack" to replcae images found in js files
				patterns: {
					js: [
						[/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp))/gm, 'Update the JS to reference our revved images']
					]
				}
			}
		},
		// clean up the generated files before/after the builds
		clean: {
			build: ['build'],
			tmp: ['.tmp']
		},
		//connect server used for build-serve and dev tasks
		connect: {
			options: {
				port: 8000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			dev: {
				options: {
					open: true,
					base: [
						'build'
					]
				}
			},
			build: {
				options: {
					livereload: false,
					open: true,
					keepalive: true,
					base: [
						'build'
					]
				}
			}
		}
	});

	grunt.registerTask('generate-files', function() {
		var done = this.async();
		/* Config */
		sitePackage.config(function(writeFilesProcessor){
			writeFilesProcessor.outputFolder = path.resolve(process.cwd(), './build');
		});

		sitePackage.config(function(readFilesProcessor) {
			readFilesProcessor.basePath = './';
			readFilesProcessor.sourceFiles = [{
				include: 'content/**/*',
				basePath: 'content'
			}];
		});

		sitePackage.config(function(templateFinder){
			templateFinder.templateFolders.unshift('templates/');
			templateFinder.templatePatterns.unshift('index.hbs');
			templateFinder.templatePatterns.unshift('${ doc.metadata.template }.hbs');
		});
		sitePackage.config(function(templateEngine){
			templateEngine.partialsFolder = 'templates/partials/';
			templateEngine.helpers = templateEngine.helpers.concat(require('./src/handlebars-helpers'));
		});
		/* Run */
		var dgeni = new Dgeni([sitePackage]);

		dgeni.generate().then(function(docs) {
			grunt.log.ok(docs.length + ' files generated for build');
			done();
		});
	});

	/*
		GRUNT TASKS
	*/


	grunt.registerTask('default', ['jshint', 'build']);

	//grunt watch runs this task whenever a change is detected
	grunt.registerTask('live-reload-build', ['clean:build', 'generate-files', 'copy:dev', 'clean:tmp']);

	grunt.registerTask('dev', ['clean:build', 'generate-files', 'copy:dev', 'clean:tmp', 'connect:dev', 'watch']);

	grunt.registerTask('build', [
		'clean:build',
		'generate-files',
		'copy:build',
		'useminPrepare',
		'concat:generated',
		'uglify:generated',
		'cssmin:generated',
		'filerev:build',
		'usemin',
		'clean:tmp'
	]);

	grunt.registerTask('build-serve', [
		'build',
		'connect:build'
	]);
};