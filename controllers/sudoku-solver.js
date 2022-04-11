class SudokuSolver {

  validate(puzzleString) {
    
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let beginIndex = row * 9;
    let endIndex = beginIndex + 9;

    let r = puzzleString.slice(beginIndex, endIndex);

    let rowRegex = new RegExp(value.toString());
    
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
      cArray.push(parseInt(puzzleArray[i * 9 + column]));
    }

    if(!(cArray.includes(value))) {
      // console.log(true);
      return true;
    }
    else {
      // console.log(false);
      return false;
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    //Find region
    let rRegion;
    let cRegion;

    switch(true) {
      case (row == 0 || row == 1 || row == 2):
        rRegion = 0;
        break;
      case (row == 3 || row == 4 || row == 5):
        rRegion = 1;
        break;
      case (row == 6 || row == 7 || row == 8):
        rRegion = 2;
        break;
    }

    switch(true) {
      case (column == 0 || column == 1 || column == 2):
        cRegion = 0;
        break;
      case (column == 3 || column == 4 || column == 5):
        cRegion = 1;
        break;
      case (column == 6 || column == 7 || column == 8):
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
    // console.log(regionArray);

    if(!regionArray.includes(value)) {
      return true;
    }
    else {
      return false;
    }
  }

  //Fix this!
  checkExistingPlacement(puzzleString, row, column, value) {
    let index = row * 9 + column;

    if(puzzleString[index] == value.toString()) {
      return true;
    }
    else {
      return false;
    }
  }

  solve(puzzleString) {
    let solution = [];
    let possibleSolutions = [];

    for(let i = 0; i < 9; i++) {
      solution.push([]);
      possibleSolutions.push([]);
      for(let j = 0; j < 9; j++) {
        solution[i].push('.');
        possibleSolutions[i].push([]);

        for(let x = 1; x < 10; x++) {
          if(this.checkExistingPlacement(puzzleString, i, j, x)) {
            solution[i][j] = x;
          }

          if(
            this.checkRowPlacement(puzzleString, i, j, x) &&
            this.checkColPlacement(puzzleString, i, j, x) &&
            this.checkRegionPlacement(puzzleString, i, j, x) &&
            !this.checkExistingPlacement(puzzleString, i, j, x)
          ) 
          {
            possibleSolutions[i][j].push(x);
          }
        }
        if(possibleSolutions[i][j].length == 1) {
          // solution[i][j] = possibleSolutions[i][j][0];
        }
      }
    }

    let solutionArrArrStr = solution.map(arr => arr.map(num => num.toString()));
    let solutionArrStr = solutionArrArrStr.map(arr => arr.join(''));
    let solutionStr = solutionArrStr.join(''); 

    // console.log(solution);
    // console.log(solutionStr);
    // console.log(possibleSolutions);

    return solutionStr;
  }
}

module.exports = SudokuSolver;


