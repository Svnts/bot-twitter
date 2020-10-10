var twit = require(`twit`);
var fs = require('fs');

require("dotenv").config();

const Bot = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
});

function BotInit() {
  var query = {
    //Aqui vai o que você quer buscar
    q: "#futebol",
    result_type: "recent",
  };
  // Este método busca os tweets mais recentes baseado na sua query
  Bot.get("search/tweets", query, BotGotLatestTweet);

  function BotGotLatestTweet(error, data, response) {
    if (error) {
      console.log("bot não pode achar os ultimos tweets");
    } else {
      var id = {
        id: data.statuses[0].id_str,
      };
    }
    // Neste método será retweetado o tweet localizado
    Bot.post("statuses/retweet/:id", id, BotRetweeted);

    function BotRetweeted(error, response) {
      if (error) {
        console.log("O Comentarista não não retweetou: " + error);
      } else {
        console.log("O Comentarista retweetou: " + id.id);
      }
    }
  }
}

/*function BotTabela() {
    var b64content = fs.readFileSync('tabela.png', { encoding: 'base64' });
    Bot.post('media/upload', { media_data: b64content }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string
        var altText = "Small flowers in a planter on a sunny balcony, blossoming."
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
       
        Bot.post('media/metadata/create', meta_params, function (err, data, response) {
          if (!err) {
            // now we can reference the media and post a tweet (media will attach to the tweet)
            var params = { status: 'Tabela Brasileirão 08/10/2020', media_ids: [mediaIdStr] }
       
            Bot.post('statuses/update', params, function (err, data, response) {
              console.log(data)
            })
          }
        })
    })
}*/

setInterval(BotInit, 1 * 60 * 1000);
BotInit();
