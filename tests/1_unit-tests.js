const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let invalidString = '0.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let solutionString = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
let impossibleString = '1.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

suite('UnitTests', () => {
    suite('1 - Puzzle String', function() {
        test('1 - Handles 81 Character Strings', function() {
            assert.equal(solver.validate(puzzleString), true);
        });
        test('2 - Invalid Characters', function() {
            let message = 'Invalid characters in puzzle';
            assert.equal(solver.validate(invalidString).error, message);
        });
        test('3 - Handles non 81 Character Strings', function() {
            let message = 'Expected puzzle to be 81 characters long';
            assert.equal(solver.validate(puzzleString + '1').error, message);    
        });
    });
    suite('2 - Placement', function() {
        test('4 - Handles valid row placement', function() {
            assert.equal(solver.checkRowPlacement(puzzleString,0,0,2), true);
        });
        test('5 - Handles invalid row placement', function() {
            assert.equal(solver.checkRowPlacement(puzzleString,0,0,1), false);
        });
        test('6 - Handles valid column placement', function() {
            assert.equal(solver.checkColPlacement(puzzleString,0,0,2), true);
        });
        test('7 - Handles invalid column placement', function() {
            assert.equal(solver.checkColPlacement(puzzleString,0,0,1), false);
        });
        test('8 - Handles valid region placement', function() {
            assert.equal(solver.checkRegionPlacement(puzzleString,0,0,1), true);
        });
        test('9 - Handles invalid region placement', function() {
            assert.equal(solver.checkRegionPlacement(puzzleString,0,0,2), false);
        });
    });
    suite('3 - Solved', function() {
        test('10 - Valid puzzle string pass the solver', function() {
            assert.equal(solver.solve(puzzleString, 1), solutionString);
        });
        test('11 - Invalid puzzle string fail the solver', function() {
            let message = 'Expected puzzle to be 81 characters long';
            assert.equal(solver.solve('123', 1).error, message);
        });
        test('12 - Solver returns the expected solution for an incomplete puzzle', function() {
            let message = 'Puzzle cannot be solved';
            assert.equal(solver.solve(impossibleString).error, message);
        });
    });
});
