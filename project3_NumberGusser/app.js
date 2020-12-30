/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1, //use , imstead of ;
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
    
// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;


//get the user's guess
guessBtn.addEventListener('click', function(){
   let guess = parseInt(guessInput.value);

   // validate the input
   if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

   // check winning case
   if(guess === winningNum){
    
    gameOver(true, `${winningNum} is correct, YOU WIN!`);       

   }else{

        guessesLeft -= 1;
        if(guessesLeft === 0){
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

        }else{
            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            guessInput.value = '';

        }
   }
});

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
      window.location.reload();
    }
  });

function setMessage(msg,color){
    message.style.color = color;
    message.textContent = msg;
}


function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
  
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
  }

  function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }