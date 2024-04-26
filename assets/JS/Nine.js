  const board = document.getElementById('board');
let currentPlayer = 'X';
const status = document.getElementById('status');
    let gameBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', '',
	'', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', '','', '', '', '', '','','','','','','',
	'','','','','','','','','','','','','','','','','','','','','',''];
    let gameActive = true;
    const audio= new Audio("../assets/img/win.mpeg");
    const audiop= new Audio("../assets/img/pop.mp3"); 
    function createBoard() {
        for (let i = 0; i < 81; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}`;
            cell.addEventListener('click', () => handleClick(i));
            board.appendChild(cell);
        }
    }

    createBoard();
    function checkWinner() {
        const winPatterns = [
            [0,1,2,3,4,5,6,7,8],[9,10,11,12,13,14,15,16,17],[18,19,20,21,22,23,24,25,26],[27,28,29,30,31,32,33,34,35],
			[36,37,38,39,40,41,42,43,44],[45,46,47,48,49,50,51,52,53],[54,55,56,57,58,59,61,62],[63,64,65,66,67,68,69,70,71],
		    [72,73,74,75,76,77,78,79,80],// rows
		    [0,9,18,27,36,45,54,63,72],[1,10,19,28,37,46,55,64,73],[2,11,20,29,38,47,56,65,74],[3,12,21,30,39,48,57,66,75],[4,13,22,31,40,49,58,67,76],[5,14,23,32,41,50,59,68,77],[6,15,24,33,42,51,60,69,78,],
			[7,16,25,34,43,52,61,70,79],[8,17,26,35,44,53,62,71,80],// columns
			
            [0,10,20,30,40,50,60,70,80],[8,16,24,32,40,48,56,64,72]     // diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c,d,e,f,g,h,i] = pattern;
            if (gameBoard[a] && gameBoard[a] 
			=== gameBoard[b] && gameBoard[a] 
			=== gameBoard[c]&& gameBoard[a] 
			=== gameBoard[d]&& gameBoard[a]
			=== gameBoard[e]&& gameBoard[a]
			=== gameBoard[f] && gameBoard[a] 
			=== gameBoard[g] && gameBoard[a] 
			=== gameBoard[h] && gameBoard[a] 
			=== gameBoard[i]&& gameBoard[a]) {
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
            audiop.play()
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
	'', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', '','', '', '', '', '','','','','','','',
	'','','','','','','','','','','','','','','','','','','','','',''];
  gameActive = true;
  currentPlayer = 'X';
  updateScores();
  document.getElementById('status').innerText = "Player X's turn";
audio.pause();
audiop.pause();
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