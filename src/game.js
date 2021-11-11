import { Player } from "./player";

const boards = document.querySelectorAll(".board");
const positionOfShip = document.querySelector("#positionOfShip");
const restart = document.querySelector("#restart");
const curShipLength = document.querySelector("#currentShipSize");
const description = document.querySelector("#description");
const gameResult = document.querySelector("#gameResult");
let user = Player("You");
let ai = Player("AI");
let orientationChoice = "vertical";

boards.forEach((board) => {
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.textContent = " ";
        cell.classList.add(`${board.id}Cell`);
        board.appendChild(cell);
    }
});

boards[1].style.display = "none";

ai.placeAIShips();

const userCells = document.querySelectorAll(".userBoardCell");
const aiCells = document.querySelectorAll(".aiBoardCell");
let shipIndex = 0;

function updateShipLenght(shipIndex) {
    curShipLength.textContent = `Ship size: ${user.ships[shipIndex].length}`;
}

updateShipLenght(shipIndex);

for (let i = 0; i < userCells.length; i++) {
    userCells[i].addEventListener("click", () => {
        if (!user.allShipsPlaced()) {
            let shipToBePlaced = user.ships[shipIndex];
            shipIndex++;

            if (shipIndex == 5) {
                renderAiShips();
                startGame();
            } else {
                updateShipLenght(shipIndex);
            }
            shipToBePlaced.orientation = orientationChoice;
            if (
                user.board.isValidPosition(
                    i,
                    shipToBePlaced.length,
                    orientationChoice,
                    false
                )
            ) {
                user.board.placeShip(i, shipToBePlaced);
                renderUserShips();
            }
        }
    });
}

for (let i = 0; i < aiCells.length; i++) {
    aiCells[i].addEventListener("click", () => {
        let position = i;
        let before = ai.board.getMissedAttacks().length;
        //console.log(before);
        user.attack(ai.board, position);
        let after = ai.board.getMissedAttacks().length;
        //console.log(after);
        if (after == before) {
            renderAiShips();
        } else {
            let randomPosition = Math.floor(
                Math.random() * user.board.getRemainingFreeCells().length
            );
            // console.log(user.board.getRemainingFreeCells());
            let freecells = user.board.getRemainingFreeCells();
            let beforeAI = 0;
            let afterAI = 0;
            let arr = [1, 10,-1,-10];
            beforeAI = user.board.getMissedAttacks().length;
            ai.attack(user.board, freecells[randomPosition]);
            afterAI = user.board.getMissedAttacks().length;
            renderUserShips();
            renderAiShips();
            let seria=1;
            let randArr = Math.floor(Math.random() * 4);
            while (beforeAI == afterAI) {
                beforeAI = user.board.getMissedAttacks().length;
                ai.attack(user.board, freecells[randomPosition]+arr[randArr]*seria);
                seria++;
                afterAI = user.board.getMissedAttacks().length;
                renderUserShips();
                renderAiShips();
            }
            if (user.board.remainingShips() == 0) {
                gameResult.style.color ="red";
                gameResult.textContent = "Computer win!!!";
            }
            renderUserShips();
            renderAiShips();
        }

        if (ai.board.remainingShips() == 0) {
            gameResult.textContent = "You win!!!";
        }
    });
}

positionOfShip.addEventListener("click", () => {
    if (orientationChoice == "horizontal") {
        orientationChoice = "vertical";
        positionOfShip.textContent = "vertical";
    } else {
        orientationChoice = "horizontal";
        positionOfShip.textContent = "horizontal";
    }
    //console.log(orientationChoice);
});

restart.addEventListener("click", () => {
    user.resetAllShips();
    user.board.resetBoard();
    ai.board.resetBoard();
    ai.resetAllShips();
    ai.placeAIShips();
    orientationChoice = "vertical";
    positionOfShip.textContent = "vertical";
    shipIndex = 0;
    renderUserShips();
    boards[1].style.display = "none";
    positionOfShip.style.display = "flex";
    curShipLength.style.display = "flex";
    description.textContent = "Place your ships on the board";
    gameResult.textContent = "";
    gameResult.style.color = "rgb(255, 217, 0)";
    updateShipLenght(shipIndex);
});

function renderUserShips() {
    for (let i = 0; i < 100; i++) {
        userCells[i].style.backgroundColor = "white";
    }

    // user.board.getAllAttackedCoordinates().forEach((coordinate) => {
    //     if (!user.board.getMissedAttacks().includes(coordinate)) {
    //         userCells[coordinate].style.backgroundColor = "red";
    //     }
    // });

    user.board.getMissedAttacks().forEach((position) => {
        userCells[position].style.backgroundColor = "rgb(124, 124, 124)";
    });

    user.board.getCurrentShips().forEach((ship) => {
        for (let I = 0; I < ship.position.length; I++) {
            let cur = ship.position[I];

            userCells[cur].style.backgroundColor = "green";
        }
    });

    user.board.getCurrentShips().forEach((ship) => {
        for (let I = 0; I < ship.hits.length; I++) {
            let cur = ship.hits[I];

            userCells[cur].style.backgroundColor = "red";
        }
    });
}

function renderAiShips() {
    boards[1].style.display = "grid";
    for (let i = 0; i < 100; i++) {
        aiCells[i].style.backgroundColor = "white";
    }
    ai.board.getAllAttackedCoordinates().forEach((coordinate) => {
        if (!ai.board.getMissedAttacks().includes(coordinate)) {
            aiCells[coordinate].style.backgroundColor = "red";
        }
    });
    ai.board.getMissedAttacks().forEach((position) => {
        aiCells[position].style.backgroundColor = "rgb(124, 124, 124)";
    });
}

function startGame() {
    positionOfShip.style.display = "none";
    curShipLength.style.display = "none";
    description.textContent = "Attack the enemy";
}
