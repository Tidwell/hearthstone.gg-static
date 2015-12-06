var Dgeni = require('dgeni');
var staticGuideDgeniPackage = require('static-generator');

/* Load the processor to create the custom 'data' object we want */
var allDocsProcessor = require('./processors/all-docs');
var allCategoriesProcessor = require('./processors/all-categories');
var metadataPostProcessor = require('./processors/metadata-post');
var cleanUrlsProcessor = require('./processors/clean-urls');
var externalLinkProcessor = require('./processors/external-link-icon');


/* Create the package for the site generator */
var site = new Dgeni.Package('site', [
	staticGuideDgeniPackage
]);

//add our custom processors to the site package
site.processor(allDocsProcessor);
site.processor(allCategoriesProcessor);
site.processor(metadataPostProcessor);
site.processor(cleanUrlsProcessor);
site.processor(externalLinkProcessor);

/* export the site package */
module.exports = site;