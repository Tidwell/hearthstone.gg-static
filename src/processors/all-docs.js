/**
 * @dgProcessor allDocsProcessor
 * @description
 * process doc content for markdown
 */
module.exports = function allDocsProcessor(writeFilesProcessor, renderDocsProcessor) {
	return {
		$runAfter: ['splitContentProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function(docs) {
			var docList = [];
			docs.forEach(function(doc){
				var metadata = doc.metadata;
				docList.push({
					title: metadata.title,
					outputPath: doc.outputPath,
					webPath: doc.webPath || '/',
					isArticle: metadata.type === 'article' ? true : false,
					category: metadata.category,
					author: metadata.author,
					description: metadata.description,
					date: metadata.date
				});
			});

			renderDocsProcessor.extraData.allDocs = docList;
		}
	};
};