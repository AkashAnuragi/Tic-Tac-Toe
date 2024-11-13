const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const goBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialize box with css properties again
        box.classList = `box box${index + 1}`;
    });
    goBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O"
    }else{
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = ""; 
    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    // We have a Winner
    if(answer != "") {
        gameInfo.innerText = `Winning Player - ${answer}`;
        goBtn.classList.add("active");
        return;
    }

    //  When No Winner is Found
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    // Game Tied!
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        goBtn.classList.add("active");
    }
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer; // UI me change
        gameGrid[index] = currentPlayer;  // humare bnaye hue grid me change
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}


boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

goBtn.addEventListener("click", initGame);