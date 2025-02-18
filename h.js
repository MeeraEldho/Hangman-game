// Game variables
const words = ["javascript", "python", "html", "css", "react", "hangman"];
let selectedWord = "";
let displayedWord = [];
let wrongLetters = [];
let attemptsLeft = 6;
let isGameOver = false;

// DOM elements
const wordDisplay = document.getElementById("word");
const wrongLettersDisplay = document.getElementById("wrong-letters");
const messageDisplay = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts").querySelector("span");
const letterInput = document.getElementById("letter-input");
const submitButton = document.getElementById("submit-letter");
const restartButton = document.getElementById("restart");
const hangmanImg = document.getElementById("hangman-img");
const themeToggleButton = document.getElementById("theme-toggle");
const backgroundMusic = document.getElementById("background-music");

// Start the game
function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayedWord = Array(selectedWord.length).fill("_");
  wrongLetters = [];
  attemptsLeft = 6;
  isGameOver = false;

  wordDisplay.textContent = displayedWord.join(" ");
  wrongLettersDisplay.textContent = "";
  messageDisplay.textContent = "";
  attemptsDisplay.textContent = attemptsLeft;
  hangmanImg.src = `hangman${attemptsLeft}.png`;
  letterInput.disabled = false;
  submitButton.disabled = false;
  restartButton.style.display = "none";
  letterInput.value = "";
  letterInput.focus();
  backgroundMusic.play();
}

// Handle user input
submitButton.addEventListener("click", () => {
  if (isGameOver) return;

  const guessedLetter = letterInput.value.toLowerCase();

  if (guessedLetter && !wrongLetters.includes(guessedLetter) && !displayedWord.includes(guessedLetter)) {
    if (selectedWord.includes(guessedLetter)) {
      // Correct guess
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
          displayedWord[i] = guessedLetter;
        }
      }
      wordDisplay.textContent = displayedWord.join(" ");
      messageDisplay.textContent = "Correct! Keep going!";
      messageDisplay.classList.add("popup");

      // Check if the user won
      if (!displayedWord.includes("_")) {
        messageDisplay.textContent = "Congratulations! You won!";
        letterInput.disabled = true;
        submitButton.disabled = true;
        restartButton.style.display = "block";
        hangmanImg.src = "hangmanEscape.png"; // The hangman escapes when the game is won
      }
    } else {
      // Incorrect guess
      wrongLetters.push(guessedLetter);
      wrongLettersDisplay.textContent = `Wrong Letters: ${wrongLetters.join(", ")}`;
      attemptsLeft--;
      attemptsDisplay.textContent = attemptsLeft;
      hangmanImg.src = `hangman${attemptsLeft}.png`;

      // Show animation for wrong guess
      messageDisplay.textContent = "Wrong guess! Try again.";
      messageDisplay.classList.add("popup-wrong");

      // Check if the user lost
      if (attemptsLeft === 0) {
        messageDisplay.textContent = `Game Over! The word was "${selectedWord}".`;
        letterInput.disabled = true;
        submitButton.disabled = true;
        restartButton.style.display = "block";
      }
    }
  }

  letterInput.value = "";
  letterInput.focus();
});

// Restart the game
restartButton.addEventListener("click", startGame);

// Toggle Dark/Light Mode
themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  themeToggleButton.textContent = isDarkMode ? "🌕" : "🌙";
});

// Initialize the game
startGame();
