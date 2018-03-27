//dotENV

require("dotenv").config();
var fs = require('fs')

var twitter = require('twitter');
var request = require('request');
var spotify = require('node-spotify-api');
var keys = require('./keys.js')

var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

//Liri command

var command = process.argv[2]

switch (command) {
  case 'my-tweets':
    my_tweets()
    break;
  case 'find-this-song':
    //
    spotify_this_song()
    break;
  case 'movie-this':
    //
    movie_this()
    break;
  case 'do-what-it-says':
    do_what_it_says()
    break;
}

function my_tweets() {


  var params = { screen_name: 'johndejesus201', count: 10 };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    for (var i = 0; i < tweets.length; i++) {
      if (!error) {
        console.log("Date: " + tweets[i].created_at);
        console.log("Tweet: " + tweets[i].text);
        console.log("======================")
        fs.appendFile('log.txt', "Tweet: " + tweets[i].text+", " ,function(e){
          if(e){
              console.log(e)
          } else{
              console.log('append')
          }
      })
      }
    }


  });
  
}


function spotify_this_song() {
  if (songRequest === undefined) {
    songRequest = "Bye Bye Bye"
  }

  var songRequest = process.argv[3];

  spotify.search({ type: 'track', query: songRequest }, function (err, data) {

    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    var spotifyResponse = data.tracks.items;

    console.log("======================")
    //Artist Name
    console.log("Artist: " + spotifyResponse[0].artists[0].name)
    //Song Name
    console.log("Song: " + spotifyResponse[0].name)
    //Song Link
    console.log("Link: " + spotifyResponse[0].album.external_urls.spotify)
    //Album Name
    console.log("Album: " + spotifyResponse[0].album.name)

    console.log("======================")
    
    fs.appendFile('log.txt', "Artist: " + spotifyResponse[0].artists[0].name+ ", " ,function(e){
      if(e){
          console.log(e)
      } else{
          console.log('append')
      }
    
  })
    
  })
}




function movie_this() {
  var movieSearch = process.argv[3];

  var queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&s=&y=&plot=short&apikey=trilogy";

  if (!movieSearch) {
    movieSearch = "Dumb and Dumber "
  }

  request(queryUrl, function (error, response, body) {
    if (error) { console.log(error) }
    if (response.statusCode === 200) {
      var movieObject = JSON.parse(body);
      console.log(
        "Title: " + movieObject.Title + " , " +
        "Year: " + movieObject.Year + " , " +
        "Rating: " + movieObject.imdbRating + " , " +
        "Actors: " + movieObject.Actors + " , " +
        "Plot: " + movieObject.Plot
      )
      
    }
    fs.appendFile('log.txt', "Title: " + movieObject.Title + ", " ,function(e){
      if(e){
          console.log(e)
      } else{
          console.log('append')
      }
    
  })
  })
}

function do_what_it_says() {
  

  var fs = require('fs')

  fs.readFile('random.txt','utf8', function(err,data) {
    if (err){
        console.log(err)
    }else {
        console.log(data)
    }
  })
  fs.readFile('log.txt','utf8', function(err,data) {
    if (err){
        console.log(err)
    }else {
        console.log(data)
    }
  })
}




