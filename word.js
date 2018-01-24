// section requires the letter.js file so that we can use it throughout this file.
var Letter = require('./letter.js');

//this section creates the Word constructor.
function Word(wrd) {
  //var that = this;
  this.word = wrd;
  this.letters = [];
  this.wordFound = false;

//This section creates the getLets method that uses a for loop to run through word and creats a new variable called newLetter and pushes it to newLetter.
  this.getLets = function() {
    
    for(var i = 0; i<this.word.length; i++){
      var newLetter = new Letter(this.word[i]);
      this.letters.push(newLetter);
    }
  };

  //This section creates the didWeFindTheWord method that uses an if statement to determine if we have guessed the word.
  this.didWeFindTheWord = function() {
    if(this.letters.every(function(lttr){
      return lttr.appear === true;
    })){
      this.wordFound = true;
      return true;
    }

  };

//This section creates the checkIfLetterFound method that will check if the letter was guessed correctly.
  this.checkIfLetterFound = function(guessedLetter) {
    var whatToReturn = 0;
    //iterates through each letter to see if it matches the guessed letter
    this.letters.forEach(function(lttr){
      if(lttr.letter === guessedLetter){
        lttr.appear = true;
        whatToReturn++;
      }
    })
    //if guessLetter matches Letter property, the letter object should be shown
    return whatToReturn;
  };

  this.wordRender = function() {
    var display = '';
    //render the word based on if letters are found or not
    this.letters.forEach(function(lttr){
      var currentLetter = lttr.letterRender();
      display+= currentLetter;
    });

    return display;
  };
}

//this section allows us to export Word that will allow us to use/call it in other files.
module.exports = Word;