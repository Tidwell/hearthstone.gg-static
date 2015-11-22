module.exports = function() {
	var self = this;
	var docList = [];
	self.documents.forEach(function(doc){
		docList.push({
			title: doc.data.title,
			outputPath: doc.outputPath
		});
	});
	self.documents.forEach(function(doc){
		//create a disgusting circular reference
		doc.data.allDocs = docList;
	});
};