/**
 * Created by Andres Monroy (HyveMynd) on 10/28/14.
 */
var Oriento = require('oriento');
var Registration = require('../lib/registration');
var should = require('should');

var testUser = {
    email: 'test@test',
    firstname: 'asd',
    lastname: 'dsa',
    rate: 1
};

describe("Registration", function(){
    var db = {};
    var reg = {};

    before(function () {
        var server = Oriento({
            host: 'localhost',
            port: 2424,
            username: 'root',
            password: 'password'
        });
        db = server.use('timelord-db');
        reg = new Registration(db);
    });

    describe("a valid registration", function(){
        var regResult = {};
        before(function (done) {
            db.delete().from('User').where({email: testUser.email}).scalar().then(function () {
                reg.registerUser({email: testUser.email, firstname: testUser.firstname, lastname: testUser.lastname, rate: testUser.rate}, function (err, result) {
                    regResult = result;
                    done();
                });
            });
        });

        it("is successful", function () {
            regResult.success.should.be.true;
        });
        it("creates a user", function () {
            regResult.user.should.be.defined;
        });
        it("has a welcome message", function () {
            regResult.message.should.equal('Welcome');
        });
        it("has a user rid", function () {
            regResult.user['@rid'].should.be.defined;
        });
    });

    describe("has an invalid rate", function(){
        var regResult = {};
        before(function (done) {
            db.delete().from('User').where({email: testUser.email}).scalar().then(function () {
                reg.registerUser({email: testUser.email, firstname: testUser.firstname, lastname: testUser.lastname, rate: -1}, function (err, result) {
                    regResult = result;
                    done();
                });
            });
        });

        it("should not be successful", function () {
            regResult.success.should.be.false;
        });
        it("tells the user to input a valid rate", function () {
            regResult.message.should.equal('Rate must be a positive number');
        });
    });

    describe("the user exists", function(){
        var regResult = {};
        before(function (done) {
            db.insert().into('User').set({
                email: testUser.email,
                firstname: testUser.firstname,
                lastname: testUser.lastname,
                rate: testUser.rate
            }).scalar().then(function () {
                reg.registerUser({
                    email: testUser.email,
                    firstname: testUser.firstname,
                    lastname: testUser.lastname,
                    rate: testUser.rate
                }, function (err, result) {
                    regResult = result;
                    done();
                });
            });
        });
        it("should not be successful", function () {
            regResult.success.should.be.false;
        });
        it("tells the user the email already exists", function () {
            regResult.message.should.equal('This email already exists.');
        });
    });
});