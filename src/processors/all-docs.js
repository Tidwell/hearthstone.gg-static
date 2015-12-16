/**
 * @dgProcessor allDocsProcessor
 * @description
 * process all docs to attach a allDocs property to extraData on the renderDocsProcessor
 */
module.exports = function allDocsProcessor(writeFilesProcessor, renderDocsProcessor) {
	return {
		$runAfter: ['contentMarkdownProcessor'],
		$runBefore: ['handlebarsTemplatesProcessor'],
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

			//sort by date descending
			docList.sort(function compare(a, b) {
				if (!a.date && !b.date) { return 0; }
				if (!a.date) { return -1; }
				if (!b.date) { return 1; }
				if (a.date.getTime() > b.date.getTime())
					return -1;
				if (a.date.getTime() < b.date.getTime())
					return 1;
				return 0;
			});

			renderDocsProcessor.extraData.allDocs = docList;
			
			//add a dump of the allDocs for use as search data
			docs.push({
				docType: 'markdown',
				fileInfo: {
					fileReader: 'markdownFileReader',
					filePath: '/www/hearthstone.gg-static/content/search-data.json',
					baseName: 'search-data.json',
					extension: 'json',
					basePath: '/www/hearthstone.gg-static/content',
					relativePath: 'search-data.json',
					projectRelativePath: 'content/search-data.json',
					content: '',
					name: '/www/hearthstone.gg-static/content/search-data.json'
				},
				id: 'search-data',
				aliases: ['search-data'],
				path: '/www/hearthstone.gg-static/content/search-data.json',
				outputPath: '/www/hearthstone.gg-static/build/search-data.json',
				metadata: {
					title: 'search-data',
					template: 'raw',
				},
				webPath: '/search-data.json'
			});
			return docs;
		}
	};
};