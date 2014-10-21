/**
 * Created by Andres Monroy (HyveMynd) on 10/9/14.
 */

var assert = require('assert');

var Timecard = function(args){
    var timecard = {};
    assert.ok(args.timeIn && args.timeOut, 'Time in, time out, and user must be defined');

    timecard.timeIn = args.timeIn;
    timecard.timeOut = args.timeOut;

    return timecard;
};

module.exports = Timecard;