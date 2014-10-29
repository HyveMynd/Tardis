/**
 * Created by Andres Monroy (HyveMynd) on 10/28/14.
 */
var assert = require('assert');

var Hours = function(args){
    assert.ok(args.user && args.timecard && args.hours && args.project, "Must have a user, timecard, project, and hours defined");
    var hours = {};

    hours.user = args.user;
    hours.timecard = args.timecard;
    hours.hours = args.hours;
    hours.project = args.project;

    return hours;
};

module.exports = Hours;