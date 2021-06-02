const guessedLetters = document.querySelector(".guessed-letters");
const guess = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = "magnolia";

const placeholder = function(word){
    const placeholderLetters = [];
    for(const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
}

placeholder(word);

guess.addEventListener("click", function(e){
    e.preventDefault();
    const input = letter.value;
    console.log(input);
    letter.value = "";
});