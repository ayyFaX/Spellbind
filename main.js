// Declare gameplay variables without values

let lettersGuessed = [];
let targetWord;
let currentGuess;
let livesLeft;
let handmanImageIndex;
let words;


// Function to setup and start game with selected options
function setupGame(difficulty, category){
	
	// Code to check difficulty 'custom indicating 2 player game
	let customTargetWord = localStorage.getItem('customTargetWord');

    if (difficulty === 'custom' && customTargetWord) {
        // Check if custom difficulty and word set
        targetWord = customTargetWord;
		livesLeft = 6;
		hangmanImageIndex = 2;
    } else {
	
		// Update variables based on difficulty selection
		switch (difficulty){
			case 'easy':
				livesLeft = 7;
				hangmanImageIndex = 1;
				break;
			case 'medium':
				livesLeft = 6;
				hangmanImageIndex = 2;
				break;
			case 'hard':
				livesLeft = 5;
				hangmanImageIndex = 3;
				break;
			default:
				livesLeft = 6;
				hangmanImageIndex = 2;
				break;
		}
	
		// Update what array is used for getting random word based on category
		switch (category){
			case 'animals':
				words = ["tiger", "elephant", "lion", "gorilla", "sheep", "anteater", "giraffe", "seal", "bear", "panther"];
				break;
			case 'sports':
				words = ["soccer", "basketball", "tennis", "volleyball", "swimming", "golf", "rugby", "cricket", "hockey", "baseball"];
				break;
			case 'countries':
				words = ["unitedstates", "china", "india", "brazil", "russia", "japan", "germany", "unitedkingdom", "france", "italy"];
				break;
			default:
				words = ["tiger", "elephant", "lion", "gorilla", "sheep", "anteater", "giraffe", "seal", "bear", "panther"];
				break;
		}
	
		// Get target word 
		targetWord = randomWord();
	}
	
	// Update displays using values selected above
	currentGuess = createCurrentGuess(targetWord);
	updateWordDisplay();
    updateGuessedLetters();
    updateLivesLeft();
    updateHangmanImage();
	
}


// Function to get random word from array
function randomWord(){
	return words[Math.floor(Math.random() * words.length)];
}


//Function to create the visual for current guessed word
function createCurrentGuess(target){
	return "_".repeat(target.length);
}


// Function to update the current word display
function updateWordDisplay(){
	document.getElementById('wordDisplay').textContent = currentGuess;
}


// Function to update guessed letters display
function updateGuessedLetters(){
	document.getElementById('lettersGuessed').textContent = lettersGuessed.join(', ');
}


// Function to update lives left
function updateLivesLeft(){
	document.getElementById('livesRemaining').textContent = livesLeft
}


// Function to update hangman Image
function updateHangmanImage(){
	const hangmanImagePath = 'images/hangman' + hangmanImageIndex + '.png';
    document.getElementById('hangmanImage').src = hangmanImagePath;
}


// Function to get guess from user and validate it
function guessLetter(){
	
	// Defined as const as we do not want this change in its scope
	const guess = document.getElementById('guessInput').value.toLowerCase();
	
	// If validation fails return to exit function
	if (!validateGuess(guess)) return;
	
	//If valid guess then enter into array and call function to concatenate the guessed word being displayed
	lettersGuessed.push(guess);
	let found = updateCurrentGuess(guess);
	
	// If letter not found in target word then handle incorrect guess
	if (!found) {
		incorrectGuess();
	}
	
	// Update displays and check for game win/lose
	updateWordDisplay();
	updateGuessedLetters();
	handleResults();

}


// Function to validate user guesses
function validateGuess(guess){
	
	// Check if guess is null,undefined or not an alphabetic letter regardless of case if so show error message
	if (!guess || !guess.match(/[a-z]/i)) {
        alert('Please enter a valid letter!');
        return false;
    }
	
	// Check lettersGuessed array for previously guessed letters and if present show error message
    if (lettersGuessed.includes(guess)) {
        alert('You already guessed that letter!');
        return false;
    }
    
	// If guess passes both validation checks then return true, showing validated guess
	return true;
}


// Function to handle incorrect guesses
function incorrectGuess(){
	
	// Take away a life and increment hangman index by one
	livesLeft--;
	hangmanImageIndex++;
	
	// Display incorrect guess message
	alert('Incorrect, you have ' + livesLeft + ' lives left'); 
	
	// Update values and hangman image being displayed
	updateLivesLeft();
	updateHangmanImage();

}


// Function to update the word thats been guessed so far
function updateCurrentGuess(guess){
	
	let found = false;
	
	// Loops through the target word looking for guess to match character
	for (let i = 0; i < targetWord.length; i++){
		
		// If guess matches character then add it to the current guess to be displayed
		if (guess === targetWord[i]) {
			currentGuess = currentGuess.substr(0, i) + guess + currentGuess.substr(i + 1);
			found = true;
		}
	
	}
	
	// Return either true or false based on check
	return found;

}


// Function to set the values of selected difficulty/category and go to gameplay
function selectionsGoToGameplay(){
	 
	 // Get selections from radio input on selections page
	 const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
     const selectedCategory = document.querySelector('input[name="category"]:checked').value;
	 
	 // Set value of selections in local storage
	 localStorage.setItem("selectedDifficulty", selectedDifficulty);
	 localStorage.setItem("selectedCategory", selectedCategory);
	 
	 goToPage("gameplay.html");

}


// Function to check if word has been guessed, meaning a win
function checkGameWin(){
	return currentGuess === targetWord;
}


// Function to check if no more lives left, meaning game is lost
function checkGameLoss(){
	return livesLeft === 0;
}


// Function to handle a game win or loss, updating messages for results page
function handleResults(){
	
	// Check game win/loss and pass corresponding win/loss message
	if (checkGameWin()){
		goToResults("Congratulations! You guessed the word: ", targetWord);
	} else if (checkGameLoss()){
		goToResults("Better luck next time! The word was: ", targetWord);
	}

}


// Function to go to results page with correct win/loss message
function goToResults(message, word){
	
	// Set values of what the target word was and a corresponding win/loss message
	localStorage.setItem("resultMessage", message);
	localStorage.setItem("guessedWord", word);
	
	goToPage("results.html");

}


// Function for starting two player Gameplay
function startTwoPlayerGame() {
    
	// Get inputted target word from index page ensuring no white spaces
	const targetWord = document.getElementById('targetWordInput').value.trim();
    
	// If there was an input from index then set the values difficulty, category and word to custom and go to gameplay
	if (targetWord) {
        localStorage.setItem('selectedDifficulty', 'custom');
        localStorage.setItem('selectedCategory', 'custom');
        localStorage.setItem('customTargetWord', targetWord);
        goToPage('gameplay.html');
    } else {
        alert('Please enter a target word!');
    }

}


// Function to move between pages
function goToPage(pageUrl){
	window.location.href = pageUrl;
} 


// On html page load get items needed from local storage and event listener for guesses
document.addEventListener('DOMContentLoaded', function() {
    
	// Event listener for guess button 
	document.getElementById('guessBtn').addEventListener('click', guessLetter);
	
	// Get selections from local storage and store in constant
	const selectedDifficulty = localStorage.getItem("selectedDifficulty");
    const selectedCategory = localStorage.getItem("selectedCategory");
    
	// Call game setup with selections
	setupGame(selectedDifficulty, selectedCategory);
	
	// Get the results from gameplay
	const gameResultMessage = localStorage.getItem("resultMessage");
    const gameGuessedWord = localStorage.getItem("guessedWord");

    // Set the content of the corresponding elements to display game result message and guessed word
    document.getElementById('resultMessage').textContent = gameResultMessage;
    document.getElementById('guessedWord').textContent = gameGuessedWord;

});

	
