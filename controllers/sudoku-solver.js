class SudokuSolver {

  validate(puzzleString) {

    //#10 Check for 81 characters
    if(puzzleString.length != 81) {
      // console.log({error: 'Expected puzzle to be 81 characters long'});
      return {error: 'Expected puzzle to be 81 characters long'};
    }

    //#9 Check for invalid characters in puzzle
    let puzzleRegex = /^[\.1-9]+$/;

    if(!puzzleRegex.test(puzzleString)) {
      // console.log({error: 'Invalid characters in puzzle'});
      return {error: 'Invalid characters in puzzle'};
    }

    return true;
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
    // console.log(rRegion);

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
    // console.log(cRegion);

    //
    let puzzleArray = puzzleString.split('');

    let regionArray = [];

    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        regionArray.push(parseInt(puzzleArray[(i + (rRegion * 27)) + (j * 9 + (cRegion * 3))]));
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

  checkExistingPlacement(puzzleString, row, column, value) {
    let index = row * 9 + column;

    // console.log(index);
    // console.log(puzzleString[index]);
    // console.log(value.toString());

    if(puzzleString[index] == value.toString()) {
      // console.log(true);
      return true;
    }
    else {
      // console.log(false);
      return false;
    }
  }

  solve(puzzleString, attempt) {

    //Check with validate function
    if(this.validate(puzzleString) !== true) {
      // console.log(this.validate(puzzleString));
      return this.validate(puzzleString);
    }


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
            possibleSolutions[i][j].push(x);
          }
        }

        let arrToPush = [];

        for(let x = 1; x < 10; x++) {
          if(
            this.checkRowPlacement(puzzleString, i, j, x) &&
            this.checkColPlacement(puzzleString, i, j, x) &&
            this.checkRegionPlacement(puzzleString, i, j, x) &&
            (possibleSolutions[i][j][0] == undefined)
          ) 
          {
            arrToPush.push(x);
          }
        }

        possibleSolutions[i][j] = arrToPush;

        if(possibleSolutions[i][j].length == 1) {
          solution[i][j] = possibleSolutions[i][j][0];
        }
      }
    }

    let solutionArrArrStr = solution.map(arr => arr.map(num => num.toString()));
    let solutionArrStr = solutionArrArrStr.map(arr => arr.join(''));
    let solutionStr = solutionArrStr.join(''); 

    //Loop up to 7 times
    let currentAttempt = attempt;
    let solvedRegex = /[1-9]{81}/;

    // console.log(currentAttempt);

    // console.log(solution);
    // console.log(solutionStr);
    // console.log(possibleSolutions);

    if(!solvedRegex.test(solutionStr) && currentAttempt < 7) {
      currentAttempt += 1;
      solutionStr = this.solve(solutionStr, currentAttempt);
    }

    if(solvedRegex.test(solutionStr)) {
      return solutionStr;
    }
    else {
      return {error: 'Puzzle cannot be solved'};
    }
    
  }
}

module.exports = SudokuSolver;


