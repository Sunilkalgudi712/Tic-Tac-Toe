const status = document.getElementById('status');
const board = document.getElementById('board');
let currentPlayer = 'o';
    let gameBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', 
    '', '', '',  '', '', '', '','','','','','','','','','','',''];
    let gameActive = true;
    const audio= new Audio("../assets/img/win.mpeg");
    const audiop= new Audio("../assets/img/pop.mp3"); 
    function checkWinner() {
        const winPatterns = [
            [0, 1,2,3,4,5], [6,7,8,9,10,11], [12,13,14,15,16,17],[18,19,20,21,22,23],[24,25,26,27,28,29],[30,31,32,33,34,35], // rows
            [0,6,12,18,24,30], [1,7,13,19,25,31], [2,8,14,20,26,32],[3,9,15,21,27,33],[4,10,16,22,28,34],[5,11,17,23,29,35], // columns
            [0,7,14,21,28,35], [5,10,15,20,25,30]             // diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c,d,e,f] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]&& gameBoard[a] === gameBoard[d]&& gameBoard[a] === gameBoard[e]&& gameBoard[a] === gameBoard[f]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkDraw() {
        return !gameBoard.includes('');
    }

    function handleClick(index) {
        if (!gameActive || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        document.getElementById(`cell-${index}`).innerText = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            document.getElementById('gameResultMessage').innerText = `${winner} "Player wins!"`;
            scores[winner]++;
            updateScores();
            const gameResultModal = new bootstrap.Modal(document.getElementById('gameResultModal'));
            gameResultModal.show();
            gameActive = false;
            audio.play();
        } else if (checkDraw()) {
            document.getElementById('gameResultMessage').innerText = "It's a draw!";
            const gameResultModal = new bootstrap.Modal(document.getElementById('gameResultModal'));
            gameResultModal.show();//recall the chack draw function
            audiop.play();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.innerText =` Player ${currentPlayer}'s turn`;
        }
    }

    function createBoard() {
        for (let i = 0; i < 36; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}`;
            cell.addEventListener('click', () => handleClick(i));
            board.appendChild(cell);
        }
    }

    createBoard();

let scores = {
    X: 0,
    O: 0
};


function resetScore() {
    scores.O = 0;
    scores.X = 0;
    updateScores();
    
  }
function updateScores(currentPlayer) {
	document.querySelector("#scoreboard #player1").innerHTML = scores.X;
    document.querySelector("#scoreboard #player2").innerHTML = scores.O;
   
	
}

function reset() {
  gameBoard =['', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', 
  '', '', '',  '', '', '', '','','','','','','','','','','',''];
  gameActive = true;
  currentPlayer = 'X';
  updateScores();
  audio.pause();
  audiop.pause();
  document.getElementById('status').innerText = "Player X's turn";

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
      cell.innerText = '';
  });
}

currentPlaye='X';
currentPlayer =currentPlayer=== 'X' ? 'O' : 'X';
const audioX= new Audio("../assets/img/x.wav");
const audioO= new Audio("../assets/img/o.wav");
const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (currentPlayer === 'O') {
      audioX.play();
    } else {
      audioO.play();
    }
  });
});