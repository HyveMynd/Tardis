/**
 * Created by Andres Monroy (HyveMynd) on 10/29/14.
 */
var events = require('events');
var util = require('util');
var ProjectApplication = require('../models/ProjectApplication');

var ProjectService = function(){

    var self = this;
    events.EventEmitter.call(self);

    var validateInput = function (app) {

    };

    var checkIfProjectExists = function (app) {

    };

    var createProjectInDb = function (app) {

    };

    var createLog = function (app) {

    };

    self.createProject = function (args, next) {

    };

    return self;
};

util.inherits(ProjectService, events.EventEmitter);
module.exports = ProjectService;