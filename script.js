let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

// Variable to track whose turn it is (true: Player O, false: Player X)
let turnO = true;

// Variable to track the number of moves made
let moves = 0;

// Array defining the winning patterns on the game board
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to reset the game
const resetGame = () => {
    turnO = true; // Resetting to Player O's turn
    moves = 0; // Resetting the number of moves
    enableBoxes(); 
    msgContainer.classList.add("hide"); 
    msg.innerText = ""; 
}

// Function to check for a winner or a tie
const checkWinner = () => {
    for (let patterns of winPattern) {
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
    moves++; 
    if (moves === 9) {
        showTie(); 
    }
}

// Function to display the winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Player ${winner} Won the Game`; 
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// Function to display the tie message
const showTie = () => {
    msg.innerText = "It's a Tie!"; 
    msgContainer.classList.remove("hide"); 
    disableBoxes(); 
}

// Function to disable all the boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true; 
    }
}

// Function to enable all the boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; 
        box.innerText = "";
    }
}

// Adding click event listeners to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O"; 
            box.style.color = "#443627"; 
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#7F0799";
            turnO = true;
        }
        box.disabled = true; // Disable the clicked box
        checkWinner();
    })
})

// Adding click event listeners to the new game and reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
