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



	document.getElementById('startBtn').style.display = 'none';
	document.getElementById(





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














//Event listener to start game when start button clicked
document.getElementById('startBtn').addEventListener('click', startGame);