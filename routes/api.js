'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

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
      // console.log(solver.checkColPlacement(puzzle, coordinate[0], coordinate[1], value));
      console.log(solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value));
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

      //#5 If puzzle cannot be solved
      console.log({error: 'Puzzle cannot be solved'});
      return res.json({error: 'Puzzle cannot be solved'});
    });
};

