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
      let gameBoard =  ['', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', ''];
   
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
          [0, 1,2,3,4], [5,6,7,8,9], [10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24], // rows
          [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24], // columns
          [0,6,12,18,24], [4,8,12,16,20]             // diagonals
      ];

        for (const pattern of winPatterns) {
          const [a, b, c,d,e] = pattern;
          if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]&& gameBoard[a] === gameBoard[d]&& gameBoard[a] === gameBoard[e]) {
                
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
        gameBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', ''];
   
        gameOver = false;
        currentPlayer = 'X';
        renderBoard();
        updateScores();
      }
                       
      document.getElementById('btn-reset').addEventListener('click', reset);

      renderBoard();
    });