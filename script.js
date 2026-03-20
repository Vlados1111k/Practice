let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let scoreX = 0;
let scoreO = 0;
const winningScore = 3; 

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

function startGame() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    document.getElementById("bgMusic").play();
}

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        
        if (board[index] === "" && !checkWinner()) {
            board[index] = currentPlayer;
            cell.innerText = currentPlayer;
            cell.style.color = currentPlayer === "X" ? "#00d2ff" : "#ff007f";
            
            if (checkWinner()) {
                updateScore();
            } else if (!board.includes("")) { 
                statusText.innerText = "Нічия!";
                setTimeout(resetBoard, 1500); 
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusText.innerText = `Хід ${currentPlayer}`;
            }
        }
    });
});

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

function updateScore() {
    if (currentPlayer === "X") scoreX++; else scoreO++;
    
    document.getElementById("scoreX").innerText = scoreX;
    document.getElementById("scoreO").innerText = scoreO;

    if (scoreX === winningScore || scoreO === winningScore) {
        statusText.innerText = `Гру завершено! Переміг ${currentPlayer}! `;
    } else {
        statusText.innerText = `${currentPlayer} виграв раунд!`;
        setTimeout(resetBoard, 1000); 
    }
}

function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.innerText = "");
    currentPlayer = "X";
    statusText.innerText = "Новий раунд! Хід Х";
}

function resetFullGame() {
    location.reload(); }