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
      const audio= new Audio("../assets/img/popup.mp3");
const audiop= new Audio("../assets/img/pop.mp3");
      let currentPlayer = 'X';
      let gameBoard = [ '', '', '', '', '','', '','', '', '', '', '', '', '', '', ''];
   
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
        const winPatterns = [ [0,1,2,3], [4,5,6,7],[8,9,10,11],[12,13,14,15], // rows
        [0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15], // columns
        [0,5,10,15],[3,6,9,12]// diagonals
    ];


        for (const pattern of winPatterns) {
            const [a, b, c,d] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]&& gameBoard[a] === gameBoard[d]) {
                
            gameOver = true;
            document.getElementById('gameResultMessage').innerText = `${gameBoard[a]} "Player wins!"`;
            scores[gameBoard[a]]++;
            updateScores();
            const gameResultModal = new bootstrap.Modal(document.getElementById('gameResultModal'));
            gameResultModal.show();
            audio.play();
            return;
          }
        }

        if (!gameBoard.includes('')) {
          document.getElementById('gameResultMessage').innerText = "It's a draw!";
          const gameResultModal = new bootstrap.Modal(document.getElementById('gameResultModal'));
          gameResultModal.show();
          audiop.play();
        }
      }
      

      function updateScores() {
        document.querySelector("#scoreboard #player1").innerHTML = scores.X;
        document.querySelector("#scoreboard #player2").innerHTML = scores.O;
      }

      function reset() {
        gameBoard = [ '', '', '', '', '','', '','', '', '', '', '', '', '', '', ''];

        gameOver = false;
        currentPlayer = 'X';
        renderBoard();
        updateScores();
      }
                       
      document.getElementById('btn-reset').addEventListener('click', reset);

      renderBoard();
    });