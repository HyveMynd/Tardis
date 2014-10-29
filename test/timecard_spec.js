/**
 * Created by Andres Monroy (HyveMynd) on 10/9/14.
 */
var Timecard = require('../models/Timecard');

describe('Timecard', function(){
    describe('defaults', function(){
        var timecard = {};
        before(function () {
           timecard = new Timecard({timeIn: new Date(), timeOut: new Date(), belongsTo: {email:'asd'}, date: new Date()})
        });
        it('should have an in time', function () {
            timecard.timeIn.should.be.defined;
        });
        it('should have an out time', function () {
            timecard.timeOut.should.be.defined;
        });
        it("should have a belongsTo", function () {
            timecard.belongsTo.should.be.defined;
        });
    });
});