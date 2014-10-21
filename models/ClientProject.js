/**
 * Created by Andres Monroy (HyveMynd) on 10/9/14.
 */

var assert = require('assert');

var ClientProject = function(args){
    var project = {};
    assert.ok(args.projectName && args.clientName, "Project and client name must be defined");

    project.projectName = args.projectName;
    project.clientName = args.clientName;
    project.dateStarted = args.dateStarted || new Date();

    return project;
};

module.exports = ClientProject;