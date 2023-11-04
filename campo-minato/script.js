// fase preparazione
// recupero elmts
const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

// info utili
const totalCells = 100;
const totalBombs = 16;
const maxScore = totalCells - totalBombs;
const bombList = [];
let score = 0;

// generare list bomb random
while (bombList.length < totalBombs) {
    const n = Math.floor(Math.random() * totalCells) + 1;
    if (!bombList.includes(n)) bombList.push(n);
}

console.log(bombList);

let isCellEven = false;
let isRowEven = false;

for (let i = 1; i <= totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    isCellEven = i % 2 === 0;

    if (isRowEven && isCellEven) cell.classList.add('cell-dark');
    if (!isRowEven && !isCellEven) cell.classList.add('cell-dark');

    if (i % 10 === 0) isRowEven = !isRowEven;

    // gestione click cell
    cell.addEventListener('click', () => {
        // controllo cella cliccata
        if (cell.classList.contains('cell-clicked')) return;
        if (bombList.includes(i)) {
            cell.classList.add('cell-bomb');
            endGame(false);
        }
        else {
            cell.classList.add('cell-clicked');
            updateScore();
        }
    });

    grid.appendChild(cell);
}

playAgainButton.addEventListener('click', () => { location.reload(); });

// FUNZIONI
// aggiorna score
function updateScore() {
    score++;
    scoreCounter.innerText = String(score).padStart(5, 0);

    // controllo vittoria
    if (score === maxScore) endGame(true);
}

// end game
function endGame(isVictory) {
    if (isVictory) {
        endGameScreen.classList.add('win');
        endGameText.innerHTML = 'You<br>win';
    } else revealAllBombs();

    endGameScreen.classList.remove('hidden');
}

function revealAllBombs() {
    const cells = document.querySelectorAll('.cell');

    for (let i = 1; i <= cells.length; i++) {
        const cellToReveal = cells[i - 1];

        if (bombList.includes(i)) cellToReveal.classList.add('cell-bomb');
    }
}