/**
 * Created by Andres Monroy (HyveMynd) on 10/28/14.
 */

var events = require('events');
var util = require('util');

var HourTracking = function() {
    var self = this;
    events.EventEmitter.call(self);

    // CREATE EVENT
    // validate inputs
    // check if user exists
    // check if project exists
    // check if timecard exists
    // create edge from user to timecard
    // create edge from project to timecard
    // create edge from project to user if it does not exist
    // create log

    // EDIT EVENT
    // validate inputs
    // check if edge exists between timecard and project
    // edit edge
    // create log

    return self;
};

util.inherits(HourTracking, events.EventEmitter);
module.exports = HourTracking;