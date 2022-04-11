const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let invalidString = '0.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let solutionString = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
let longString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9........1945....4.37.4.3..6.';
let impossibleString = '1.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';


chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('1 - Solve', function() {
        test('1 - Valid Puzzle String', function(done) {
            chai.request(server)
                .post('/api/solve')
                .send({puzzle: puzzleString})
                .end(function(err, res) {
                    // console.log(res.body.solution);
                    assert.equal(res.body.solution, solutionString);
                    done();
                });
        });
        test('2 - Missing Puzzle String', function(done) {
            chai.request(server)
                .post('/api/solve')
                .send({puzzle: ''})
                .end(function(err, res) {
                    // console.log(res.body);
                    assert.equal(res.body.error, 'Required field missing');
                    done();
                });
        });
        test('3 - Invalid characters in Puzzle String', function(done) {
            chai.request(server)
                .post('/api/solve')
                .send({puzzle: invalidString})
                .end(function(err, res) {
                    assert.equal(res.body.error, 'Invalid characters in puzzle');
                    done();
                });
        });
        test('4 - Incorrect length of Puzzle String', function(done) {
            chai.request(server)
                .post('/api/solve')
                .send({puzzle: longString})
                .end(function(err, res) {
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                    done();
                });
        });
        test('5 - Invalid characters in Puzzle String', function(done) {
            chai.request(server)
                .post('/api/solve')
                .send({puzzle: invalidString})
                .end(function(err, res) {
                    assert.equal(res.body.error, 'Invalid characters in puzzle');
                    done();
                });
        });
    });
    suite('2 - Check', function() {
        test('6 - Puzzle placement with all fields', function(done) {
            chai.request(server)
                .post('/api/check')
                .send({puzzle: puzzleString, coordinate: 'A3', value: '9'})
                .end(function(err, res) {
                    // console.log(res.body);
                    assert.equal(res.body.valid, true);
                    done();
                });
        });
        test('7 - Puzzle placement with single placement conflict', function(done) {
            chai.request(server)
                .post('/api/check')
                .send({puzzle: puzzleString, coordinate: 'A1', value: '2'})
                .end(function(err, res) {
                    assert.equal(res.body.valid, false);
                    assert.equal(res.body.conflict.length, 1);
                    done();
                });
        });
        test('8 - Puzzle placement with multiple placement conflicts', function(done) {
            chai.request(server)
                .post('/api/check')
                .send({puzzle: puzzleString, coordinate: 'A1', value: '1'})
                .end(function(err, res) {
                    assert.equal(res.body.valid, false);
                    assert.equal(res.body.conflict.length, 2);
                    done();
                });
        });
        test('9 - Puzzle placement with all placement conflicts', function(done) {
            chai.request(server)
                .post('/api/check')
                .send({puzzle: puzzleString, coordinate: 'B2', value: '2'}) 
                .end(function(err, res) {
                    assert.equal(res.body.valid, false);
                    assert.equal(res.body.conflict.length, 3);
                    done();
                });
        });
        test('10 - Missing required fields', function(done) {
            chai.request(server)
                .post('/api/check')
                .send({puzzle: puzzleString, coordinate: 'A1', value: ''}) 
                .end(function(err, res) {
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });
        test('11 - Invalid characters', function(done) {
            chai.request(server)
                .post('/api/check')
                .send({puzzle: invalidString, coordinate: 'A1', value: '1'})
                .end(function(err, res) {
                    assert.equal(res.body.error, 'Invalid characters in puzzle');
                    done();
                });
        });
        test('12 - Incorrect length', function(done) {
            chai.request(server)
                .post('/api/check')
                .send({puzzle: longString, coordinate: 'A1', value: '1'})
                .end(function(err, res) {
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                    done();
                });
        });
        test('13 - Invalid placement coordinate', function(done) {
            chai.request(server)
                .post('/api/check')
                .send({puzzle: puzzleString, coordinate: 'S1', value: '1'})
                .end(function(err, res) {
                    assert.equal(res.body.error, 'Invalid coordinate');
                    done();
                });
        });
        test('14 - Invalid placement value', function(done) {
            chai.request(server)
                .post('/api/check')
                .send({puzzle: puzzleString, coordinate: 'A1', value: '0'})
                .end(function(err, res) {
                    assert.equal(res.body.error, 'Invalid value');
                    done();
                });
        });
    });
});

