var fs = require('fs');
var argOne = process.argv[2];
var argTwo = process.argv[3];
var request = require('request');

// twitter
var keys = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter({
     consumer_key: keys.twitterKeys.consumer_key,
     consumer_secret: keys.twitterKeys.consumer_secret,
     access_token_key: keys.twitterKeys.access_token_key,
     access_token_secret: keys.twitterKeys.access_token_secret
});
var params = {count: 20};

// spotify
var Spotify = require('node-spotify-api');
var spotifyAPI = new Spotify({
  			id: keys.spotifyKeys.client_id,
  			secret: keys.spotifyKeys.client_secret
		});

function getTweets(){
     client.get('statuses/user_timeline', params, function(error, tweets, response){
          if (!error) {
               for (var i = 0; i < tweets.length; i++) {
                    console.log(tweets[i].text + " Created on: " + tweets[i].created_at);
                    fs.appendFile('log.txt', tweets[i].text + " Created on: " + tweets[i].created_at + "\n");
               }
               fs.appendFile('log.txt', "========================================================");
          } else {
               console.log(error);
          }
     });
}

function getSong() {
     var queryInput = "what's my age again";
     if (argTwo !== undefined) {
          queryInput = argTwo;
     }
     spotifyAPI.search({ type: 'track', query: queryInput}, function(err, data) {
         if ( err ) {
             console.log('Error occurred: ' + err);
             return;
         }
         console.log("Artist: " + data.tracks.items[0].artists[0].name);
         console.log("Song Name: " + data.tracks.items[0].name);
         console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
         console.log("Album: " + data.tracks.items[0].album.name);
         fs.appendFile('log.txt', "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n" + "Album: " + data.tracks.items[0].album.name  + "\n" + "=================================================================");
     });
}

function getMovie() {
     var queryInput = "Mr. Nobody";
     if (argTwo !== undefined) {
          queryInput = argTwo;
     }
     request("http://www.omdbapi.com/?apikey=" + keys.omdbKey.api_key + "&t=" + queryInput + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
          if (!error && response.statusCode == 200) {
               var movieData = JSON.parse(body);
               console.log("Title: " + movieData.Title);
               console.log("Year: " + movieData.Year);
               console.log("IMDB Rating: " + movieData.imdbRating);
               console.log("Country: " + movieData.Country);
               console.log("Language: " + movieData.Language);
               console.log("Plot: " + movieData.Plot);
               console.log("Actors: " + movieData.Actors);
               console.log("Rotten Tomatoes Rating: " + movieData.tomatoUserRating);
               console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);
               fs.appendFile('log.txt', "Title: " + movieData.Title + "\n" + "Year: " + movieData.Year + "\n" + "IMDB Rating: " + movieData.imdbRating + "\n" + "Country: " + movieData.Country + "\n" + "Language: " + movieData.Language + "\n" + "Plot: " + movieData.Plot + "\n" + "Actors: " + movieData.Actors + "\n" + "Rotten Tomatoes Rating: " + movieData.tomatoUserRating + "\n" + "Rotten Tomatoes URL: " + movieData.tomatoURL + "\n" + "=================================================================");
          }
          else {
               console.log(error);
          }
     });
}


function getRandom() {
     fs.readFile("random.txt", "utf8", function(error, data)
     {
     	// If an error was experienced we say it.
     	if(error){
     		console.log(error);
     	}
          else {
               var dataArray = data.split(',');
               var argOne = dataArray[0];
               var argTwo = dataArray[1];
               switch(argOne) {
                    case "my-tweets":
                         getTweets();
                         break;
                    case "spotify-this-song":
                         function getSong() {
                              var queryInput = "what's my age again";
                              if (argTwo !== undefined) {
                                   queryInput = argTwo;
                              }
                              spotify.search({ type: 'track', query: queryInput, count: 1 }, function(err, data) {
                                   if ( err ) {
                                        console.log('Error occurred: ' + err);
                                        return;
                                   }
                                   console.log("Artist: " + data.tracks.items[0].artists[0].name);
                                   console.log("Song Name: " + data.tracks.items[0].name);
                                   console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
                                   console.log("Album: " + data.tracks.items[0].album.name);
                                   fs.appendFile('log.txt', "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Song Name: " + data.tracks.items[0].name + "\n" + "Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n" + "Album: " + data.tracks.items[0].album.name + "\n" + "=================================================================");
                              });
                         }
                         getSong();
                         break;
                    case "movie-this":
                         function getMovie() {
                              var queryInput = "Mr. Nobody";
                              if (argTwo !== undefined) {
                                   queryInput = argTwo;
                              }
                              request('http://www.omdbapi.com/?t=' + queryInput + "&tomatoes=true", function (error, response, body) {
                                   if (!error && response.statusCode == 200) {
                                        var movieData = JSON.parse(body);
                                        console.log("Title: " + movieData.Title);
                                        console.log("Year: " + movieData.Year);
                                        console.log("IMDB Rating: " + movieData.imdbRating);
                                        console.log("Country: " + movieData.Country);
                                        console.log("Language: " + movieData.Language);
                                        console.log("Plot: " + movieData.Plot);
                                        console.log("Actors: " + movieData.Actors);
                                        console.log("Rotten Tomatoes Rating: " + movieData.tomatoUserRating);
                            		     console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);
                                        fs.appendFile('log.txt', "Title: " + movieData.Title + "\n" + "Year: " + movieData.Year + "\n" + "IMDB Rating: " + movieData.imdbRating + "\n" + "Country: " + movieData.Country + "\n" + "Language: " + movieData.Language + "\n" + "Plot: " + movieData.Plot + "\n" + "Actors: " + movieData.Actors + "\n" + "Rotten Tomatoes Rating: " + movieData.tomatoUserRating + "\n" + "Rotten Tomatoes URL: " + movieData.tomatoURL + "\n" + "=================================================================");
                                   }
                                   else {
                                        console.log(error);
                                   }
                              });
                         }
                         getMovie();
                         break;
               }
          }
     });
}

function startHere(){
	switch(argOne) {
	     case "my-tweets":
	          getTweets();
	          break;
	     case "spotify-this-song":
	          getSong();
	          break;
	     case "movie-this":
	          getMovie();
	          break;
	     case "do-what-it-says":
	          getRandom();
	          break;
	}
}

startHere();

