module.exports = function() {
	var self = this;
	var docList = [];
	self.documents.forEach(function(doc){
		var data = doc.data;
		docList.push({
			title: data.title,
			outputPath: doc.outputPath,
			path: doc.outputPath.replace(self.buildPath, ''),
			isArticle: data.type === 'article' ? true : false,
			category: data.category,
			author: data.author,
			description: data.description,
			date: new Date(Number(data.date))
		});
	});
	self.documents.forEach(function(doc){
		doc.data.path = doc.outputPath.replace(self.buildPath, '');
		if (doc.data.date) { doc.data.date = Date(doc.data.date); }
		if (!doc.data.transforms || doc.data.transforms.indexOf('allDocs') === -1) { return; }
		doc.data.allDocs = docList;
	});
};