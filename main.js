import "./index.css";
import WordList from "./word-list.js";

const hangmanImg = document.querySelector('#hangman-img');
const wordDisplay = document.querySelector('.word_display');
const guessText = document.querySelector('.counter');
const keyboard = document.querySelector('.alphabet_container');
const gameModal = document.querySelector('.game_over');
const playAgainBtn = document.querySelector('.again');

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImg.src = `svg/hangman${wrongGuessCount}.svg`;
    guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboard.querySelectorAll("button").forEach(button => button.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}


/*get random word*/
const getRandomWord = () => {
    const { word } = WordList[Math.floor(Math.random() * WordList.length)];
    currentWord = word;
    console.log(word);
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? "You found the word :" : "The correct word was :";
        gameModal.querySelector(".game_over_text").innerText = `${isVictory ? "Congrats!" : "Game Over!"}`;
        gameModal.querySelector("img").src = `img/${isVictory ? "victory" : "lost"}.gif`;
        gameModal.querySelector(".game_over_correct_word").innerHTML = `${modalText} <b class="correct_word">${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImg.src = `svg/hangman${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount ===  maxGuesses) return gameOver(false);
    if(correctLetters.length ===  currentWord.length) return gameOver(true);
}

/*creating keyboards*/
for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button');
    button.textContent = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}



hangmanImg.src = `svg/hangman0.svg`;
hangmanImg.alt = `hangman`;

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);