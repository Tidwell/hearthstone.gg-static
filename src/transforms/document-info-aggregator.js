module.exports = function() {
	var self = this;
	var docList = [];
	self.documents.forEach(function(doc){
		docList.push({
			title: doc.data.title,
			outputPath: doc.outputPath,
			path: doc.outputPath.replace(self.buildPath, ''),
			isArticle: doc.data.type === 'article' ? true : false,
			category: doc.data.category,
			author: doc.data.author,
			description: doc.data.description,
			date: new Date(Number(doc.data.date))
		});
	});
	self.documents.forEach(function(doc){
		doc.data.allDocs = docList;
	});
};