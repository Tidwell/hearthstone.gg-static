/**
 * @dgProcessor cleanUrlsProcessor
 * @description
 * cleans urls, basically just nests everything that isnt a index.html file down a level
 */
module.exports = function cleanUrlsProcessor(renderDocsProcessor, writeFilesProcessor) {
	return {
		$runAfter: ['allDocsProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function(docs) {
			docs.forEach(function(doc){
				if (doc.outputPath && typeof doc.outputPath === 'string') {
					var path = doc.outputPath;
					//if the file is already heading to an index file we dont want to mess with it
					if (path.indexOf('index.html') > 0) { return; }
					//update the output path
					doc.outputPath = path.replace('.html', '/index.html');
				}
				//update the document's webPath
				doc.webPath = doc.outputPath.replace(writeFilesProcessor.outputFolder, '').replace('/index.html', '');
			});

			/* Update the condensed version of each document stored in allDocs on the renderDocsProcessor */
			if (typeof renderDocsProcessor.extraData.allDocs !== 'undefined') {
				renderDocsProcessor.extraData.allDocs.forEach(function(doc){
					doc.webPath = doc.webPath.replace('.html', '');
				});
			}
		}
	};
};