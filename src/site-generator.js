var marked = require('marked');
var handlebars = require('handlebars');

function renderMarkdown(fileAbsolutePath, fileRootDir, outputBasePath, defaultTemplate, grunt) {
	//read the entire file
	var content = grunt.file.read(fileAbsolutePath);

	var splitContent = content.split('\n---\n');

	var metadata = {
		body: ''
	};

	if (splitContent.length > 1) {
		metadata = JSON.parse(splitContent[0]);
		metadata.body = splitContent[1];
	} else {
		metadata.body = splitContent[0];
	}

	// convert markdown to markup for the content
	metadata.body = marked(metadata.body);
	
	//render through the template
	var template = grunt.file.read(metadata.template || defaultTemplate);
	var output = renderMarkup(template, metadata);

	//write the file out
	var destPath = fileAbsolutePath.replace(fileRootDir, outputBasePath).replace('.md', '.html');
	grunt.file.write(destPath, output);
}

function renderMarkup(templateSource, data) {
	var template = handlebars.compile(templateSource);
	var html = template(data);

	return html;
}

module.exports = {
	generate: renderMarkdown
};