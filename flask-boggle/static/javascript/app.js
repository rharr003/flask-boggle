const form = document.querySelector("form");
const result = document.querySelector(".result");
const scoreBoard = document.querySelector(".score");
const TimerDisplay = document.querySelector(".timer");
let score = 0;
let correctGuesses = [];
let gameOver = false;
let timer = 59;
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (gameOver) {
    console.log("game is over!");
    return;
  }
  const guess = form.guess.value;
  fetch(`http://127.0.0.1:5000/check-answer/${guess}`)
    .then((response) => response.json())
    .then((data) => {
      result.innerText = data.result;
      result.classList.remove("hidden");
      if (data.result === "ok" && correctGuesses.indexOf(guess) < 0) {
        score += guess.length;
        scoreBoard.innerText = `Score : ${score}`;
        correctGuesses.push(guess);
      }
    });
});
function sendGameInfo() {
  fetch(`http://127.0.0.1:5000/game-finished/${score}`).then(() =>
    window.location.reload()
  );
}
setTimeout(() => {
  gameOver = true;
  console.log("game over!");
  clearInterval(interval);
  sendGameInfo();
}, 60000);

const interval = setInterval(function () {
  timer -= 1;
  TimerDisplay.innerText = `Time Left: ${timer}`;
}, 1000);
