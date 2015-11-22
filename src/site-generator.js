var marked = require('marked');
var handlebars = require('handlebars');

function SiteGenerator(grunt, buildPath, defaultTemplate) {
	if (!grunt || !buildPath || !defaultTemplate) { throw new Error('No grunt instance or buildPath passed.'); }

	this.grunt = grunt;
	this.buildPath = buildPath;
	this.defaultTemplate = defaultTemplate;
	
	this.documents = [];
	this.transformations = [
		'readFiles',
		'splitRaw',
		'parseMarkdown',
		'destinationFiles',
		'template',
		'writeFiles'
	];
	this.userTransforms = {};

	return this;
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

SiteGenerator.prototype.destinationFiles = function() {
	var self = this;

	self.documents.forEach(function(document) {
		//write the file out
		var destPath = document.fileAbsolutePath.replace(document.fileRootDir, self.buildPath);
		document.outputPath = destPath.replace('.md', '.html');
	});
};

//writes to disk
SiteGenerator.prototype.writeFiles = function() {
	var self = this;
	this.documents.forEach(function(document) {
		self.grunt.file.write(document.outputPath, document.markup);
	});
};

SiteGenerator.prototype.addTransformationBefore = function(before, name, transformFunction) {
	var transformIndex = this.transformations.indexOf(before);
	if (transformIndex === -1) {
		throw new Error('No transform found to insert before: ' + before);
	}
	//add it before
	this.transformations.splice(transformIndex, 0, name);
	this.userTransforms[name] = transformFunction;
};

SiteGenerator.prototype.addTransformationAfter = function(after, name, transformFunction) {
	var transformIndex = this.transformations.indexOf(after);
	if (transformIndex === -1) {
		throw new Error('No transform found to insert after: ' + after);
	}
	//add it after
	this.transformations.splice(transformIndex + 1, 0, name);
	this.userTransforms[name] = transformFunction;
};

SiteGenerator.prototype.generate = function() {
	var self = this;
	this.transformations.forEach(function(transform){
		if (self[transform]) {
			self[transform].apply(self);
		}
		else if (self.userTransforms[transform]) {
			self.userTransforms[transform].apply(self);
		}
	});
};

module.exports = {
	createGenerator: function(grunt, buildPath, defaultTemplate) {
		return new SiteGenerator(grunt, buildPath, defaultTemplate);
	}
};