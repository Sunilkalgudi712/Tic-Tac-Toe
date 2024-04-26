document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
	const btn = document.getElementById('switch');
	
    function createBoard() {
        for (let i= 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';                   
            cell.id = `cell-${i}`;
            board.appendChild(cell);
        }
    }

    createBoard();
});  
const audio = new Audio("../assets/img/bg.mp3");
audio.loop = true;
var state = 0;

function changeImage() {
    var image = document.getElementById('myImage');
    if (state == 0 && audio.paused) {
        audio.play();
        image.src = "../assets/img/off.png";
        state = 1;
    } else {
        image.src = "../assets/img/on.png";
        state = 0;
        audio.pause();
    }
}

