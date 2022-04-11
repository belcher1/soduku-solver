'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

//Require fill puzzle function
// require('../public/index.js');


module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;

      //#11 Check for missing puzzle, coordinate or value
      if(!puzzle || !coordinate || !value) {
        console.log({error: 'Required field(s) missing'});
        return res.json({error: 'Required field(s) missing'});
      }

      //#9 Check for invalid characters in puzzle
      let puzzleRegex = /^[\.1-9]+$/;

      if(!puzzleRegex.test(puzzle)) {
        console.log({error: 'Invalid characters in puzzle'});
        return res.json({error: 'Invalid characters in puzzle'});
      }

      //#10 Check for 81 characters
      if(puzzle.length != 81) {
        console.log({error: 'Expected puzzle to be 81 characters long'});
        return res.json({error: 'Expected puzzle to be 81 characters long'});
      }

      //#12 Check for invalid coordinate
      let coordinateRegex = /^[A-I][1-9]$/;

      if(!coordinateRegex.test(coordinate)) {
        console.log({error: 'Invalid coordinate'});
        return res.json({error: 'Invalid coordinate'});
      }

      //#13 Check value is valid number
      let valueRegex = /^[1-9]$/;

      if(!valueRegex.test(value)) {
        console.log({error: 'Invalid value'});
        return res.json({error: 'Invalid value'});
      }

      //#6-8 Handle checking input
      // console.log(solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value));
      // console.log(solver.checkColPlacement(puzzle, row, column, value));
      // console.log(solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value));
      // console.log(solver.checkExisting(puzzle, coordinate[0], coordinate[1], value));

      let row = coordinate[0].charCodeAt(0) - 65;
      let column = parseInt(coordinate[1]) - 1;
      let val = parseInt(value);

      let checkRow = solver.checkRowPlacement(puzzle, row, column, val);
      let checkCol = solver.checkColPlacement(puzzle, row, column, val);
      let checkReg = solver.checkRegionPlacement(puzzle, row, column, val);
      let checkExisting = solver.checkExistingPlacement(puzzle, row, column, val);

      let returnObj = {valid: false};

      if(checkRow && checkCol && checkReg) {
        returnObj.valid = true;
      }
      // else if(checkExisting) {
      //   returnObj.valid = true;
      // }
      else {
        returnObj.conflict = [];
      }

      if(!checkRow && !checkExisting) {
        returnObj.conflict.push('row');
      }
      
      if(!checkCol && !checkExisting) {
        returnObj.conflict.push('column');
      }

      if(!checkReg && !checkExisting) {
        returnObj.conflict.push('region');
      }

      return res.json(returnObj);
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle;

      //Testing
      console.log(puzzle);
      // solver.validate(puzzle);

      //#2 Check for missing puzzle
      if(!puzzle) {
        console.log({error: 'Required field missing'});
        return res.json({error: 'Required field missing'});
      }
      
      //#3 Check for invalid characters
      let puzzleRegex = /^[\.1-9]+$/;

      if(!puzzleRegex.test(puzzle)) {
        console.log({error: 'Invalid characters in puzzle'});
        return res.json({error: 'Invalid characters in puzzle'});
      }

      //#4 Check for 81 characters
      if(puzzle.length != 81) {
        console.log({error: 'Expected puzzle to be 81 characters long'});
        return res.json({error: 'Expected puzzle to be 81 characters long'});
      }

      let solution1 = solver.solve(puzzle);
      // let solution2 = solver.solve(solution1);


      //#5 If puzzle cannot be solved
      console.log({error: 'Puzzle cannot be solved'});
      return res.json({error: 'Puzzle cannot be solved'});
    });
};

