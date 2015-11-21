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
			dev: {
				files: [
					{
						expand: true,
						src: ['assets/**/*'],
						dest: 'build/'
					}
				],
			},
			build: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'assets',
					dest: 'build/assets',
					src: [
						'*.{ico,txt,json}',
						'images/**/*',
						'fonts/*'
					]
				}]
			},
		},
		useminPrepare: {
			html: ['build/**/*.html'],
			options: {
				dest: 'build',
				root: './'
			}
		},
		filerev: {
			dist: {
				src: [
					'build/assets/js/**/*.js',
					'build/assets/css/**/*.css',
					'build/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
					'build/assets/fonts/*'
				]
			}
		},
		usemin: {
			html: ['build/**/*.html'],
			css: ['build/assets/css/**/*.css'],
			// js: ['build/assets/js/**/*.js'],
			options: {
				assetsDirs: 'build/'
			}
		},
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

	grunt.registerTask('default', ['jshint']);

	grunt.registerTask('clean-build', function() { grunt.file.delete(buildPath); });

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

	grunt.registerTask('dev', ['clean:build', 'generate-files', 'copy:dev', 'clean:tmp']);

	grunt.registerTask('build', [
		'clean:build',
		'generate-files',
		'copy:build',
		'useminPrepare',
		'concat:generated',
		'uglify:generated',
		'cssmin:generated',
		'filerev',
		'usemin',
		'clean:tmp'
	]);
};