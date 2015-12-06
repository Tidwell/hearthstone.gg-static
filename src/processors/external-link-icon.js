var jsdom = require('jsdom');
/**
 * @dgProcessor externalLinkProcessor
 * @description
 * adds an icon to external links and target=_new by spinning up a dom of the html content, fixing it, and outputing.
 */
module.exports = function externalLinkProcessor(writeFilesProcessor) {
	return {
		$runAfter: ['contentMarkdownProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function(docs) {
			docs.forEach(function(doc){
				var domDoc = jsdom.jsdom(doc.fileInfo.content);
				var links = domDoc.defaultView.document.querySelectorAll('a');
				console.log(links);
				[].forEach.call(links, function(link) {
					var linkHref = link.href;
					if (linkHref.indexOf('http') > -1) {
						link.target = "_new";
						link.innerHTML = link.innerHTML + ' <i class="fa fa-external-link"></i>';
					}
				});
				doc.fileInfo.content = jsdom.serializeDocument(domDoc.defaultView.document.body).replace('<body>','').replace('</body>','');
			});
			return docs;
		}
	};
};