//this section creates the letter constructor 
var Letter = function(ltr) {

  this.letter = ltr;
  this.appear = false;
//This section creates the letterRender method that uses if and else statements to determine if the correct letter is guessed it will display the letter, else it will return an underscore.
  this.letterRender = function() {
    if(this.letter == ' '){ 
      this.appear = true;
      return '  ';
    }if(this.appear === false){ 
          return ' _ ';
    } else{ 
      return this.letter;
    }

  };
};

// This section allows us to export the letter variable that will allow us to call it in other files. 
module.exports = Letter;
