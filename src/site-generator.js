var marked = require('marked');
var handlebars = require('handlebars');

function SiteGenerator(grunt, buildPath, defaultTemplate) {
	//check required
	if (!grunt || !buildPath || !defaultTemplate) {
		throw new Error('No grunt instance or buildPath passed.');
	}

	//set input
	this.grunt = grunt;
	this.buildPath = buildPath;
	this.defaultTemplate = defaultTemplate;
	
	//set up instance vars
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

/*
	PUBLIC METHODS
*/

//adds a file to the document list
SiteGenerator.prototype.addFile = function(fileAbsolutePath, fileRootDir) {
	this.documents.push({
		fileAbsolutePath: fileAbsolutePath,
		fileRootDir: fileRootDir,
		data: {}
	});
};

SiteGenerator.prototype.addFiles = function(paths) {
	var self = this;
	paths.forEach(function(folder) {
		self.grunt.file.recurse(folder, function(abspath, rootdir) {
			self.addFile(abspath, rootdir);
		});
	});
};

//adds a transformation function before another transformer
SiteGenerator.prototype.addTransformationBefore = function(before, name, transformFunction) {
	var transformIndex = this.transformations.indexOf(before);
	if (transformIndex === -1) {
		throw new Error('No transform found to insert before: ' + before);
	}
	//add it before
	this.transformations.splice(transformIndex, 0, name);
	this.userTransforms[name] = transformFunction;
};

//adds a transformation function after another transformer
SiteGenerator.prototype.addTransformationAfter = function(after, name, transformFunction) {
	var transformIndex = this.transformations.indexOf(after);
	if (transformIndex === -1) {
		throw new Error('No transform found to insert after: ' + after);
	}
	//add it after
	this.transformations.splice(transformIndex + 1, 0, name);
	this.userTransforms[name] = transformFunction;
};

//runs all the transform functions on the documents
SiteGenerator.prototype.generate = function(logger) {
	var self = this;
	this.transformations.forEach(function(transform){
		if (logger) { logger('running '+transform); }
		if (self.transformFunctions[transform]) {
			self.transformFunctions[transform].apply(self);
		}
		else if (self.userTransforms[transform]) {
			self.userTransforms[transform].apply(self);
		}
	});
};


/*
	DEFAULT TRANSFORMATION FUNCTIONS FOR PROCESSING DOCUMENTS
*/

SiteGenerator.prototype.transformFunctions = {};

//reads all documents
SiteGenerator.prototype.transformFunctions.readFiles = function() {
	var self = this;
	self.documents.forEach(function(document){
		var content = self.grunt.file.read(document.fileAbsolutePath);
		document.rawFile = content;
	});
};

//split on --- for metadata content and markdown body content
SiteGenerator.prototype.transformFunctions.splitRaw = function() {
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
SiteGenerator.prototype.transformFunctions.parseMarkdown = function() {
	this.documents.forEach(function(document) {
		document.data.body = marked(document.data.body);
	});
};

//render through the template
SiteGenerator.prototype.transformFunctions.template = function() {
	var self = this;

	//load helpers
	var handlebarsHelpers = require('./handlebars-helpers');
	handlebarsHelpers.forEach(function(func){
		func(handlebars);
	});

	//load partials
	self.grunt.file.recurse('templates/partials', function(abspath, rootdir, subdir, filename) {
		var template = self.grunt.file.read(abspath);
		var partialName = filename.replace('.hbs', '');
		handlebars.registerPartial(partialName, handlebars.compile(template));
	});

	self.documents.forEach(function(document) {
		var template = self.grunt.file.read(document.data.template || self.defaultTemplate);
		var templateRenderer = handlebars.compile(template);
		document.markup = templateRenderer(document.data);
	});
};

//generate the path to write the file to
SiteGenerator.prototype.transformFunctions.destinationFiles = function() {
	var self = this;

	self.documents.forEach(function(document) {
		var destPath = document.fileAbsolutePath.replace(document.fileRootDir, self.buildPath);
		document.outputPath = destPath.replace('.md', '.html');
	});
};

//writes to disk
SiteGenerator.prototype.transformFunctions.writeFiles = function() {
	var self = this;
	this.documents.forEach(function(document) {
		if (typeof document.outputPath == 'string') {
			self.grunt.file.write(document.outputPath, document.markup);
		}
		if (Array.isArray(document.outputPath)) {
			document.outputPath.forEach(function(path){
				self.grunt.file.write(path, document.markup);	
			});
		}
	});
};

//export a factory so there is no confusion with using 'new'
module.exports = {
	createGenerator: function(grunt, buildPath, defaultTemplate) {
		return new SiteGenerator(grunt, buildPath, defaultTemplate);
	}
};