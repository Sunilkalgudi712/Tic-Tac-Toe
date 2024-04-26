const status = document.getElementById('status');
const board = document.getElementById('board');
let currentPlayer = 'o';
    let gameBoard = ['', '', '', '', '', '', '', '', '', '' ,'','', '', '', '','', '','', '', '', '', '', '', '', '', '','', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', ''];
    let gameActive = true;
    const audio= new Audio("../assets/img/win.mpeg");
    const audiop= new Audio("../assets/img/pop.mp3"); 
    function checkWinner() {
        const winPatterns = [
            [0, 1,2,3,4,5,6],     [7,8,9,10,11,12,13], [14,15,16,17,18,19,20],[21,22,23,24,25,26,27],[28,29,30,31,32,33,34],[35,36,37,38,39,40,41],[42,43,44,45,46,47,48], // rows
            [0,7,14,21,28,35,42], [1,8,15,22,29,36,43], [2,9,16,23,30,37,44], [3,10,17,24,31,38,41], [4,11,18,25,32,39,46], [5,12,19,26,33,40,47], [6,15,20,27,34,41,48], // columns
            [0,8,16,24,32,40,48], [6,12,18,24,30,36,42]             // diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c,d,e,f,g] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]&& gameBoard[a] === gameBoard[d]&& gameBoard[a] === gameBoard[e]&&gameBoard[a] === gameBoard[f]&& gameBoard[a] === gameBoard[g]){
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
            status.innerText = `Player ${currentPlayer}'s turn`;
        }
    }

    function createBoard() {
        for (let i = 0; i < 49; i++) {
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
  gameBoard = ['', '', '', '', '', '', '', '', '', '' ,'','', '', '', '','', '','', '', '', '', '', '', '', '', '','', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', ''];
  audio.pause();
  audiop.pause;  
  gameActive = true;
  currentPlayer = 'X';
  updateScores();
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