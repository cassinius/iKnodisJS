/// <reference path="../typings/tsd.d.ts" />

var expect = require('chai').expect;
require('../src/Helper.js');
require('../src/Matrix.js');

var M2D = Matrix.Matrix2D;

describe("Simple Matrix Tests", function() {
    it("Should construct a matrix of correct proportions", function() {
        var d1 = 5,
            d2 = 4;
        var m = new M2D(d1, d2);
        expect(m.length()).to.equal(20);
        var dim_result = JSON.stringify(m.dim());
        var dim_expect = JSON.stringify({d1: 5, d2: 4});
        expect(dim_result).to.equal(dim_expect);
        expect(m.length()).to.equal(d1 * d2);
    });

    it("Should set the right internal array", function() {
        var m = new M2D(3,3,0);
        var arr_expect = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        expect(JSON.stringify(m.getArray())).to.equal(JSON.stringify(arr_expect));
    });

    it("Should correctly copy a matrix", function() {
        var source: Matrix.Matrix2D = new M2D(15, 7, 44);
        var dest: Matrix.Matrix2D = M2D.copyMatrix(source);
        var expected = JSON.stringify(source);
        var result = JSON.stringify(dest);
//        console.log(expected);
//        console.log(result);
        expect(result).to.equal(expected);
    });

    it("Should get and set correct values", function() {
        var d1 = 5,
            d2 = 4,
            fill = 55;
        var m = new M2D(d1, d2,fill);
        for( var i = 0; i < d1; ++i ) {
            for( var j = 0; j < d2; ++j ) {
                expect(m.get(i,j)).to.equal(fill);
            }
        }
        m.set(2,2,22);
        expect(m.get(2,2)).to.equal(22);
    });

    it("Should correctly add two matrices", function() {
        var m1:Matrix.Matrix2D = new M2D(3,3,2);
        var m2:Matrix.Matrix2D = new M2D(3,3,3);
        var add_expect = new M2D(3,3,5);
        var add_result = m1.add(m2);
        expect( JSON.stringify(add_expect.getArray()) ).to.equal( JSON.stringify(add_result.getArray()) );
    });

    it("Should correctly subtract two matrices", function() {
        var m1 = new M2D(3,3,5);
        var m2 = new M2D(3,3,3);
        var sub_expect = new M2D(3,3,2);
        var sub_result = m1.sub(m2);
        expect( JSON.stringify(sub_expect.getArray()) ).to.equal( JSON.stringify(sub_result.getArray()) );
    });

    it("Should be able to correctly instantiate a matrix given an array and dimensions", function() {
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var m: Matrix.Matrix2D = M2D.generateMatrix(arr, 3, 3);

        // Check for correct dimensions
        var dim_expect = {d1: 3, d2: 3};
        var dim_result = m.dim();
        expect( JSON.stringify(dim_expect) ).to.equal( JSON.stringify(dim_result) );
    });

    it("Should correctly multiply two quadratic matrices", function() {
        var arr1 = [1, 2, 3, 4];
        var arr2 = [5, 6, 7, 8];
        var m1 = M2D.generateMatrix(arr1, 2, 2);
        var m2 = M2D.generateMatrix(arr2, 2, 2);
        var prod_expect = [19, 22, 43, 50];
        var prod_result = m1.mult(m2).getArray();
        expect(JSON.stringify(prod_expect)).to.be.equal(JSON.stringify(prod_result));
    });

    it("Should correctly multiply two matrices giving a quadratic result", function() {
        var arr1 = [1, 2, 3, 4, 1, 0];
        var arr2 = [0, 3, 1, 5, 2, 6];
        var m1 = M2D.generateMatrix(arr1, 3, 2);
        var m2 = M2D.generateMatrix(arr2, 2, 3);
        var prod_expect = [8, 31, 1, 17];
        var prod_result = m1.mult(m2).getArray();
        expect(JSON.stringify(prod_expect)).to.be.equal(JSON.stringify(prod_result));
    });


    it("Should correctly multiply two matrices giving a non-quadratic result", function() {
        var m1 = new M2D(7, 15, 4);
        var m2 = new M2D(10, 7, 7);
        var prod_result = m1.mult(m2).getArray();

        expect(prod_result.length).to.equal(150);
        for (var k = 0; k < prod_result.length; k++) {
            expect(prod_result[k]).to.equal(196);
        }
    });


    it("Should correctly compute uniform 4-neighbors (without color diff)", function () {
        var matrix = new M2D(7, 15, 4);
        var neighbors1 = matrix.getNeighbors4(1, 1);
        expect(neighbors1.length).to.equal(4);
        for (var k = 0; k < neighbors1.length; k++) {
            expect(neighbors1[k][2]).to.equal(4);
        }
    });


    it("Should correctly compute 4-neighbors (without color diff)", function () {
        var arr0 = [0,1,2,3,4,5];
        var m0 = M2D.generateMatrix(arr0, 3, 2);
        var neighbors0 = m0.getNeighbors4(1, 0);

        expect(neighbors0.length).to.equal(3);

        expect(neighbors0[0][2]).to.equal(0);
        expect(neighbors0[1][2]).to.equal(2);
        expect(neighbors0[2][2]).to.equal(4);
    });


    it("Should correctly compute uniform 4-neighbors (color diff)", function () {
        var matrix = new M2D(7, 15, 4);
        var neighbors1 = matrix.getNeighbors4(1, 1, true);
        expect(neighbors1.length).to.equal(4);
        for (var k = 0; k < neighbors1.length; k++) {
            expect(neighbors1[k][2]).to.equal(0);
        }
    });


    it("Should correctly compute 4-neighbors (color diff)", function () {
        var arr0 = [0,1,2,3,4,5];
        var m0 = M2D.generateMatrix(arr0, 3, 2);
        var neighbors0 = m0.getNeighbors4(1, 0, true);

        expect(neighbors0.length).to.equal(3);

        expect(neighbors0[0][2]).to.equal(1);
        expect(neighbors0[1][2]).to.equal(1);
        expect(neighbors0[2][2]).to.equal(3);
    });


    it("Should correctly compute 4-neighbors, upper right corner (color diff)", function () {
        var arr0 = [0,1,2,3,4,5];
        var m0 = M2D.generateMatrix(arr0, 3, 2);
        var neighbors0 = m0.getNeighbors4(0, 0);

        expect(neighbors0.length).to.equal(2);

        expect(neighbors0[0][2]).to.equal(1);
        expect(neighbors0[1][2]).to.equal(3);
    });


    it("Should correctly compute 4-neighbors, lower right corner (color diff)", function () {
        var arr0 = [0,1,2,3,4,5];
        var m0 = M2D.generateMatrix(arr0, 3, 2);
        var neighbors0 = m0.getNeighbors4(2, 1);

        expect(neighbors0.length).to.equal(2);

        expect(neighbors0[0][2]).to.equal(4);
        expect(neighbors0[1][2]).to.equal(2);
    });


    it("Should correctly determine 8-neighbors (without color diff)", function () {
        var arr0 = [0,1,2,3,4,5];
        var m0 = M2D.generateMatrix(arr0, 3, 2);
        var m1 = new M2D(7, 15, 4);

        var neighbors0 = m0.getNeighbors8(1, 0);
        var neighbors1 = m1.getNeighbors8(1, 1);

        expect(neighbors0.length).to.equal(5);
        expect(neighbors0[0][2]).to.equal(0);
        expect(neighbors0[1][2]).to.equal(3);
        expect(neighbors0[2][2]).to.equal(4);
        expect(neighbors0[3][2]).to.equal(2);
        expect(neighbors0[4][2]).to.equal(5);

        expect(neighbors1.length).to.equal(8);
        for (var k = 0; k < neighbors1.length; k++) {
            expect(neighbors1[k][2]).to.equal(4);
        }

    });


    it("Should correctly determine 8-neighbors (color diff)", function () {
        var arr0 = [0,1,2,3,4,5];
        var m0 = M2D.generateMatrix(arr0, 3, 2);
        var neighbors2 = m0.getNeighbors8(1, 0, true);

        expect(neighbors2.length).to.equal(5);
        expect(neighbors2[0][2]).to.equal(1);
        expect(neighbors2[1][2]).to.equal(2);
        expect(neighbors2[2][2]).to.equal(3);
        expect(neighbors2[3][2]).to.equal(1);
        expect(neighbors2[4][2]).to.equal(4);
    });


});
