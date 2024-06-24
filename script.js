const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const hintText = document.querySelector(".hint b");
const img = document.querySelector(".img img");
let currentword, correctLetters, wrongCount;
const maxGueses = 6;
const gameModel = document.querySelector(".game-modal");
const again = document.querySelector(".again");
const reset = () => {
  correctLetters = new Set();
  wrongCount = 0;
  img.src = `img/hangman-0.svg`;
  wordDisplay.innerHTML = currentword
    .split("")
    .map(
      (letter) =>
        `<li class="letter">${correctLetters.has(letter) ? letter : ""}</li>`
    )
    .join("");
  keyboard.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  gameModel.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentword = word;
  hintText.textContent = hint;
  reset();
};
const createKeyboard = () => {
  for (let index = 97; index <= 122; index++) {
    const button = document.createElement("button");
    button.textContent = String.fromCharCode(index);
    keyboard.appendChild(button);
    button.addEventListener("click", (event) =>
      checkLetter(event.target, String.fromCharCode(index))
    );
  }
};
const gameOver = (isVictory) => {
  const modal = isVictory ? "you found the word: " : "the correct word was: ";
  gameModel.querySelector("img").src = `img/${isVictory ? "win" : "lose"}.gif`;
  gameModel.querySelector("h4").textContent = isVictory
    ? "congrats"
    : "game over";
  gameModel.querySelector("p").innerHTML = `${modal} <b>${currentword}</b>`;
  gameModel.classList.add("show");
};
const checkLetter = (button, clickedLetter) => {
  if (currentword.includes(clickedLetter)) {
    correctLetters.add(clickedLetter);
  } else {
    wrongCount++;
    img.src = `img/hangman-${wrongCount}.svg`;
  }
  button.disabled = true;
  if (wrongCount === maxGueses) return gameOver(false);

  if (correctLetters.size === new Set(currentword.split("")).size)
    return gameOver(true);
  wordDisplay.querySelectorAll(".letter").forEach((element, index) => {
    const letter = currentword[index];
    element.textContent = correctLetters.has(letter) ? letter : "";
  });
};
createKeyboard();
getRandomWord();
again.addEventListener("click", getRandomWord);
