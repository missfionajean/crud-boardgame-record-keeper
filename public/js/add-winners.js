// grabs parent elements to be manipulated
const winnerList = document.querySelector("#winner-list")
const runnerList = document.querySelector("#runner-list")

// grabs add/remove player buttons
const winnerButton = document.querySelector("#add-winner")
const runnerButton = document.querySelector("#add-runner")

// event listeners to "add player" buttons
winnerButton.addEventListener("click", () => {
    // creates a clone of drop-down
    const newWinner = document.getElementById("gameWinners").cloneNode(true);
    // appends after last selector in div
    winnerList.appendChild(newWinner)
})

runnerButton.addEventListener("click", () => {
    // creates a clone of drop-down
    const newRunner = document.getElementById("runnersUp").cloneNode(true);
    // appends after last selector in div
    runnerList.appendChild(newRunner)
})