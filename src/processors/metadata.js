/**
 * @dgProcessor metadataPostProcessor
 * @description
 * process doc content for markdown
 */
module.exports = function metadataPostProcessor(writeFilesProcessor) {
	return {
		$runAfter: ['metadataProcessor'],
		$runBefore: ['allDocsProcessor'],
		$process: function(docs) {
			docs.forEach(function(doc){
				var metadata = doc.metadata;
				//format a date as a js date object
				if (metadata.date) { metadata.date = new Date(Number(metadata.date)); }
				//add a .webPath property relative to the build root
				doc.webPath = doc.outputPath.replace(writeFilesProcessor.outputFolder, '');
			});
		}
	};
};