module.exports = function() {
	var self = this;
	var docList = [];
	self.documents.forEach(function(doc){
		docList.push({
			title: doc.data.title,
			outputPath: doc.outputPath,
			path: doc.outputPath.replace(self.buildPath, ''),
			isArticle: doc.data.type === 'article' ? true : false
		});
	});
	self.documents.forEach(function(doc){
		doc.data.allDocs = docList;
	});
};