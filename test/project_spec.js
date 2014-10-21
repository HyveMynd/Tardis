/**
 * Created by Andres Monroy (HyveMynd) on 10/9/14.
 */

var should = require('should');
var InternalProject = require('../models/InternalProject');
var ClientProject = require('../models/ClientProject');

describe('Client Project', function(){
    describe('defaults', function(){
        var project = {};

        before(function () {
            project = new ClientProject({projectName: 'dsa', clientName: 'sda'});
        });

        it('should have the same project name', function () {
            project.projectName.should.equal('dsa');
        });
        it('should have the same client name', function () {
            project.clientName.should.equal('sda');
        });
        it('should have a start date defined', function () {
            project.dateStarted.should.be.defined;
        });
    });
});

describe('Internal Project', function(){
    describe('defaults', function(){
        var project = {};
        before(function () {
            project = new InternalProject({projectName: 'ads'});
        });

        it('should have the same project name', function () {
            project.projectName.should.equal('ads');
        });
        it('should have a start date defined', function () {
            project.dateStarted.should.be.defined;
        });
    });
});