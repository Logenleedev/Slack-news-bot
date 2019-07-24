var SlackBot = require("slackbots");
var request = require("request");
var NewsAPI = require("newsapi");
var unirest = require("unirest");

var API_KEY = process.env.API_KEY;
var Slack_API = process.env.Slack_API;
// create a bot
var bot = new SlackBot({
    token: Slack_API,
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


    unirest.get("https://nuzzel-news-v1.p.rapidapi.com/news?count=10&q=movies")
        .header("X-RapidAPI-Host", "nuzzel-news-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", API_KEY)
        .end(function (response) {

            var newsJSON = response.body;
            var news = "*Viral News* in Movies : \n\n\n\n";
            for (i = 0; i < newsJSON.results.stories.length; i++) {
                news += "_Excerpt:_   \n" + ">" + newsJSON.results.stories[i].excerpt + "\n"
                news += "_Let's see the article!_ \n" + newsJSON.results.stories[i].url + "\n\n\n"
            };
            callback(news, user);
        });

}