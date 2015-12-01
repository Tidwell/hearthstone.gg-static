(function($) {
	if (typeof disqus_config === 'undefined' || !disqus_config) { return; }

	var $showCommentsButton;

	function show() {
		$showCommentsButton.unbind().remove();

		//https://hearthstonegg.disqus.com/admin/settings/universalcode/	
		(function() { // DON'T EDIT BELOW THIS LINE
		var d = document, s = d.createElement('script');

		s.src = '//hearthstonegg.disqus.com/embed.js';

		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
		})();

	}
	function init() {
		$showCommentsButton = $('[data-show-comments]').show();
		$showCommentsButton.click(show);
	}

	$(init);

}(jQuery));