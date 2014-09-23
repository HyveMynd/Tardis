/**
 * Created by Andres Monroy (HyveMynd) on 9/22/14.
 */
var passport = require('passport');
var express = require('express');
var router = express.Router();
var Membership = require('kumoplay-membership');

var redirects = {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false
};

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err){ return next(err); }
        if (!user){ return res.status(401).send(info); }
        req.login(user, function (err) {
            if (err){
                return next(err);
            }
            return res.send(user);
        })
    })(req, res, next);
});

router.post('/register', function (req, res, next) {
    var membership = new Membership('membership');
    var user = req.body;
    membership.register(user.email, user.password, user.confirm, function (err, regResult) {
        if (err){
            return next(err);
        }
        if (!regResult.success){
            return res.status(401).send(regResult);
        }
        req.login(regResult.user, function (err) {
            if (err){
                return next(err);
            }
            return res.send(regResult.user);
        })
    })
});

module.exports = router;