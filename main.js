function goToPage(pageUrl){
	window.location.href = pageUrl;
} 




//One player Gameplay

const words = ["tiger", "elephant", "lion", "gorilla", "sheep", "anteater", "giraffe", "seal", "bear", "panther"];


startGame(){
	targetWord=randomWord();
	
	









}


//Function to get random word from array
randomWord(){
	return words[Math.floor(Math.random() * words.length)];
}