var marked = require('marked');
var handlebars = require('handlebars');

function SiteGenerator(grunt, buildPath, defaultTemplate) {
	if (!grunt || !buildPath || !defaultTemplate) { throw new Error('No grunt instance or buildPath passed.'); }

	this.grunt = grunt;
	this.buildPath = buildPath;
	this.defaultTemplate = defaultTemplate;
	
	this.documents = [];
	this.transformations = [
		this.readFiles,
		this.splitRaw,
		this.parseMarkdown,
		this.template,
		this.writeFiles
	];
}

//adds a file to the document list
SiteGenerator.prototype.addFile = function(fileAbsolutePath, fileRootDir) {
	this.documents.push({
		fileAbsolutePath: fileAbsolutePath,
		fileRootDir: fileRootDir,
		data: {}
	});
};

//reads all documents
SiteGenerator.prototype.readFiles = function() {
	var self = this;
	self.documents.forEach(function(document){
		var content = self.grunt.file.read(document.fileAbsolutePath);
		document.rawFile = content;
	});
};

//spit on --- for metadata content and markdown body content
SiteGenerator.prototype.splitRaw = function() {
	var self = this;
	self.documents.forEach(function(document) {
		if (!document.rawFile) { return; }

		var splitContent = document.rawFile.split('\n---\n');

		document.data.body = '';

		if (splitContent.length > 1) {
			document.data = JSON.parse(splitContent[0]);
			document.data.body = splitContent[1];
		} else {
			document.data.body = splitContent[0];
		}

	});
};

// convert markdown to markup for the content
SiteGenerator.prototype.parseMarkdown = function() {
	this.documents.forEach(function(document) {
		document.data.body = marked(document.data.body);
	});
};

//render through the template
SiteGenerator.prototype.template = function() {
	var self = this;

	self.documents.forEach(function(document) {
		var template = self.grunt.file.read(document.data.template || self.defaultTemplate);
		var templateRenderer = handlebars.compile(template);
		document.markup = templateRenderer(document.data);
	});
};

//writes to disk
SiteGenerator.prototype.writeFiles = function() {
	var self = this;
	this.documents.forEach(function(document) {
		//write the file out
		var destPath = document.fileAbsolutePath.replace(document.fileRootDir, self.buildPath).replace('.md', '.html');
		self.grunt.file.write(destPath, document.markup);
	});
};

SiteGenerator.prototype.generate = function() {
	var self = this;
	this.transformations.forEach(function(transform){
		transform.apply(self);
	});
};

module.exports = {
	createGenerator: function(grunt, buildPath, defaultTemplate) {
		return new SiteGenerator(grunt, buildPath, defaultTemplate);
	}
};