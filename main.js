const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field; //  array of arrays
    //this._row = 0;
    //this._column = 0;
  }
  get field() {
    return this._field;
  }
  get row() {
    return this._row;
  }
  get column() {
    return this._column;
  }
  set row(rowNum) {
    this_row = rowNum;
  }
  set column(columnNum) {
    this_column = columnNum;
  }
  //
  static generateField(height, width, holePercent) {
    //return randomized 2 dimensional array (include 1 hat)
    const newFieldArray = [];

    for (let i = 0; i < height; i++) {
      let rowArray = [];
      for (let j = 0; j < width; j++) {
        rowArray.push(fieldCharacter);
      }
      newFieldArray.push(rowArray);
    }

    //holes cover a percent of field
    let numHoles = Math.floor(height * width * (holePercent / 100));

    for (let l = 0; l < numHoles; l++) {
      newFieldArray[Math.floor(Math.random() * height)][
        Math.floor(Math.random() * width)
      ] = hole;
    }
    //in case starting position unsafe, assign field
    newFieldArray[0][0] = fieldCharacter;
    // assign hat to random location, not starting position
    do {
      newFieldArray[Math.floor(Math.random() * height)][
        Math.floor(Math.random() * width)
      ] = hat;
    } while (newFieldArray[0][0] === hat);
  }
  //field representation
  print() {
    //let resultStr = "";
    let resultArray = [];
    for (let row of this.field) {
      resultArray.push(row.join("") + "\n");
    }
    console.log(resultArray.join(""));
  }
}

// set starting position, start of game
let gameOver = false;
let currentLocation = [0, 0];
let rowNum = currentLocation[0];
let columnNum = currentLocation[1];

const printUpdatedField = () => {
  //
};

const updateLocation = (currentLocation, direction) => {
  if (direction === "l") {
    columnNum--;
  } else if (direction === "r") {
    columnNum++;
  } else if (direction === "u") {
    rowNum--;
  } else if (direction === "d") {
    rowNum++;
  }
  console.log("New currentLocation fr. update location function:  ", [
    rowNum,
    columnNum,
  ]);
  [[rowNum][columnNum]] = "*";
  currentLocation = [rowNum, columnNum];
  return currentLocation;
  //return [rowNum, columnNum];
};

const isValidMove = (field, currentLocation, direction) => {
  if (
    rowNum < 0 ||
    columnNum < 0 ||
    rowNum > 20 ||
    columnNum > 15
    // rowNum > field.length ||
    // columnNum > field[0].length
  ) {
    console.log("Out of bounds. You must stay in the field.");
    return false;
  } else if (field[[rowNum][columnNum]] === "O") {
    console.log("You fell in a hole.");
    return false;
  } else {
    console.log("move is valid.");
    return true;
  }
  //check if next move is on board
  //check if hole O
};

const checkForHat = () => {
  //check if found hat ^
};

const movePlayer = (direction, field) => {
  direction = direction.toLowerCase();
  const nextMove = updateLocation(currentLocation, direction);
  console.log("direction: ", direction);
  if (direction === "l" && isValidMove(field, nextMove, direction)) {
    currentLocation = nextMove;
    //fieldsArray[rowNum][columnNum] = "*";
    console.log(field);
    console.log("moved left!");
  } else if (direction === "r" && isValidMove(field, nextMove, direction)) {
    currentLocation = nextMove;
    console.log(currentLocation[1]);
    // console.log("row: ", rowNum);
    // console.log("column: ", columnNum);
    //fieldsArray[rowNum][columnNum] = "*";
    //console.log(field);
    console.log("moved right!");
  } else if (direction === "u" && isValidMove(field, nextMove, direction)) {
    console.log("moved up");
  } else if (direction === "d" && isValidMove(field, nextMove, direction)) {
    console.log("moved down");
  } else {
    console.log("you must enter l, r, u, or d.  ");
  }
};
const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

//console.log('test');
myField.print();

let userInput = prompt(
  "Enter a direction. Use l, r, u, d to move left, right, up, or down.  "
);

movePlayer(userInput, [
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

// function game() {
//   while (!gameOver) {
//     console.log(myField.print());
//     let userInput = prompt(
//       "Enter a direction. Use l, r, u, d to move left, right, up, or down.  "
//     );
//     movePlayer(userInput, [
//       ["*", "░", "O"],
//       ["░", "O", "░"],
//       ["░", "^", "░"],
//     ]);
//   }
// }
// game();
