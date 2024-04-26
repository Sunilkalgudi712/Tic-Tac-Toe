// Step 2 - Add some logic:
const playGameBtn = document.getElementById("play-game-btn");
const newGameBtn = document.getElementById("new-game-btn");
const gameCells = document.querySelectorAll(".cell");
const aiMark = "X";
const humanMark = "O";

let gameOver = true;

gameCells.forEach((c) => c.addEventListener("click", insertPlayersMark));
playGameBtn.addEventListener("click", playGame);
newGameBtn.addEventListener("click", startNewGame);

function insertPlayersMark() {
  if (!this.innerText && !gameOver) {
    this.innerText = humanMark;
    checkIfGameIsOver();
  }
  if (!gameOver) {
    insertCompMark();
    checkIfGameIsOver();
  }
}

function playGame() {
  insertCompMark();
  checkIfGameIsOver();
  playGameBtn.style.display = "none";
  newGameBtn.style.display = "block";
}

function startNewGame() {
  gameOver = false;
  gameCells.forEach((i) => {
    i.innerText = "";
    i.style.color = "#4b3621";
  });
}

function insertCompMark() {
  // Step 3 - Store the board's current state in an array:
  const currentBoardState = [];

  gameCells.forEach((c, i) => {
    c.innerText
      ? currentBoardState.push(c.innerText)
      : currentBoardState.push(i);
  });

  // Step 4 - Create a function to get the indexes of all the empty cells:
  function getAllEmptyCellsIndexes(currBdSt) {
    return currBdSt.filter((i) => i != "X" && i != "O");
  }

  // Step 5 - Create a winner determiner function:
  function checkIfWinnerFound(currBdSt, currMark) {
    if (
      (currBdSt[0] === currMark &&
        currBdSt[1] === currMark &&
        currBdSt[2] === currMark) ||
      (currBdSt[3] === currMark &&
        currBdSt[4] === currMark &&
        currBdSt[5] === currMark) ||
      (currBdSt[6] === currMark &&
        currBdSt[7] === currMark &&
        currBdSt[8] === currMark) ||
      (currBdSt[0] === currMark &&
        currBdSt[3] === currMark &&
        currBdSt[6] === currMark) ||
      (currBdSt[1] === currMark &&
        currBdSt[4] === currMark &&
        currBdSt[7] === currMark) ||
      (currBdSt[2] === currMark &&
        currBdSt[5] === currMark &&
        currBdSt[8] === currMark) ||
      (currBdSt[0] === currMark &&
        currBdSt[4] === currMark &&
        currBdSt[8] === currMark) ||
      (currBdSt[2] === currMark &&
        currBdSt[4] === currMark &&
        currBdSt[6] === currMark)
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Step 6 - Create the minimax algorithm:
  function minimax(currBdSt, currMark) {
    // Step 8 - Store the indexes of all empty cells:
    const availCellsIndexes = getAllEmptyCellsIndexes(currBdSt);

    // Step 9 - Check if there is a terminal state:
    if (checkIfWinnerFound(currBdSt, humanMark)) {
      return { score: -1 };
    } else if (checkIfWinnerFound(currBdSt, aiMark)) {
      return { score: 1 };
    } else if (availCellsIndexes.length === 0) {
      return { score: 0 };
    }

    // Step 10 - Create a place to record the outcome of each test play:
    const allTestPlayInfos = [];

    // Step 10 - Create a for-loop statement that will loop through each of the empty cells:
    for (let i = 0; i < availCellsIndexes.length; i++) {
      // Step 11 - Create a place to store this test-play's terminal score:
      const currentTestPlayInfo = {};

      // Step 11 - Save the index number of the cell this for-loop is currently processing:
      currentTestPlayInfo.index = currBdSt[availCellsIndexes[i]];

      // Step 11 - Place the current player's mark on the cell for-loop is currently processing:
      currBdSt[availCellsIndexes[i]] = currMark;

      if (currMark === aiMark) {
        // Step 11 - Recursively run the minimax function for the new board:
        const result = minimax(currBdSt, humanMark);

        // Step 12 - Save the result variable's score into the currentTestPlayInfo object:
        currentTestPlayInfo.score = result.score;
      } else {
        // Step 11 - Recursively run the minimax function for the new board:
        const result = minimax(currBdSt, aiMark);

        // Step 12 - Save the result variable's score into the currentTestPlayInfo object:
        currentTestPlayInfo.score = result.score;
      }

      // Step 12 - Reset the current board back to the state it was before the current player made its move:
      currBdSt[availCellsIndexes[i]] = currentTestPlayInfo.index;

      // Step 12 - Save the result of the current player's test-play for future use:
      allTestPlayInfos.push(currentTestPlayInfo);
    }

    // Step 15 - Create a store for the best test-play's reference:
    let bestTestPlay = null;

    // Step 16 - Get the reference to the current player's best test-play:
    if (currMark === aiMark) {
      let bestScore = -Infinity;
      for (let i = 0; i < allTestPlayInfos.length; i++) {
        if (allTestPlayInfos[i].score > bestScore) {
          bestScore = allTestPlayInfos[i].score;
          bestTestPlay = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < allTestPlayInfos.length; i++) {
        if (allTestPlayInfos[i].score < bestScore) {
          bestScore = allTestPlayInfos[i].score;
          bestTestPlay = i;
        }
      }
    }

    // Step 17 - Get the object with the best test-play score for the current player:
    return allTestPlayInfos[bestTestPlay];
  }

  // Step 7 - First minimax invocation:
  const bestPlayInfo = minimax(currentBoardState, aiMark);

  // Step 25 - Play on the favorable cell:
  gameCells[bestPlayInfo.index].innerText = aiMark;
}

// Step 26 - Check if the game is over:
function checkIfGameIsOver() {
  const rowsColsAndDiagsKeys = [
    "rowOne",
    "rowTwo",
    "rowThree",
    "columnOne",
    "columnTwo",
    "columnThree",
    "diagonalOne",
    "diagonalTwo",
  ];

  const rowsColsAndDiags = {
    rowOne: document.querySelectorAll(".r1"),
    rowTwo: document.querySelectorAll(".r2"),
    rowThree: document.querySelectorAll(".r3"),
    columnOne: document.querySelectorAll(".c1"),
    columnTwo: document.querySelectorAll(".c2"),
    columnThree: document.querySelectorAll(".c3"),
    diagonalOne: document.querySelectorAll(".d1"),
    diagonalTwo: document.querySelectorAll(".d2"),
  };

  const cellValuesKeys = [
    "rowOneCellsValues",
    "rowTwoCellsValues",
    "rowThreeCellsValues",
    "columnOneCellsValues",
    "columnTwoCellsValues",
    "columnThreeCellsValues",
    "diagonalOneCellsValues",
    "diagonalTwoCellsValues",
  ];

  const cellValues = {
    rowOneCellsValues: [],
    rowTwoCellsValues: [],
    rowThreeCellsValues: [],
    columnOneCellsValues: [],
    columnTwoCellsValues: [],
    columnThreeCellsValues: [],
    diagonalOneCellsValues: [],
    diagonalTwoCellsValues: [],
  };

  // Push each row, column, and diagonal cells' values into the appropriate array of the cellValues object:
  for (let i = 0; i < rowsColsAndDiagsKeys.length; i++) {
    rowsColsAndDiags[rowsColsAndDiagsKeys[i]].forEach((c) =>
      cellValues[cellValuesKeys[i]].push(c.innerText)
    );
  }

  // Change the font color of the row, column, or diagonal cells whose values form a winning combination to color green:
  for (let i = 0; i < cellValuesKeys.length; i++) {
    if (
      cellValues[cellValuesKeys[i]].every(
        (v) => v === cellValues[cellValuesKeys[i]][0] && v !== ""
      )
    ) {
      gameOver = true;
      rowsColsAndDiags[rowsColsAndDiagsKeys[i]].forEach(
        (c) => (c.style.color = "green")
      );
    }
  }

  // If all cells have a value ("X" or "O"), and gameOver is still "false", change the gameOver variable to "true" and change all cells' font color to grey to reflect that the game is a draw:
  if (Array.from(gameCells).every((i) => i.innerText) && !gameOver) {
    gameOver = true;
    gameCells.forEach((i) => (i.style.color = "grey"));
  }
}