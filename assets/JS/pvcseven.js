   document.addEventListener('DOMContentLoaded', () => {
      let scores = {
        X: 0,
        O: 0
      };
      document.getElementById('btn').addEventListener('click', resetScore);
      function resetScore() {
        scores.O = 0;
        scores.X = 0;
        updateScores();
       
      }

      const board = document.getElementById('board');
      const cells = [];

      let currentPlayer = 'X';
      let gameBoard =['', '', '', '', '', '', '', '', '', '' ,'','', '', '', '','', '','', '', '', '', '', '', '', '', '','', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', ''];
    
      let gameOver = false;

      function renderBoard() {
        board.innerHTML = '';
        gameBoard.forEach((value, index) => {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.textContent = value;
          cell.dataset.index = index;
          cell.addEventListener('click', handleCellClick);
          board.appendChild(cell);
          cells.push(cell);
        });
      }

      function handleCellClick(event) {
        if (gameOver) return;

        const index = event.target.dataset.index;
        if (gameBoard[index] === '') {
          gameBoard[index] = currentPlayer;
          renderBoard();
          checkWinner();
          if (!gameOver) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            makeComputerMove();
          }
        }
      }

      function makeComputerMove() {
        const emptyCells = gameBoard.reduce((acc, value, index) => {
          if (value === '') {
            acc.push(index);
          }
          return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMove = emptyCells[randomIndex];

        if (emptyCells.length > 0) {
          gameBoard[computerMove] = currentPlayer;
          renderBoard();
          checkWinner();
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }

      function checkWinner() {
        const winPatterns = [
            [0, 1,2,3,4,5,6],     [7,8,9,10,11,12,13], [14,15,16,17,18,19,20],[21,22,23,24,25,26,27],[28,29,30,31,32,33,34],[35,36,37,38,39,40,41],[42,43,44,45,46,47,48], // rows
            [0,7,14,21,28,35,42], [1,8,15,22,29,36,43], [2,9,16,23,30,37,44], [3,10,17,24,31,38,41], [4,11,18,25,32,39,46], [5,12,19,26,33,40,47], [6,15,20,27,34,41,48], // columns
            [0,8,16,24,32,40,48], [6,12,18,24,30,36,42]             // diagonals
        ];


        for (const pattern of winPatterns) {
            const [a, b, c,d,e,f,g] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]&& gameBoard[a] === gameBoard[d]&& gameBoard[a] === gameBoard[e]&&gameBoard[a] === gameBoard[f]&& gameBoard[a] === gameBoard[g]){
                 
            gameOver = true;
            document.getElementById('gameResultMessage').innerText = `${gameBoard[a]} "Player wins!"`;
            scores[gameBoard[a]]++;
            updateScores();
            const gameResultModal = new bootstrap.Modal(document.getElementById('gameResultModal'));
            gameResultModal.show();
            return;
          }
        }

        if (!gameBoard.includes('')) {
          document.getElementById('gameResultMessage').innerText = "It's a draw!";
          const gameResultModal = new bootstrap.Modal(document.getElementById('gameResultModal'));
          gameResultModal.show();
        }
      }
      

      function updateScores() {
        document.querySelector("#scoreboard #player1").innerHTML = scores.X;
        document.querySelector("#scoreboard #player2").innerHTML = scores.O;
      }

      function reset() {
        gameBoard = ['', '', '', '', '', '', '', '', '', '' ,'','', '', '', '','', '','', '', '', '', '', '', '', '', '','', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', ''];
    
        gameOver = false;
        currentPlayer = 'X';
        renderBoard();
        updateScores();
      }
                       
      document.getElementById('btn-reset').addEventListener('click', reset);

      renderBoard();
    });