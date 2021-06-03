const guessedLettersElement = document.querySelector(".guessed-letters");
const guess = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = "magnolia";
const guessedLettersArray = [];

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

const checkIfWin = function (){
    if(word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight"> You guessed the correct word! Congrats! </p> `
    }
};