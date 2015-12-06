
{
	"title": "Hearthstone Data Resources",
	"type": "article",
	"template": "article",
	"author": "Tidwell",
	"date": "1448305145453",
	"category": "Developer Resources",
	"description": "Summary of third party sources for Hearthstone data and information for extracting the assets and data manually from the game files."
}

---

There are several third-party developers who have created ways for developers to gain access to the Hearthstone data in JSON format.  [hearthstonejson.com][1]  provides downloadable archives of the Hearthstone card data, card back data, and card data in multiple international languages.  [hearthstoneapi.com][2] provides a similar service, but via a web API built using [mashape][3].  The data provided is nearly identical to other offerings, but additionally provides a REST-based query interface for filtering/sorting/searching for cards or card backs, and can support on-the-fly locale translations.

The primary difference between these two services is based around accessibility and searchability.  If you are building an offline application, or do not want to require a network connection for your user to access card data, including the raw data from [hearthstonejson.com][1] is a good option.  However, if you are not concerned about requiring your user to have a network connection, or need to provide an ability for the user to perform robust queries against the card database and do not want to build search/filter abilities yourself, [hearthstoneapi.com][2] may be the solution you are looking for.

Additionaly, [hearthstonejson.com][1]'s data set does not contain information for card images, whereas [hearthstoneapi.com][2] includes urls for both regular and gold versions of the cards sourced from [zamimg][4].  Because these assets are controlled by a third party, it is probably best to store copies of them within your own application instead of sourcing them from wowhead's servers. 

By using either service you are beholden to their update schedule, so extracting the data from Hearthstone manually may be preferable.  As Hearthstone is a [Unity game][6], tools like [disunit][7] can be used to extract asset files.  Card data is stored in an xml file, and all art and sound assets are available. An [ownedcore post][8] explains how the game constructs card renderings during gameplay.  If you want to write a converter of your own, [Hearthsim][10] has a number of open source utilities for working with hearthstone data.  There are several open-source projects for converting asset data to JSON, [rithms/hearthstone-card-api][9] uses python, where [HearthSim/hearthstonejson][11] use javascript.


 [1]: https://hearthstonejson.com/ "hearthstonejson.com"
 [2]: http://hearthstoneapi.com/ "hearthstoneapi.com" 
 [3]: https://market.mashape.com/omgvamp/hearthstone "heathstoneapi.com on mashape"
 [4]: http://wow.zamimg.com/ "wowhead static file server"
 [5]: https://slack.com/ "slack homepage"
 [6]: http://unity3d.com/ "unity homepage"
 [7]: https://github.com/ata4/disunity "disunit github"
 [8]: http://www.ownedcore.com/forums/mmo/hearthstone-heroes-of-warcraft/473615-how-relate-image-names-of-cards-their-data-xml-files.html "owndcore forum post"
 [9]: http://github.com/rithms/hearthstone-card-api "rithms/hearthstone-card-api on github"
 [10]: http://hearthsim.info/ "Hearthsim"
 [11]: https://github.com/HearthSim/hearthstonejson "hearthstonejson github"
