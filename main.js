// Function to move between pages
function goToPage(pageUrl){
	window.location.href = pageUrl;
} 




// One player Gameplay

const words = ["tiger", "elephant", "lion", "gorilla", "sheep", "anteater", "giraffe", "seal", "bear", "panther"];
let lettersGuessed = [];
let targetWord = randomWord();
let currentGuess = createCurrentGuess(targetWord);
let livesLeft = 6;
let hangmanImageIndex = 1;
const hangmanPath = "C:/Users/adamm/Documents/Uni Work/yr2 sem 2/Web Tech/Web tech labs and coursework/Coursework/Spellbind/";
updateWordDisplay();
updateHangmanImage();

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
	document.getElementById('hangmanImage').src = hangmanPath + "hangman" + hangmanImageIndex + ".png";
}

// Function to get guess from user and validate it
function guessLetter(){
	// Defined as const as we do not want this change in its scope
	const guess = document.getElementById('guessInput').value.toLowerCase();
	// If validation fails return to exits function
	if (!validateGuess(guess)) return;
	
	//If valid guess then enter into array
	lettersGuessed.push(guess);
	
	let found = updateCurrentGuess(guess);
	
	// If letter not found in target word then handle then handle incorrect guess
	if (!found) {
				incorrectGuess();
		}
	
	
	updateWordDisplay();
	updateGuessedLetters();

}

// Function to validate user guesses
function validateGuess(guess){
	// Check if guess is null,undefined or not an alphabetic letter regardless of case if so show error message
	if (!guess || !guess.match(/[a-z]/i)) {
        alert('Please enter a valid letter!');
        return false;
    }
	// Check lettersGuessed array for previously guessed letters
    if (lettersGuessed.includes(guess)) {
        alert('You already guessed that letter!');
        return false;
    }
    // If passes both validation then return true, showing validated guess
	return true;
}

// Function to handle incorrect guesses
function incorrectGuess(){
	// Take away a life
	livesLeft--;
	hangmanImageIndex++;
	alert('Incorrect, you have ' + livesLeft + ' lives left'); 
	updateLivesLeft();
	updateHangmanImage();
}

// Function to update the word thats been guessed so far
function updateCurrentGuess(guess){
	let found = false;
	// Loops through the target word looking for guess to match character
	for (let i = 0; i < targetWord.length; i++){
		// If guees matches character then add it to the current guess to be displayed
		if (guess === targetWord[i]) {
			currentGuess = currentGuess.substr(0, i) + guess + currentGuess.substr(i + 1);
			found = true;
		}
		
	}
	return found;

}









document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('guessBtn').addEventListener('click', guessLetter);
	
});

	
