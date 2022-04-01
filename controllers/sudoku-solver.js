class SudokuSolver {

  validate(puzzleString) {
    
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let beginIndex = row.charCodeAt(0) - 65;
    let endIndex = beginIndex + 9;

    let r = puzzleString.slice(beginIndex, endIndex);

    let rowRegex = new RegExp(value);
    
    if(!rowRegex.test(r)) {
      return true;
    }
    else {
      return false;
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    let puzzleArray = puzzleString.split('');

    let cArray = [];

    for(let i = 0; i < 9; i++) {
      cArray.push(puzzleArray[i * 9 + parseInt(column) - 1]);
    }

    if(!cArray.includes(value)) {
      return true;
    }
    else {
      return false;
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    //Find region
    let rRegion;
    let cRegion;

    switch(true) {
      case (row == 'A' || row == 'B' || row == 'C'):
        rRegion = 0;
        break;
      case (row == 'D' || row == 'E' || row == 'F'):
        rRegion = 1;
        break;
      case (row == 'G' || row == 'H' || row == 'I'):
        rRegion = 2;
        break;
    }

    switch(true) {
      case (column == '1' || column == '2' || column == '3'):
        cRegion = 0;
        break;
      case (column == '4' || column == '5' || column == '6'):
        cRegion = 1;
        break;
      case (column == '7' || column == '8' || column == '9'):
        cRegion = 2;
        break;
    }

    //
    let puzzleArray = puzzleString.split('');

    let regionArray = [];

    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        regionArray.push(puzzleArray[(i + (rRegion * 27)) + (j * 9 + (cRegion * 3))]);
      }
    }

    return regionArray;

    if(!regionArray.includes(value)) {
      return true;
    }
    else {
      return false;
    }
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;


