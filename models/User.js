/**
 * Created by Andres Monroy (HyveMynd) on 10/9/14.
 */

var assert = require('assert');


var User = function(args){
    assert.ok(args.email && args.firstName && args.lastName, "Email, first, and last name, and rate is required");
    var user = {};

    if (args['@rid']){
        user['@rid'] = args['@rid'];
    }
    user.firstName = args.firstName;
    user.lastName = args.lastName;
    user.email = args.email;
    user.rate = args.rate || 0;

    return user;
};

module.exports = User;