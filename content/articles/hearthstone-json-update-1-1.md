
{
	"title": "HearthstoneJSON Releases Update",
	"type": "article",
	"template": "article",
	"author": "Tidwell",
	"date": "1451744379632",
	"category": "Developer Resources",
	"description": "Summary of new changes to the HearthstoneJSON API",
	"image": "logs.jpg"
}

---

With the new year, the [HearthSim][2] team has released an update to the [HearhtstoneJSON API][1] for accessing card/card back data.  For a high-level overview of the service, check out our [Hearthstone Data Resources article][4].  Reddit user [Adys][5] posted an [announcement of the new changes][6] on the Hearthstone subreddit.

The update features a number of minor data updates and cleanup of some lesser-used properties around each card and greatly expanded the data available for Card Back information.  The newest update also removed the separation of data via card set (a largely unused feature) for easier developer use.  Most importantly, versioning support was added and a more REST-like interface was created for accessing the data.  This should be a great improvement for developers who wish to automate updating their local caches of the data.

HearthstoneJSON is a [HearthSim][2] project, and the source is [available via github][3].

 [1]: https://hearthstonejson.com/ "hearthstonejson.com"
 [2]: http://hearthsim.info/ "Hearthsim"
 [3]: https://github.com/HearthSim/hearthstonejson "hearthstonejson github"
 [4]: /articles/data-resources "Hearthstone Data Resources"
 [5]: https://www.reddit.com/user/Adys "Adys on reddit"
 [6]: https://www.reddit.com/r/hearthstone/comments/3z1qw4/the_new_version_of_hearthstone_json_is_live/ "The new version of Hearthstone JSON is live! on Reddit"