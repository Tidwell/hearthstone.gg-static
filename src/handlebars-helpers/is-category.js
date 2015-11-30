module.exports = function(Handlebars) {
	Handlebars.registerHelper('isCategory', function(articlecat, category) {
		if (!articlecat || !category) { return; }
		return articlecat === category;
	});
};