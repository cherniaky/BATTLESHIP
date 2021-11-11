import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

function Player(name) {
    const board = Gameboard();

    // let DOMBoard;

    // const allocateDOMBoard = (element) => {
    //     DOMBoard = element;
    // };

    // const getDOMBoard = () => DOMBoard;

    // const activateDOMBoard = () => {
    //     DOMBoard.classList.add("board__table--active");
    // };

    // const deactivateDOMBoard = () => {
    //     DOMBoard.classList.remove("board__table--active");
    // };

    // Creates a set number of specified ships following original Battleship specs
    function createFleet() {
        const carrier = Ship(5);
        const battleship = Ship(4);
        const cruiser = Ship(3);
        const submarine = Ship(3);
        const destroyer = Ship(2);
        return [carrier, battleship, cruiser, submarine, destroyer];
    }

    const ships = createFleet();

    // A function only intended for AI player (though could be retooled as a 'place ships randomly' for human user in future)
    function placeAIShips() {
        const orientations = ["vertical", "horizontal"];
        for (let i = 0; i < 5; i++) {
            const shipToBePlaced = ships[i];
            // Randomly choose orientation to be used
            const orientationChoice =
                orientations[Math.floor(Math.random() * 2)];
            shipToBePlaced.orientation = orientationChoice;
            // Generate random coordinate from 0-99, and check that it is a valid position
            let coordinate = Math.floor(Math.random() * 100);
            while (
                !board.isValidPosition(
                    coordinate,
                    shipToBePlaced.length,
                    orientationChoice,
                    false
                )
            ) {
                coordinate = Math.floor(Math.random() * 100);
            }
            board.placeShip(coordinate, shipToBePlaced);
        }
    }

    function resetAllShips() {
        ships.forEach((ship) => {
            ship.resetShip();
        });
    }

    const attack = (enemyBoard, coordinate) => {
        enemyBoard.receiveAttack(coordinate);
    };

    const allShipsPlaced = () => {
        for (let i = 0; i < ships.length; i++) {
            if (ships[i].position.length === 0) {
                return false;
            }
        }
        return true;
    };

    // Dynamically allocate name based on click-to-edit player names on UI
    const getName = (playerNumber) => {
        if (playerNumber === 1) {
            return document.querySelector(".name-one").textContent;
        }
        return document.querySelector(".name-two").textContent;
    };

    return {
        name,
        board,
        attack,
        ships,
       // allocateDOMBoard,
        //getDOMBoard,
      //  activateDOMBoard,
       // deactivateDOMBoard,
        resetAllShips,
        allShipsPlaced,
        getName,
        placeAIShips,
    };
}

export { Player };
