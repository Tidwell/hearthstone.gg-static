module.exports = function() {
	var self = this;
	var categories = [];
	self.documents.forEach(function(doc){
		var docCategory = doc.data.category;

		if (!doc.data.categories) { doc.data.categories = {}; }
		
		if (docCategory && categories.indexOf(docCategory) === -1) {
			doc.data.categories[docCategory] = true;
			categories.push(docCategory);
		}
	});
	self.documents.forEach(function(doc){
		if (!doc.data.transforms || doc.data.transforms.indexOf('allCategories') === -1) { return; }
		doc.data.allCategories = categories;
	});
};