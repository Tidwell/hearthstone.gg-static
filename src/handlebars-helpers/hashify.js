module.exports = function(Handlebars) {
	Handlebars.registerHelper('hashify', function(str) {
		if (!str) { return; }
		return str.toLowerCase().replace(/ /g, '-');
	});
};