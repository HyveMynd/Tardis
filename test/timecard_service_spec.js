/**
 * Created by Andres Monroy (HyveMynd) on 10/29/14.
 */
var TimecardService = require('../lib/TimecardService');
var User = require('../models/User');
var Oriento = require('oriento');

var testUser = {
    email: 'test@test',
    firstname: 'asd',
    lastname: 'dsa',
    rate: 1
};

describe("Timecard Service", function(){
    var tcService = {};
    var user = {};

    before(function (done) {
        var server = Oriento({
            host: 'localhost',
            port: 2424,
            username: 'root',
            password: 'password'
        });
        var db = server.use('timelord-db');
        tcService = new TimecardService(db);
        db.select().from('User').where({email: testUser.email}).one().then(function (result) {
            if (!result){
                db.insert().into('User').set(testUser).one().then(function (result) {
                    user = new User(result);
                    done();
                });
            } else {
                user = new User(result);
                done();
            }
        });
    });

    describe("register a timecard", function(){
        var tcResult = {};

        before(function (done) {
            tcService.registerTimecard({timeIn: new Date(), timeOut: new Date(), user: user}, function (err, result) {
                tcResult = result;
                done();
            });
        });

        it("should be successful", function () {
            tcResult.success.should.be.true;
        });
        it("has a timecard defined", function () {
            tcResult.timecard.should.be.defined;
        });
        it("has a timecard rid", function () {
            tcResult.timecard['@rid'].should.not.be.null;
        });
        it("has a timeIn", function () {
            tcResult.timecard.timeIn.should.be.defined;
        });
        it("has a timeOut", function () {
            tcResult.timecard.timeOut.should.be.defined;
        });
        it("belong to a user", function () {
            tcResult.timecard.belongsTo.should.be.defined;
        });
    });

    describe("missing a user", function(){
        var tcResult = {};

        before(function (done) {
            tcService.registerTimecard({timeIn: new Date(), timeOut: new Date()}, function (err, result) {
                tcResult = result;
                done();
            });
        });

        it("should not be successful", function () {
            tcResult.success.should.be.false;
        });
        it("has a message for a missing user", function () {
            tcResult.message.should.equal('User must have an email.');
        });
    });

    describe("missing timeIn or timeOut", function(){
        var tcResult = {};

        before(function (done) {
            tcService.registerTimecard({timeIn: new Date(), user: user}, function (err, result) {
                tcResult = result;
                done();
            });
        });

        it("should not be successful", function () {
            tcResult.success.should.be.false;
        });
        it("has a message for a missing time", function () {
            tcResult.message.should.equal('Must have a time in and time out');
        });
    });

    describe("invalid user", function(){
        var tcResult = {};

        before(function (done) {
            user.email = 'test2';
            tcService.registerTimecard({timeIn: new Date(), timeOut: new Date(), user: user}, function (err, result) {
                tcResult = result;
                done();
            });
        });

        it("should not be successful", function () {
            tcResult.success.should.be.false;
        });
        it("has a message for a non-existent user", function () {
            tcResult.message.should.equal('User must exist');
        });
    });

});