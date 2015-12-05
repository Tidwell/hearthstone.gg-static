/**
 * @dgProcessor metadataDateProcessor
 * @description
 * process doc content for markdown
 */
module.exports = function metadataDate(writeFilesProcessor) {
	return {
		$runAfter: ['splitContentProcessor'],
		$runBefore: ['allDocs'],
		$process: function(docs) {
			docs.forEach(function(doc){
				if (doc.data.date) { doc.data.date = new Date(Number(doc.data.date)); }
				doc.path = doc.outputPath.replace(writeFilesProcessor.outputFolder, '');

				if (doc.aliases.indexOf('index') > -1) { doc.aliases.push('/'); }
				console.log(doc.path)
			});
		}
	};
};