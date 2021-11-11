import { Player } from "./player.js";
import { Ship } from "./ship.js";

test("Player function creates player objects", () => {
    expect(Player("John").name).toEqual("John");
});

test("Player creates gameboard objects successfully", () => {
    expect(Player("John").board.getMissedAttacks()).toEqual([]);
});

test("Player can successfully attack empty enemy board", () => {
    const comp = Player("PC");
    const human = Player("John");
    human.attack(comp.board, 32);
    expect(comp.board.getMissedAttacks()).toEqual([32]);
});

test("Player can successfully attack ship on enemy board", () => {
    const comp = Player("PC");
    const human = Player("John");
    comp.board.placeShip(22, Ship(4));
    human.attack(comp.board, 22);
    human.attack(comp.board, 17);
    human.attack(comp.board, 64);
    human.attack(comp.board, 52);
    expect(comp.board.getMissedAttacks()).toEqual([17, 64]);
});

test("Player can successfully sink ship on enemy board", () => {
    const comp = Player("PC");
    const human = Player("John");
    comp.board.placeShip(22, Ship(4));
    human.attack(comp.board, 22);
    human.attack(comp.board, 32);
    human.attack(comp.board, 42);
    human.attack(comp.board, 52);
    expect(comp.board.remainingShips()).toBe(0);
});

test("Player creates correct fleet of ships on initialisation", () => {
    expect(Player("John").ships[0].length).toBe(5);
});

test("Function allShipsPlaced returns true with all 5 ships positioned/placed", () => {
    const playerOne = Player("Dan");
    playerOne.board.placeShip(0, playerOne.ships[0]);
    playerOne.board.placeShip(23, playerOne.ships[1]);
    playerOne.board.placeShip(75, playerOne.ships[2]);
    playerOne.board.placeShip(57, playerOne.ships[3]);
    playerOne.board.placeShip(29, playerOne.ships[4]);
    expect(playerOne.allShipsPlaced()).toBe(true);
});

test("Function allShipsPlaced returns false with only some ships positioned/placed", () => {
    const playerOne = Player("Sam");
    playerOne.board.placeShip(0, playerOne.ships[0]);
    playerOne.board.placeShip(23, playerOne.ships[1]);
    playerOne.board.placeShip(75, playerOne.ships[2]);
    expect(playerOne.allShipsPlaced()).toBe(false);
});
