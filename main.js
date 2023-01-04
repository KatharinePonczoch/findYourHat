const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

let gameOver = false;

class Field {
  constructor(field) {
    this._field = field; //  array of arrays
    this._rowLocation = 0;
    this._columnLocation = 0;
    //start
    this.field[this._rowLocation][this._columnLocation] = pathCharacter;
  }
  //getters
  get field() {
    return this._field;
  }
  get rowLocation() {
    return this._row;
  }
  get columnLocation() {
    return this._column;
  }
  get currentLocation() {
    return [this._rowLocation][this._columnLocation];
  }
  // setters
  set rowLocation(rowNum) {
    this._rowLocation = rowNum;
  }
  set columnLocation(columnNum) {
    this._columnLocation = columnNum;
  }
  //return randomized 2 dimensional array (include 1 hat)
  static generateField(height, width, holePercent) {
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

    // assign hat to random location, not starting position
    do {
      newFieldArray[Math.floor(Math.random() * height)][
        Math.floor(Math.random() * width)
      ] = hat;
    } while (newFieldArray[0][0] === hat);

    return newFieldArray;
  }

  //field representation
  print() {
    let resultArray = [];
    for (let row of this.field) {
      resultArray.push(row.join("") + "\n");
    }
    console.log(resultArray.join(""));
  }
  // update Location value
  updateLocation(direction) {
    if (direction === "l") {
      this._columnLocation--;
    } else if (direction === "r") {
      this._columnLocation++;
    } else if (direction === "u") {
      this._rowLocation--;
    } else if (direction === "d") {
      this._rowLocation++;
    }
    return [this._rowLocation, this._columnLocation];
  }

  movePlayer(field) {
    let userInput = prompt(
      "\nEnter a direction. Use l, r, u, d to move left, right, up, or down.  "
    );
    let direction = userInput.toLowerCase();

    const nextMove = this.updateLocation(direction);

    if (!this.isValidMove(nextMove)) {
      return "";
    } else if (this.checkForHole(nextMove)) {
      return "";
    } else if (this.checkForHat(nextMove)) {
      return "";
    } else {
      this.field[this._rowLocation][this._columnLocation] = pathCharacter;
    }
  }

  isValidMove() {
    if (
      this._rowLocation < 0 ||
      this._columnLocation < 0 ||
      this._rowLocation >= this._field.length ||
      this._columnLocation >= this._field[0].length
    ) {
      console.log("Out of bounds. You must stay in the field.");
      gameOver = true;
      return false;
    } else {
      return true;
    }
  }

  checkForHole() {
    let currentLocationValue =
      this.field[this._rowLocation][this._columnLocation];

    if (currentLocationValue === hole) {
      console.log("You fell in a hole.");
      gameOver = true;
      return true;
    } else {
      return false;
    }
  }

  checkForHat() {
    let currentLocationValue =
      this.field[this._rowLocation][this._columnLocation];

    if (currentLocationValue === "^") {
      console.log("You found the hat!");
      gameOver = true;
      return true;
    } else {
      console.log("keep looking for the hat.");
      return false;
    }
  }

  static gameSetup() {
    const height = prompt("select field height between 3-25 rows:  ");

    const width = prompt("select field width between 3-25 columns:  ");

    const holePercent = prompt(
      "What percent of the field should contain holes? (enter whole # 10-35):  "
    );
    console.log(
      "\nTry to find your hat:'^' without falling in a hole:'0'! \nYour path will be marked by '*'. \nPress 'crl+C' at any time to exit. \n "
    );

    return [height, width, holePercent];
  }

  game() {
    while (!gameOver) {
      console.log(myField.print());
      this.movePlayer(this.field);
    }
    console.log("GAME OVER \n ");
  }
}

////////////////////////////end Field Class//////////

//call game
const [height, width, holePercent] = Field.gameSetup();
const myField = new Field(Field.generateField(height, width, holePercent));
myField.game();
