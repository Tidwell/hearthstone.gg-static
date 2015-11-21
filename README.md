#Hearthstone.gg Static Site Generator

Content is in ``./content/`` in markdown format



##Dev
``grunt watch``

Watches and regenerates files on changes.  Calls grunt jshint and dev tasks to rebuild

``grunt dev``

Only copies all css/js files to ``./build/`` for easy debugging (no min/concat).  Does not change script/link tags



##Build
``grunt build``

Outputs all files into ``./build/`` directory with css and js minified and concat and all html files with updated script/link tags



##Notes

* All images should be sourced as ``/assets/images/[FILE]`` - the build will revision these in css, js, and markup

* Articles should be defined in the following format.  Above the ``---`` should be a valid JSON object that will have all its properties exposed to the template (for example ``{ "title": "mytitle" }`` will expose a "title" property to the template).  The content below the ``---`` will be exposed as "body"

```html
	{
		"title": "The title that appears in <title></title>"
	}

	---

	#Article Content

	Some article body

	The logo:
	![HS LOGO](/assets/images/logo.png)
```