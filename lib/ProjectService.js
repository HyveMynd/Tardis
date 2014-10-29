/**
 * Created by Andres Monroy (HyveMynd) on 10/29/14.
 */
var events = require('events');
var util = require('util');

var ProjectService = function() {
    var self = this;
    events.EventEmitter.call(self);

    return self;
};

util.inherits(ProjectService, events.EventEmitter);
module.exports = ProjectService;