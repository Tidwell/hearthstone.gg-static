module.exports = function allCategoriesProcessor(renderDocsProcessor) {
	return {
		$runAfter: ['splitContentProcessor'],
		$runBefore: ['renderDocsProcessor'],
		$process: function(docs) {
			var self = this;
			var categories = [];
			docs.forEach(function(doc){
				var metadata = doc.metadata;
				var docCategory = metadata.category;

				if (!metadata.categories) { metadata.categories = {}; }
				
				if (docCategory && categories.indexOf(docCategory) === -1) {
					metadata.categories[docCategory] = true;
					categories.push(docCategory);
				}
			});
			renderDocsProcessor.extraData.allCategories = categories;
		}
	}
};