//This section requires the inquirer and is-letter npm packages used within the application.
//This section also requires the word.js and game.js files that allows us to call information from both of those files into this file.
var inquirer = require('inquirer');
var isLetter = require('is-letter');
var Word = require('./word.js');
var Game = require('./game.js');

//This section sets the variables that will be used throughout the file
var character = Game.newWord;
var guessesLeft = 10
var lettersGuessed = [];
var startingPoint = 0;
var currentWord = null;

//This section states all of the functions that will be called throughout the application

//This function will be called to start the game. It will prompt the user if they want to play and display a message depending on their response.
function startGame(){

    if(lettersGuessed > 0){
      lettersGuessed = [];
    }
//This section uses the inquirer package to prompt the player with a question and confirm function.
    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "Do you know your Simpson's characters?"
    }]).then(function(answer) {
      if(answer.play){
        newGame();
      } else{
        console.log("I don't watch the Simpson's, which means I suck!");
      }
    })};

//This function calls a new game. It sets up a new, random word each time this function is called and is supposed to reset the letters guessed and number of guesses left.
     function newGame(){
    if(guessesLeft === 10) {
      console.log("Welcome to Springfield. Let's get to know the town regulars!");
      console.log('-----------------------------------------------------------------');
      //generates random number based on the wordBank
      var randWord = Math.floor(Math.random() * character.length);
      currentWord = new Word(character[randWord]);
      currentWord.getLets();
      //displays current word as blanks.
      console.log(currentWord.wordRender());
      promptUser();
    } else{
      newGame();
      resetGuesses();
    }
  };

//This function is used to reset the number of guesses and letters guessed when called.
    function resetGuesses(){
    guessesLeft = 10;

  };

//This function is used to prompt the user to guess another letter. It will log the letter guessed.
//It will also inform the user if the letter has been guessed already, if they guessed incorrectly, when they have won and when they have lost.
  function promptUser(){

    //this section uses the inquier npm package to prompt the user to guess a letter.
    inquirer.prompt([{
      name: "chosenLtr",
      type: "input",
      message: "Guess a letter:",
      validate: function(value) {
        if(isLetter(value)){
          return true;
        } else{
          return false;
        }
      }
    }]).then(function(ltr) {
      //this variable was created to return each letter in uppercase.
      var letterReturned = (ltr.chosenLtr).toUpperCase();
  
  //This section uses a for loop to run through the letters the user has guessed to see if they have already guessed the letter.
  //It also uses a if and else statements to display console log messages depending whether or not the letter has been guessed, is correct or incorrect.
      var guessedAlready = false;
        for(var i = 0; i<lettersGuessed.length; i++){
          if(letterReturned === lettersGuessed[i]){
            guessedAlready = true;
          }
        }
        
        if(guessedAlready === false){
          lettersGuessed.push(letterReturned);

          var found = currentWord.checkIfLetterFound(letterReturned);
          //if none were found tell user they were wrong
          if(found === 0){
            console.log('Homer says...Doh!');
            guessesLeft--;
            startingPoint++;
            console.log('Guesses remaining: ' + guessesLeft);
            console.log('\n-------------------');
            console.log(currentWord.wordRender());
            console.log('\n-------------------');

            console.log("Letters guessed: " + lettersGuessed);
          } else{
            console.log('Mr. Burns says...Excellent!');
              //checks to see if user won
              if(currentWord.didWeFindTheWord() === true){
                console.log(currentWord.wordRender());
                console.log('You win! Homer says...Woo Hoo!!');
                newGame();
              } else{
                // display the user how many guesses remaining
                console.log('Guesses remaining: ' + guessesLeft);
                console.log(currentWord.wordRender());
                console.log('\n-------------------');
                console.log("Letters guessed: " + lettersGuessed);
              }
          }
          if(guessesLeft > 0 && currentWord.wordFound === false) {
            promptUser();
          }else if(guessesLeft === 0){
            console.log('Comic Book Guy says...Worst Game Ever!');
            console.log('The character was: ' + currentWord.word);
            newGame();
          }
        } else{
            console.log("Nelson says...Ha Ha!. Try again.")
            promptUser();
          }
    });
  }

//This section calls the start game function again to restart the game after a user has won or lost. 
startGame();
