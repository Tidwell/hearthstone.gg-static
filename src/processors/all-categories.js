module.exports = function allCategories(renderDocsProcessor) {
	return {
		$runAfter: ['splitContentProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function(docs) {
			var self = this;
			var categories = [];
			docs.forEach(function(doc){
				var docCategory = doc.data.category;

				if (!doc.data.categories) { doc.data.categories = {}; }
				
				if (docCategory && categories.indexOf(docCategory) === -1) {
					doc.data.categories[docCategory] = true;
					categories.push(docCategory);
				}
			});
			renderDocsProcessor.extraData.allCategories = categories;
		}
	}
};