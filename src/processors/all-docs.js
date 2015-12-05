/**
 * @dgProcessor allDocsProcessor
 * @description
 * process all docs to attach a allDocs property to extraData on the renderDocsProcessor
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