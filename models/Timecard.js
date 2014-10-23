/**
 * Created by Andres Monroy (HyveMynd) on 10/9/14.
 */

var assert = require('assert');

var Timecard = function(args){
    var timecard = {};
    assert.ok(args.timeIn && args.timeOut && args.date && args.user, 'Time in, time out, date, and user must be defined');

    timecard.timeIn = args.timeIn;
    timecard.timeOut = args.timeOut;
    timecard.date = args.date;
    timecard.user = args.user;

    return timecard;
};

module.exports = Timecard;