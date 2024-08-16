import "./index.css";
import WordList from "./word-list.js";

const hangmanImg = document.querySelector("#hangman-img");
const incorrectGuesses = document.querySelector(".counter");
const keyboard = document.querySelector(".alphabet-container")

const getRandomWord = () => {
    const { word } = WordList[Math.floor(Math.random() * WordList.length)];
    console.log(word);
}

for(let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.textContent = String.fromCharCode(i);
    keyboard.appendChild(button);
}

getRandomWord();

hangmanImg.src = 'svg/hangman1.svg';
hangmanImg.alt = 'Hangman 1 of 6';


