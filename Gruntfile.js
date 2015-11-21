var generator = require('./src/site-generator.js');

module.exports = function(grunt) {
	var allFiles = ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'assets/js/**/*.js'];
	var watchFiles = ['content/**/*', 'templates/**/*', 'assets/css/**/*'];
	var contentFiles = ['content/'];
	var buildPath = 'build/';
	var defaultTemplate = 'templates/index.hbs';

	grunt.initConfig({
		jshint: {
			files: allFiles,
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'].concat(watchFiles),
			tasks: ['jshint', 'dev']
		},
		copy: {
			dev: {
				files: [
					// includes files within path and its sub-directories
					{
						expand: true,
						src: ['assets/**'],
						dest: 'build/'
					}
				],
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
			options: {
				dirs: ['build'],
				assetDirs: ['build/assets/']
			}
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

	grunt.registerTask('dev', ['clean-build', 'generate-files', 'copy:dev']);

	grunt.registerTask('build', [
		'clean-build',
		'generate-files',
		'useminPrepare',
		'concat:generated',
		'uglify:generated',
		'cssmin:generated',
		'filerev',
		'printConfig',
		'usemin'
	]);

	grunt.registerTask('printConfig', function() {
		grunt.log.writeln(JSON.stringify(grunt.filerev.summary, null, 2));
	});

};