//dotENV

require("dotenv").config();
var fs = require('fs')

var twitter = require('twitter');
var request = require('request');
var spotify = require('node-spotify-api');
var keys = require('./keys.js')
var inquirer = require('inquirer');

var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);


// inquirer 
var pmpt = inquirer.createPromptModule()
var qs = [{
    type:"list",
    name:"command",
    message:"Please pick an option.",
    choices: ['tweets','music','movies','log']
}]

pmpt(qs).then(answers => {
  switch (answers.command) {
    case 'tweets':
      my_tweets()
      break;
    case 'music':
      //
      spotify_this_song()
      break;
    case 'movies':
      //
      movie_this()
      break;
    case 'log':
      do_what_it_says()
      break;
  }
});




function my_tweets() {
 var user = process.argv[3]
 
 var questions = [
  {
    type: 'input',
    name: 'tweet',
    message: "Who do you want to search"
  }] 

  pmpt(questions).then (answers => {
    var params = { screen_name: answers.tweet, count: 10 };
    console.log(answers.tweet)
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
      for (var i = 0; i < tweets.length; i++) {
        if (!error) {
          console.log("======================")
          console.log("Date: " + tweets[i].created_at);
          console.log("Tweet: " + tweets[i].text);
          console.log("======================")
          fs.appendFile('log.txt', "====================== \n"+"Tweet: " + tweets[i].text+",\n "+"====================== \n" ,function(e){
            if(e){
                console.log(e)
            } else{
                console.log('a')
            }
        })
        }
      }
  
  
    });
  });

  

  
  
}


function spotify_this_song() {
 

  var questions = [
    {
      type: 'input',
      name: 'song',
      message: "Who do you want to search"
    }] 
  
  pmpt(questions).then(answers => {
    
    spotify.search({ type: 'track', query: answers.song }, function (err, data) {

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
      
      fs.appendFile('log.txt', "====================== \n"+"Artist: " + spotifyResponse[0].artists[0].name+ ", \n"+"====================== " ,function(e){
        if(e){
            console.log(e)
        } else{
            console.log('a')
        }
      
    })
      
    })
  })
  
}




function movie_this() {
  var questions = [
    {
      type: 'input',
      name: 'movies',
      message: "Who do you want to search"
    }] 

    pmpt(questions).then(answers =>{
     
      var queryUrl = "http://www.omdbapi.com/?t=" + answers.movies + "&s=&y=&plot=short&apikey=trilogy";
  
  
      // if (!movieSearch) {
      //   movieSearch = "Dumb and Dumber "
      // }
    
      request(queryUrl, function (error, response, body) {
        if (error) { console.log(error) }
        if (response.statusCode === 200) {
          var movieObject = JSON.parse(body);
          console.log(
            "======================"+
            "Title: " + movieObject.Title + " , " +
            "Year: " + movieObject.Year + " , " +
            "Rating: " + movieObject.imdbRating + " , " +
            "Actors: " + movieObject.Actors + " , " +
            "Plot: " + movieObject.Plot
            +"======================"
          )
          
        }
        fs.appendFile('log.txt', "====================== \n"+"Title: " + movieObject.Title + ",\n " + "Plot: " + movieObject.Plot+",\n "+"====================== \n" ,function(e){
          if(e){
              console.log(e)
          } else{
              console.log('a')
          }
        
      })
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




