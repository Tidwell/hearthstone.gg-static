module.exports = function(Handlebars) {
	Handlebars.registerHelper('hashify', function(str) {
		return str.toLowerCase().replace(/ /g, '-');
	});
};