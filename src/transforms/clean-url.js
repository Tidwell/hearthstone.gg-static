module.exports = function() {
	var self = this;
	var docList = [];
	self.documents.forEach(function(doc){
		if (doc.outputPath && typeof doc.outputPath === 'string') {
			var path = doc.outputPath;
			if (path.indexOf('index.html') > 0) { return; }
			doc.outputPath = [path.replace('.html', '/index.html')];
		}
		if (doc.data.allDocs) {
			doc.data.allDocs.forEach(function(doc){
				doc.path = doc.path.replace('.html', '');
			});
		}
	});
};