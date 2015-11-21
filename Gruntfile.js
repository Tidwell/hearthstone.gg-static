var generator = require('./src/site-generator.js');

module.exports = function(grunt) {
	//group files to be passed to watching or jshint
	var jsFiles = ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'assets/js/**/*.js'];
	var otherFiles = ['content/**/*', 'templates/**/*', 'assets/css/**/*'];
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
			tasks: ['jshint', 'dev']
		},
		copy: {
			// for the dev task we just copy everything from assets into build
			dev: {
				files: [
					{
						expand: true,
						src: ['assets/**/*'],
						dest: 'build/'
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
						'*.{ico,txt,json}',
						'images/**/*'
					]
				}]
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
					'build/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
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
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('generate-files', function() {
		var files = 0;
		contentFiles.forEach(function(folder) {
			grunt.file.recurse(folder, function(abspath, rootdir) {
				generator.generate(abspath, rootdir, buildPath, defaultTemplate, grunt);
				files++;
			});
		});
		grunt.log.ok(files + ' files generated for build');
	});

	/*
		GRUNT TASKS
	*/

	//grunt watch is configured above and runs: ['jshint', 'dev']

	grunt.registerTask('default', ['jshint', 'build']);

	grunt.registerTask('dev', ['clean:build', 'generate-files', 'copy:dev', 'clean:tmp']);

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
};