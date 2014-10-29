/**
 * Created by Andres Monroy (HyveMynd) on 10/9/14.
 */

var assert = require('assert');

var InternalProject = function(args){
    var project = {};
    assert.ok(args.projectName, 'Project name must be defined');

    project['@rid'] = args['@rid'] || null;
    project.projectName = args.projectName;
    project.dateStarted = args.dateStarted || new Date();

    return project;
};

module.exports = InternalProject;