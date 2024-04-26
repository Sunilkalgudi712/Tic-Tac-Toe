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
    let gameBoard = ['', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', '','', '', '', '', '','','','','','','','','',''];

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
      gameBoard =  ['', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '', '', '','', '', '', '', '','','','','','','','','',''];

      gameOver = false;
      currentPlayer = 'X';
      renderBoard();
      updateScores();
    }
                     
    document.getElementById('btn-reset').addEventListener('click', reset);

    renderBoard();
  });