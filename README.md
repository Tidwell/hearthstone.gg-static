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

