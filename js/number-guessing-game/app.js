// UI Elements
let elMin = document.querySelector('.min-num'),
    elMax = document.querySelector('.max-num'),
    elInput = document.querySelector('#guess-input'),
    elSubmit = document.querySelector('#guess-submit'),
    elMessage = document.querySelector('.message');

let min = 10,
    max = 20,
    randomNumber = getRndInteger(min, max),
    limit = 3,
    counter = 0;

// Assign UI min & Max
elMin.textContent = min;
elMax.textContent = max;

// Add event Listener for submit button
elSubmit.addEventListener('click', calculateResult);

// Calculate result
function calculateResult(e){
    // Validate
    let inputNumber = parseInt(elInput.value);
    elInput.value = '';
    if(isNaN(inputNumber) || inputNumber < min || inputNumber > max){
        showMessage(`Please enter a number between ${min} & ${max}`, 'red');
        return;
    }

    counter++;

    // if guess is correct
    if( inputNumber == randomNumber ){

        // Game Over - Won
        gameOver(true, `Congratulations! YOU WIN! ${inputNumber} is correct number.`);

       } else if(counter == limit){

        // Game Over - Lost 
        gameOver(false, `Game Over, you lost. The correct number was ${randomNumber}`);

    } else {
        showMessage(`${inputNumber} is not correct ${limit - counter} guess left.`, 'red');
    }
}

// Game over
function gameOver(won, message){
    let color = won ? 'green' : 'red';

    showMessage(message, color);

    elInput.setAttribute('disabled', 'disabled');
    elInput.style.borderColor = color;
    elSubmit.value = "Play Again";
    elSubmit.className = 'play-again';

    // add event lister for play again button
    let elPlayAgain = document.querySelector('.play-again');
    elPlayAgain.addEventListener('click', function(){
        location.reload();
    });
}

// Generate message
function showMessage(message, color){
    elMessage.innerHTML = `<p>${message}</p>`;

    elMessage.style.color = color;
}

// Generate random number
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}