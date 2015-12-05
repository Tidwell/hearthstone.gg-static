/**
 * @dgProcessor contentMarkdownProcessor
 * @description
 * process doc content for markdown
 */
module.exports = function allDocs(writeFilesProcessor, renderDocsProcessor) {
	return {
		$runAfter: ['splitContentProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function(docs) {
			var docList = [];
			docs.forEach(function(doc){
				docList.push({
					title: doc.data.title,
					outputPath: doc.outputPath,
					path: doc.path || '/',
					isArticle: doc.data.type === 'article' ? true : false,
					category: doc.data.category,
					author: doc.data.author,
					description: doc.data.description,
					date: doc.data.date
				});
			});

			renderDocsProcessor.extraData.allDocs = docList;
		}
	};
};