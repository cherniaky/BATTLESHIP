const calculateShipPosition = (
    originCoordinate,
    shipLength,
    shipOrientation
) => {
    const position = [];
    position[0] = originCoordinate;

    if (shipOrientation === "vertical") {
        for (let i = 1; i < shipLength; i++) {
            position[i] = position[i - 1] + 10;
        }
    } else {
        for (let j = 1; j < shipLength; j++) {
            position[j] = position[j - 1] + 1;
        }
    }
    return position;
};

function Ship(length) {
    if (length < 2 || length > 5) {
        throw new Error(
            "Invalid ship length, must be between 2 and 5 inclusive"
        );
    }

    // Default is vertical because ship DOM objects are arranged vertically layout-wise
    let orientation = "vertical";

    const position = [];

    const setPosition = (originCoordinate, shipOrientation) => {
        // Clear any existing positional data
        position.length = 0;
        // Fill with new data
        calculateShipPosition(
            originCoordinate,
            length,
            shipOrientation
        ).forEach((coordinate) => {
            position.push(coordinate);
        });
    };

    const hits = [];

    const hit = (coordinate) => {
        hits.push(coordinate);
    };

    const isSunk = () => hits.length === length;

    const resetShip = () => {
        position.length = 0;
        orientation = "vertical";
        hits.length = 0;
    };

    return {
        length,
        orientation,
        hit,
        isSunk,
        setPosition,
        position,
        hits,
        resetShip,
    };
}

export { Ship };
export {calculateShipPosition};
