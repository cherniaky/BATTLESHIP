import { Ship } from "./ship";

test("createShip returns ship object correct length property", () => {
    expect(Ship(5).length).toBe(5);
});

test("createShip throws error for lengths < 2 and > 5", () => {
    expect(() => Ship(0)).toThrow(
        "Invalid ship length, must be between 2 and 5 inclusive"
    );
});

test("isSunk returns false on freshly created ship with no hits", () => {
    const testShip = Ship(3);
    expect(testShip.isSunk()).toBe(false);
});

test("isSunk returns false on ship that is partially hit", () => {
    const testShip = Ship(3);
    testShip.hit(1);
    testShip.hit(2);
    expect(testShip.isSunk()).toBe(false);
});

test("isSunk returns true on ship hit appropriate number of times", () => {
    const testShip = Ship(3);
    testShip.hit(1);
    testShip.hit(2);
    testShip.hit(3);
    expect(testShip.isSunk()).toBe(true);
});

test("setPosition correctly positions vertical ships", () => {
    const testShip = Ship(3);
    testShip.setPosition(0, testShip.orientation);
    expect(testShip.position).toEqual([0, 10, 20]);
});

test("setPosition correctly positions horizontal ships", () => {
    const testShip = Ship(3);
    testShip.orientation = "horizontal";
    testShip.setPosition(0, testShip.orientation);
    expect(testShip.position).toEqual([0, 1, 2]);
});

test("Can change orientation of ship", () => {
    const testShip = Ship(3);
    testShip.orientation = "horizontal";
    expect(testShip.orientation).toBe("horizontal");
});

test("ResetShip removes all hits", () => {
    const testShip = Ship(3);
    testShip.hit(1);
    testShip.hit(2);
    testShip.resetShip();
    expect(testShip.hits).toEqual([]);
});
