const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(fieldsArray) {
    this.fieldsArray = fieldsArray; //  array of arrays
    // this._rows = rows;
    // this._columns = columns;
  }
  //field representation
  print() {
    const resultArray = [];
    for (let row of this.fieldsArray) {
      resultArray.push(row.join("") + "\n");
    }

    console.log(resultArray.join(""));
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

//console.log('test');
myField.print();
const testing = prompt("Enter in a direction... ");
//console.log('reply', testing);
