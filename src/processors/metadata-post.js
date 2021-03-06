/**
 * @dgProcessor metadataPostProcessor
 * @description
 * after the metadata is added to a document we want to clean it up a bit
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
				if (!metadata.image) { metadata.image = 'hex-frog.jpg'; }
			});
		}
	};
};