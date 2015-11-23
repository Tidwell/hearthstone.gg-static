
{
	"title": "Third Party Hearthstone Data",
	"type": "article",
	"template": "templates/article.hbs",
	"author": "Tidwell",
	"date": "1448305145453",
	"category": "Developer Resources",
	"description": "A collection and analysis of third party sources for developers to access hearthstone data."
}

---

There are several third-party developers who have created ways for developers to gain access to the Hearthstone data in JSON format.  [hearthstonejson.com][1]  provides downloadable archives of the hearthstone card data, card back data, and card data in multiple international languages.  [hearthstoneapi.com][2] provides a similar service, but via a web API built using [mashape][3].  The data provided is nearly identical to other offerings, but additionally provides a REST-based query interface for filtering/sorting/searching for cards or card backs, and can support on-the-fly locale translations.

The primary difference between these two services is based around accessability and searchability.  If you are building an offline application, or do not want to require a network connection for your user to access card data, including the raw data from [hearthstonejson.com][1] is a good option.  However, if you are not concerned about requiring your user to have a network connection, or need to provide an ability for the user to perform robust queries against the card database and do not want to build search/filter abilities yourself, [hearthstoneapi.com][2] may be the solution you are looking for.

Additionaly, [hearthstonejson.com][1]'s data set does not contain information for card images, whereas [hearthstoneapi.com][2] includes urls for both regular and gold versions of the cards sourced from [zamimg][4].  Because these assets are controlled by a third party, it is probably best to store copies of them within your own application instead of sourcing them from wowhead's servers. 

[hearthstoneapi.com][2] also offers a [slack][5] webhook integration for displaying hearthstone cards in a slack channel.


 [1]: https://hearthstonejson.com/ "hearthstonejson.com"
 [2]: http://hearthstoneapi.com/ "hearthstoneapi.com" 
 [3]: https://market.mashape.com/omgvamp/hearthstone "heathstoneapi.com on mashape"
 [4]: http://wow.zamimg.com/ "wowhead static file server"
 [5]: https://slack.com/ "slack"