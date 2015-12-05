
{
	"title": "Deep Dive into the Hearthstone Log File",
	"type": "article",
	"template": "article",
	"author": "Tidwell",
	"date": "1448235748590",
	"category": "Game Internals",
	"description": "Analysis of the Hearthstone log file, the format, output, and tools for working with the logs."
}

---

Blizzard has repeatedly said that any modification of the Hearthstone game client is a violation of the Terms of Service.  If you are a developer of hearthstone-related software, this is a big problem for developing new and interesting tools that interact with the game.  However, there is a fairly well-known data source that the vast majority of deck trackers, game loggers, replay generators, and arena recommendation engines make use of - the Hearthstone log file.  Much of this information comes from a [reddit post by Flipperbw][1].

Enabling logging is pretty straightforward, you probably already have it enabled if you have ever used a deck tracker or similar software.  To enable logging, navigate to your Application Data Directory:

	Windows: C:\Users\YOURUSER\AppData\Local\Blizzard\Hearthstone *OR* %LOCALAPPDATA%/Blizzard/Hearthstone

	Mac: ~/Library/Application Support/Blizzard/Hearthstone

Once there, create a file called "log.config" and add the following:

	[Zone]
	LogLevel=1
	FilePrinting=false
	ConsolePrinting=true
	ScreenPrinting=false

The conf file describes what the game should log to its output file.  The output file is located:

	Windows: C:\Program Files (x86)\Hearthstone\Hearthstone_Data\output_log.txt (or Program Files for 32 bit windows)

	Mac: /Applications/Hearthstone/Hearthstone.app/Contents/Data/output_log.txt

The log file can have a number of options configured, a (nearly) complete list of these options is listed below.  Each one can be added to the log file definition in place of [Zone], and each accepts the four options defined above:

* Asset - Unity asset loading information
* BattleNet
* Ben
* Bob - Legend rank (if available)
* Brian
* Cameron
* Derek
* FaceDownCard
* HealthyGaming
* Jay
* Kyle - Card back information
* LoadingFile
* Mike
* Net
* Packets
* Packet
* Power - Hero power, attacks, etc
* Rachelle
* Sound

 [1]: https://www.reddit.com/r/hearthstone/comments/268fkk/simple_hearthstone_logging_see_your_complete_play "Reddit post by Flipperbw"