var path = require('canonical-path');

var Dgeni = require('dgeni');
var staticGuideDgeniPackage = require('static-generator');

/* Load the processor to create the custom 'data' object we want */
var allDocsProcessor = require('./processors/all-docs');
var allCategoriesProcessor = require('./processors/all-categories');
var metadataDateProcessor = require('./processors/metadata-date');

/* Load our custom handlebars helpers*/
var handlebarsHelpers = require('./handlebars-helpers');

/* Create the package for the site generator */
var testSitePackage = new Dgeni.Package('testSitePackage', [
	staticGuideDgeniPackage
]);

//add our custom processors to the site package
testSitePackage.processor(allDocsProcessor);
testSitePackage.processor(allCategoriesProcessor);
testSitePackage.processor(metadataDateProcessor);

/* Config */
testSitePackage.config(function(writeFilesProcessor){
	writeFilesProcessor.outputFolder = path.resolve(process.cwd(), './build');
});

testSitePackage.config(function(readFilesProcessor) {
	readFilesProcessor.basePath = './';
	readFilesProcessor.sourceFiles = [{
		include: 'content/**/*',
		basePath: 'content'
	}];
});

testSitePackage.config(function(templateFinder){
	templateFinder.templateFolders.unshift('templates/');
	templateFinder.templatePatterns.unshift('index.hbs');
	templateFinder.templatePatterns.unshift('${ doc.data.template }.hbs');
	

});
testSitePackage.config(function(templateEngine){
	templateEngine.partialsFolder = 'templates/partials/';
	templateEngine.helpers = templateEngine.helpers.concat(handlebarsHelpers);
});

module.exports = testSitePackage;