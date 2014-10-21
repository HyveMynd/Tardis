/**
 * Created by Andres Monroy (HyveMynd) on 10/9/14.
 */
var User = require('../models/User');
var should = require('should');

describe('User', function(){
    describe('default user', function(){
        var user = {};

        before(function () {
            user = new User({email: 'asd@asd.com', firstName: 'asd', lastName: 'dsa'});
        });

        it('has an email', function () {
            user.email.should.equal('asd@asd.com');
        });
        it('has a first name', function () {
            user.firstName.should.equal('asd');
        });
        it('has a last name', function () {
            user.lastName.should.equal('dsa');
        });
        it('has a defined rate', function () {
            user.rate.should.be.defined;
        });
    });
});