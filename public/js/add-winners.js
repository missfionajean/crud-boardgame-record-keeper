// grabs parent elements to be manipulated
const winnerList = document.querySelector("#winner-list")
const runnerList = document.querySelector("#runner-list")

// grabs add/remove player buttons
const winnerButton1 = document.querySelector("#add-winner")
const runnerButton1 = document.querySelector("#add-runner")
const winnerButton2 = document.querySelector("#remove-winner")
const runnerButton2 = document.querySelector("#remove-runner")

// creates a clone of drop-down
let newWinner = document.getElementById("gameWinners").cloneNode(true);

// creates a clone of drop-down
let newRunner = document.getElementById("runnersUp").cloneNode(true);

// event listeners to "add player" buttons
winnerButton1.addEventListener("click", () => {
    // creates a clone of drop-down
    newWinner = document.getElementById("gameWinners").cloneNode(true);
    // appends after last selector in div
    winnerList.appendChild(newWinner)
})

runnerButton1.addEventListener("click", () => {
    // creates a clone of drop-down
    newRunner = document.getElementById("runnersUp").cloneNode(true);
    // appends after last selector in div
    runnerList.appendChild(newRunner)
})

// event listeners to "remove player" buttons
winnerButton2.addEventListener("click", () => {
    // creates a clone of drop-down
    newWinner = document.getElementById("gameWinners").cloneNode(true);
    // appends after last selector in div
    winnerList.removeChild(winnerList.lastChild)
})

runnerButton2.addEventListener("click", () => {
    // creates a clone of drop-down
    newRunner = document.getElementById("runnersUp").cloneNode(true);
    // appends after last selector in div
    runnerList.removeChild(runnerList.lastChild)
})