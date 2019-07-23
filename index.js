var SlackBot = require("slackbots");
var request = require("request");
var NewsAPI = require("newsapi");
var unirest = require("unirest");

var API_KEY = process.env.API_KEY;
// create a bot
var bot = new SlackBot({
    token: "xoxb-675703372838-704705329606-eI8xqRnFWjNRYdzdbTCKUFIP",
    name: "aloha-ai"
});

bot.on("message", msg => {
    switch (msg.type) {
        case "message":
            // we only want to listen to direct messages that come from the user
            if (msg.channel[0] === "D" && msg.bot_id === undefined) {
                getRandomTechNews(postMessage, msg.user)
            }
            break
    }
})

const postMessage = (message, user) => {
    bot.postMessage(user, message, {
        as_user: true
    });
}

const getRandomTechNews = (callback, user) => {
    //change here
    unirest.get("https://nuzzel-news-v1.p.rapidapi.com/news?count=10&q=movies")
    .header("X-RapidAPI-Host", "nuzzel-news-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", API_KEY)
    .end(function (response) {

        let newsJSON = response.body;
        //change here
        let news = "*Viral News* in Movies : \n\n\n\n";
        for(i = 0; i < newsJSON.results.stories.length; i++) {
            news += "_Excerpt:_   \n" + ">" + newsJSON.results.stories[i].excerpt + "\n"
            news += "_Let's see the article!_ \n" + newsJSON.results.stories[i].url + "\n\n\n"
        }
        callback(news, user);
    });

  }

