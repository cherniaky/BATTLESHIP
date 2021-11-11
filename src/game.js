import { Player } from "./player";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const boards = document.querySelectorAll(".board");
const positionOfShip = document.querySelector("#positionOfShip");
const restart = document.querySelector("#restart");
const curShipLength = document.querySelector("#currentShipSize");
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

//user.placeAIShips();

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
    orientationChoice = "vertical";
    positionOfShip.textContent = "vertical";
    shipIndex = 0;
    renderUserShips();
    boards[1].style.display = "none";
    positionOfShip.style.display = "flex";
    curShipLength.style.display = "flex";
     updateShipLenght(shipIndex);
});

function renderUserShips() {
    for (let i = 0; i < 100; i++) {
        userCells[i].style.backgroundColor = "white";
    }

    user.board.getCurrentShips().forEach((ship) => {
        for (let I = 0; I < ship.position.length; I++) {
            let cur = ship.position[I];
            userCells[cur].style.backgroundColor = "green";
        }
    });
}

function renderAiShips() {
    boards[1].style.display = "grid";

    ai.board.getCurrentShips().forEach((ship) => {
        for (let I = 0; I < ship.position.length; I++) {
            let cur = ship.position[I];
            //aiCells[cur].style.backgroundColor = "red";
        }
    });
}


function startGame() {
    positionOfShip.style.display="none";
    curShipLength.style.display="none";
}
