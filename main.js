function goToPage(pageUrl){
	window.location.href = pageUrl;
} 




//One player Gameplay

const word = ["tiger", "elephant", "lion", "gorilla", "sheep", "anteater", "giraffe", "seal", "bear", "panther"];


startGame(){
	targetWord = randomWord();
	currentGuess = createCurrentGuess(targetWord);
	









}


//Function to get random word from array
randomWord(){
	return words[Math.floor(Math.random() * words.length)];
}

//Function to create the visual for current guessed word
createCurrentGuess(target){
	return "_".repeat(target.length);
}