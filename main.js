//Function to move between pages
function goToPage(pageUrl){
	window.location.href = pageUrl;
} 




//One player Gameplay

const words = ["tiger", "elephant", "lion", "gorilla", "sheep", "anteater", "giraffe", "seal", "bear", "panther"];


startGame(){
	targetWord = randomWord();
	currentGuess = createCurrentGuess(targetWord);
	livesLeft = 6;
	lettersGuessed[];
	hangmanImageIndex = 0;
	
	updateGuess();
	updateGuessedLetters();



	




}


//Function to get random word from array
randomWord(){
	return words[Math.floor(Math.random() * words.length)];
}

//Function to create the visual for current guessed word
createCurrentGuess(target){
	return "_".repeat(target.length);
}

//Function to update the current guessed word
updateGuess(){
	document.getElementById('wordDisplay').textContent = currentGuess;
}

//Function to update guessed letters display
updateGuessedLetters(){
	document.getElementById('lettersGuessed').textContent = lettersGuessed.join(', ');
}

//Function to get guess from user and validate it
guessLetter(){
	//Defined as const as we do not want this change in its scope
	const guess = document.getElementById('guessInput').value.toLowerCase();
	//If validation fails return to exits function
	if (!validateGuess(guess)) return;
	
	//If valid guess then enter into array
	lettersGuessed.push(guess);
	
	let correctLetter = updateGuess(guess);
	
	//If letter not found in target word then handle then handle incorrect guess
	if (!correctLetter) {
				incorrectGuess();
		}

}

//Function to validate user guesses
validateGuess(guess){
	//Check if guess is null,undefined or not an alphabetic letter regardless of case if so show error message
	if (!guess || !guess.match(/[a-z]/i)) {
        alert('Please enter a valid letter!');
        return false;
    }
	//Check lettersGuessed array for previously guessed letters
    if (lettersGuessed.includes(guess)) {
        alert('You already guessed that letter!');
        return false;
    }
    //If passes both validation then return true, showing validated guess
	return true;
}













//Event listener to start game when start button clicked
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('guessBtn').addEventListener('click', guessLetter);