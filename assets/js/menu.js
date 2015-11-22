(function($) {
	var $sidebar;
	var $menu;
	var $menuTrigger;

	function getElements() {
		$sidebar = $('[data-sidebar]');
		$menu = $('[data-menu]');
		$menuTrigger = $('[data-menu-trigger]');
	}

	function bindDOM() {
		$sidebar.addClass('js-active');
		$sidebar.on('click', '[data-menu-trigger]', toggleMenu);
		
	}

	function toggleMenu() {
		$sidebar.toggleClass('menu-open');
		return false;
	}

	function init() {
		getElements();
		bindDOM();
	}

	$(init);
}(jQuery));