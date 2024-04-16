// Function to move between pages
function goToPage(pageUrl){
	window.location.href = pageUrl;
} 




// One player Gameplay

const words = ["tiger", "elephant", "lion", "gorilla", "sheep", "anteater", "giraffe", "seal", "bear", "panther"];


function startGame(){
	targetWord = randomWord();
	currentGuess = createCurrentGuess(targetWord);
	livesLeft = 6;
	lettersGuessed[];
	hangmanImageIndex = 0;
	
	updateWordDisplay();
	updateGuessedLetters();



	




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

// Function to get guess from user and validate it
function guessLetter(){
	// Defined as const as we do not want this change in its scope
	const guess = document.getElementById('guessInput').value.toLowerCase();
	// If validation fails return to exits function
	if (!validateGuess(guess)) return;
	
	//If valid guess then enter into array
	lettersGuessed.push(guess);
	
	let correctLetter = updateGuessedWord(guess);
	
	// If letter not found in target word then handle then handle incorrect guess
	if (!correctLetter) {
				incorrectGuess();
		}
	
	updateWordDisplay();

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
	alert("Incorrect, you have ${livesLeft} lives left"); 
}

// Function to update the word thats been guessed so far
function updateCurrentGuess(guess){
	let found = false;
	// Loops through the target word looking for guess to match character
	for (let i = 0, i < targetWord, i++){
		// If guees matches character then add it to the current guess to be displayed
		if (targetword[i] === guess) {
			currentGuess = currentGuess.substr(0, i) + guess + currentGuess.substr(i + 1);
			found = true;
		}
		
	}
	return found;

}











//Event listener to start game when start button clicked
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('guessBtn').addEventListener('click', guessLetter);