let guessedLettersElement = document.querySelector(".guessed-letters");
const guess = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingGuessesElement = document.querySelector("span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
let word = "magnolia";
let guessedLettersArray = [];
let remainingGuesses = 8;

const getWord = async function(){
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random()*wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
}

getWord();

const placeholder = function(word){
    const placeholderLetters = [];
    for(const letter of word){
        // console.log(letter);
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
    message.innerText = "";
    const goodGuess = validate(input);
    if(goodGuess){
       makeGuess(input); 
    }
});

const validate = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if(input === ""){
        message.innerText = "Please enter a letter from A to Z."
    }else if(input.length > 1){
        message.innerText = "Please enter only one letter."
    }else if(!input.match(acceptedLetter)){
        message.innerText = "Please enter a letter from a to z."
    }else{
        return input;
    }
}

const makeGuess = function(letter){
    letter = letter.toUpperCase();
    if(guessedLettersArray.includes(letter)){
        message.innerText = "You've already guessed that letter! Try again.";
    }else{
        guessedLettersArray.push(letter);
        countGuessesRemaining(letter);
        updatePage();
    }
    console.log(guessedLettersArray);
    updateWordInProgress(guessedLettersArray);
}

const updatePage = function(){
    guessedLettersElement.innerHTML = "";
    for(const letter of guessedLettersArray){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function(guessedLettersArray){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for(const letter of wordArray){
        if(guessedLettersArray.includes(letter)){
            revealWord.push(letter.toUpperCase());
        }else{
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
}

const countGuessesRemaining = function(guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    }else{
        message.innerText = `Good guess! The word has the letter ${guess}.`
    }
    if(remainingGuesses === 0){
        message.innerText = `Game over. The word is ${word}`;
        startOver();
    }else if(remainingGuesses === 1){
        remainingGuessesElement.innerText = `1 guess`;
    }else{
        remainingGuessesElement.innerText = `${remainingGuesses} guesses`;
    }
}

const checkIfWin = function (){
    if(word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight"> You guessed the correct word! Congrats! </p> `;
        startOver();
    }
};

const startOver = function(){
    guess.classList.add("hide");
    remaining.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgain.classList.remove("hide");
}

playAgain.addEventListener("click", function(){
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerText = "";
    remainingGuesses = 8;
    guessedLettersArray = [];
    remainingGuessesElement.innerText = `${remainingGuesses} guesses`;
    guess.classList.remove("hide");
    remaining.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord();
})