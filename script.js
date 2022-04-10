const gameStatus = document.querySelector('.game-status');
let player1 = "";
let player2 = "";

function displayGame() {
   document.getElementById("preScreen").style.display = "block";

  player1 = document.getElementById('player1').value.toString();
  player2 = document.getElementById('player2').value.toString();

//   playerChange(player1, player2);
}


let gameActive = true;
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

const winningMessage = function(player) {

    document.querySelector(".game-status").innerHTML = `player ${player} has won`;
}
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = function(player) {

    document.querySelector(".game-status").innerHTML = `it is ${player}'s turn`;
}



const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function cellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function playerWon() {
    console.log(currentPlayer)
    if(currentPlayer === "X") {
        winningMessage(player1);
    } else {
        winningMessage(player2);
    }
}

function playerChange() {
    if(currentPlayer === "X") {
        currentPlayerTurn(player1);
        currentPlayer = "O";
    } else {
        currentPlayerTurn(player2);
        currentPlayer = "X"
    }
}

function resultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        playerWon();
        gameActive = false;
        return;
    }

    let roundDraw = !board.includes("");
    if (roundDraw) {
        gameStatus.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    playerChange();
    
}

function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (board[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();
    
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameStatus.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.game-restart').addEventListener('click', restartGame);