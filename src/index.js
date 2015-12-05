var path = require('canonical-path');

var Dgeni = require('dgeni');
var staticGuideDgeniPackage = require('static-generator');

/* Load the processor to create the custom 'data' object we want */
var allDocsProcessor = require('./processors/all-docs');
var allCategoriesProcessor = require('./processors/all-categories');
var metadataPostProcessor = require('./processors/metadata');
var cleanUrlsProcessor = require('./processors/clean-urls');

/* Load our custom handlebars helpers*/
var handlebarsHelpers = require('./handlebars-helpers');

/* Create the package for the site generator */
var site = new Dgeni.Package('site', [
	staticGuideDgeniPackage
]);

//add our custom processors to the site package
site.processor(allDocsProcessor);
site.processor(allCategoriesProcessor);
site.processor(metadataPostProcessor);
site.processor(cleanUrlsProcessor);

/* Config */
site.config(function(writeFilesProcessor){
	writeFilesProcessor.outputFolder = path.resolve(process.cwd(), './build');
});

site.config(function(readFilesProcessor) {
	readFilesProcessor.basePath = './';
	readFilesProcessor.sourceFiles = [{
		include: 'content/**/*',
		basePath: 'content'
	}];
});

site.config(function(templateFinder){
	templateFinder.templateFolders.unshift('templates/');
	templateFinder.templatePatterns.unshift('index.hbs');
	templateFinder.templatePatterns.unshift('${ doc.metadata.template }.hbs');
	

});
site.config(function(templateEngine){
	templateEngine.partialsFolder = 'templates/partials/';
	templateEngine.helpers = templateEngine.helpers.concat(handlebarsHelpers);
});
// site.config(function(checkAnchorLinksProcessor){
// //	checkAnchorLinksProcessor.ignoredLinks.push(/^\//ig);
// });

module.exports = site;