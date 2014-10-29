/**
 * Created by Andres Monroy (HyveMynd) on 10/9/14.
 */
var should = require('should');
var Timecard = require('../models/Timecard');

describe('Timecard', function(){
    describe('defaults', function(){
        var timecard = {};
        before(function () {
           timecard = new Timecard({timeIn: new Date(), timeOut: new Date(), user: {email:'asd'}, date: new Date()})
        });
        it('should have an in time', function () {
            timecard.timeIn.should.be.defined;
        });
        it('should have an out time', function () {
            timecard.timeOut.should.be.defined;
        });
        it("should have a user", function () {
            timecard.user.should.be.defined;
        });
        it("should have a date defined", function () {
            timecard.date.should.be.defined;
        });
    });
});