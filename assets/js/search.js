(function($) {
	var $body;
	var $searchBox;
	var $searchQuery;
	var $result;

	var isSearchPage = false;

	function getElements() {
		$searchQuery = $('[data-search-query]');
		$searchBox = $('.main-content [data-search]');
		$result = $('[data-search-results]');
	}

	function bindDOM() {
		$('.search-content').addClass('js-active');
	}

	function checkSearchPage() {
		if (window.location.pathname === '/search/') {
			isSearchPage = true;
		}
	}

	function loadSearch() {
		var noResult = 'No search query.';
		if (isSearchPage) {
			if (!window.location.search) { $searchQuery.html(noResult); return; }
			var q = window.location.search.replace('?q=', '');
			if (!q) { $searchQuery.html(noResult); return; }
			$searchQuery.html(q);
			$searchBox.val(q);
			$.getJSON('/search-data.json', function(data){
				var results = 0;
				data.forEach(function(doc){
					if (doc.description && doc.description.toLowerCase().indexOf(q.toLowerCase()) !== -1) {
						$result.append('<p><a href="'+doc.webPath+'">'+doc.title+'</a><br />'+doc.description+'</p><br />');
						results++;
					}
				});
				if (!results) {
					$result.append('<strong>No Results Found</strong>');
				}
			});
		}
	}

	function init() {
		getElements();
		bindDOM();
		checkSearchPage();
		loadSearch();
	}

	$(init);
}(jQuery));