
const board = document.getElementById('board');
let currentPlayer = 'X';
let gameBoard =['', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', '',
'', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', '','', '', '', '', '','','','','','','','','',''];
const audio= new Audio("../assets/img/win.mpeg");
const audiop= new Audio("../assets/img/pop.mp3"); 
const status = document.getElementById('status');


function createBoard() {
    for (let i= 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.addEventListener('click', () => Click(i));
        board.appendChild(cell);
    }
}
createBoard();
    function checkWinner() {
        const winPatterns = [
            [0,1,2,3,4,5,6,7],[8,9,10,11,12,13,14,15],[16,17,18,19,20,21,22,23],[24,25,26,27,28,29,30,31],[32,33,34,35,36,37,38,39],[40,41,42,43,44,45,46,47],
			  [48,49,50,51,52,53,54,55],[56,57,58,59,60,61,62,63],// rows
            [0,8,16,24,32,40,48,56],[1,9,17,25,33,41,49,57],[2,10,18,26,34,42,50,58],[3,11,19,27,35,43,51,59],[4,12,20,28,36,44,52,60],[5,13,21,26,37,45,53,61],
			[6,14,22,30,38,46,54,62],[7,15,23,31,39,47,55,63],// columns
            [0,9,18,27,36,45,54,63],[7,14,21,28,35,42,49,56]// diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c,d,e,f,g,h] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]&& gameBoard[a] === gameBoard[d]&& gameBoard[a] === gameBoard[e] &&
			gameBoard[a] === gameBoard[f] && gameBoard[a] === gameBoard[g] && gameBoard[a] === gameBoard[h]){
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkDraw() {
        return !gameBoard.includes('');
    }

    function Click(index) {
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
        } else if (checkDraw()) {
            document.getElementById('gameResultMessage').innerText = "It's a draw!";
            const gameResultModal = new bootstrap.Modal(document.getElementById('gameResultModal'));
            gameResultModal.show();//recall the chack draw function
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.innerText = `Player ${currentPlayer}'s turn`;
        }
    }

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
gameBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', '','', '', '', '', '','','','','','','','','',''];
  gameActive = true;
  audio.pause();
  audiop.pause();
  currentPlayer = 'X';
  updateScores();
  document.getElementById('status').innerText = "Player X's turn";

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
      cell.innerText = '';
  });
}

