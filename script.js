// select element
const btnNewGame = document.querySelector(".new-game");
const btnRollDice = document.querySelector(".roll-dice");
const btnHold = document.querySelector(".hold");
const dice = document.querySelector(".random-dice");
const player0Element = document.getElementById("player--0");
const player1Element = document.getElementById("player--1");
const score0Element = document.getElementById("score--0");
const current0Element = document.getElementById("current--0");
const score1Element = document.getElementById("score--1");
const current1Element = document.getElementById("current--1");

let score;
let currentScore;
let activePlayer;
let playing;

// reset
const resetGame = function () {
  playing = true;
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0Element.innerText = 0;
  score1Element.innerText = 0;
  current0Element.innerText = 0;
  current1Element.innerText = 0;
  dice.style.display = "none";
  player0Element.classList.add("active");
  player1Element.classList.remove("active");
  player0Element.classList.remove("winner");
  player1Element.classList.remove("winner");
};
resetGame();

// switch player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).innerText = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("active");
  player1Element.classList.toggle("active");
};

// button roll dice
const rollDice = function () {
  if (playing) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `images/dice-${diceNumber}.png`;
    dice.style.display = "block";
    if (diceNumber !== 1) {
      currentScore = currentScore + diceNumber;
      document.getElementById(`current--${activePlayer}`).innerText =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

// function hold dice
const hold = function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).innerText =
      score[activePlayer];
    if (score[activePlayer] >= 20) {
      playing = false;
      dice.style.display = "none";
      document
        .getElementById(`player--${activePlayer}`)
        .classList.remove("active");
      document
        .getElementById(`player--${activePlayer}`)
        .classList.add("winner");
    } else {
      switchPlayer();
    }
  }
};

// function new game
const newGame = function () {
  resetGame();
};

btnRollDice.addEventListener("click", rollDice);
btnHold.addEventListener("click", hold);
btnNewGame.addEventListener("click", newGame);
