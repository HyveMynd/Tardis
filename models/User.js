/**
 * Created by Andres Monroy (HyveMynd) on 10/9/14.
 */

var assert = require('assert');

var User = function(args){
    assert.ok(args.email && args.firstname && args.lastname && args.rate, "Email, first, and last name, and rate is required");
    var user = {};

    if (args['@rid']){
        user['@rid'] = args['@rid'];
    }
    user.firstname = args.firstname;
    user.lastname = args.lastname;
    user.email = args.email;
    user.rate = args.rate;

    return user;
};

module.exports = User;