/*-------------------------------- Constants --------------------------------*/

const board = document.querySelector(".board");
const squares = document.querySelectorAll(".sqr");
const message = document.querySelector("#message");
const resetBtn = document.querySelector(".reset");

/*---------------------------- Variables (state) ----------------------------*/
let player1;
let player2;
let arrOfSquares = [];
let isXturn = true;
/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/
function togglePlayerTurns() {
  let letter;
  if (isXturn) {
    letter = "x";
    message.innerText = "Player O's Turn";

    isXturn = false;
  } else {
    letter = "o";
    message.innerText = "Player X's Turn";
    isXturn = true;
  }
  return letter;
}
// * HOF Check Winner
function checkForWinner() {
  let arrOfX = [];
  let arrOfO = [];

  // if logic prevents the forEach func from recompiling the arrOfSquares on every click
  if (arrOfSquares.length === 0)
    // pushes els in an array so I can iterate over them
    squares.forEach((item) => arrOfSquares.push(item));
  arrOfSquares.map((sqr) => {
    // store the value of the ids of the squares pressed in their respective arrays
    if (sqr.innerText === "x") {
      arrOfX.push(sqr.id);
    } else if (sqr.innerText === "o") {
      arrOfO.push(sqr.id);
    }

    console.log("x array", arrOfX);
    console.log("o array", arrOfO);

    // delcared function in this scope so I can keep arrOfX/O out of the global scope
  });
  // checks to see if the player has a winning combination
  function checkWinningCombinations(sqr1, sqr2, sqr3) {
    if (
      arrOfX.includes(sqr1) &&
      arrOfX.includes(sqr2) &&
      arrOfX.includes(sqr3)
    ) {
      message.innerText = "X is the winner!";
    } else if (
      arrOfO.includes(sqr1) &&
      arrOfO.includes(sqr2) &&
      arrOfO.includes(sqr3)
    )
      message.innerText = "O is the winner!";
  }
  // * runs all possible winning combinations
  function determineWinner() {
    // horizontal
    checkWinningCombinations("0", "1", "2");
    checkWinningCombinations("3", "4", "5");
    checkWinningCombinations("6", "7", "8");
    // vertical
    checkWinningCombinations("0", "3", "6");
    checkWinningCombinations("1", "4", "7");
    checkWinningCombinations("2", "5", "8");
    // diagonal
    checkWinningCombinations("0", "4", "8");
  }
  determineWinner();
      
      if(arrOfO.length + arrOfX.length === 9) message.innerText = "Cats Game! 🐱";
}

// * reset game
function resetGame() {
  isXturn = true;
  squares.forEach((sqr) => (sqr.innerText = ""));
  resetBtn.hasAttribute("disabled");
  resetBtn.innerText = "Reset Game";
  message.innerText = "Player X's Turn";

  arrOfSquares = [];
}
/*----------------------------- Event Listeners -----------------------------*/
///////////////////////////
// Board Event Listener
///////////////////////////
board.addEventListener("click", (e) => {
  console.log(arrOfSquares);
  // allows reset btn to be used once the game starts
  resetBtn.removeAttribute("disabled");

  // prevents overwrites
  if (e.target.innerText) return;

  //   disallows continuation of game once a winner has been found
  if (
    message.innerText === "X is the winner!" ||
    message.innerText === "O is the winner!"
  )
    return;

  // toggles player turns
  e.target.innerText = togglePlayerTurns();
// sets the message to display the appropriate winner
  if (checkForWinner()) {
    message.innerText = checkForWinner();
  }
});
///////////////////////////
// Reset Event Listener
///////////////////////////
resetBtn.addEventListener("click", resetGame);


// * Notes to self
/*
// 1. Create event listener for each box
2. Add either an x or an o for the box pressed
3. create something to store the data of x and o and allow it to toggle each time the 
event is triggered
4. ensure a box cannot be overwritten
5. logic for determining a winner
6. reset the state once a winner has been declared (also add a reset btn)

wining combinations
0-1-2
3-4-5
6-7-8

*/
