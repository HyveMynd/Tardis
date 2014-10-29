/**
 * Created by Andres Monroy (HyveMynd) on 10/9/14.
 */

var assert = require('assert');

var Timecard = function(args){
    var timecard = {};
    assert.ok(args.timeIn && args.timeOut && args.belongsTo, 'Time in, time out, date, and belongsTo must be defined');

    timecard['@rid'] = args['@rid'] || null;
    timecard.timeIn = args.timeIn;
    timecard.timeOut = args.timeOut;
    timecard.belongsTo = args.belongsTo;

    return timecard;
};

module.exports = Timecard;