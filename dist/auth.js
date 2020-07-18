"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const router = express_1.default.Router();
const LocalStrategy = passport_local_1.default.Strategy;
const db = require('../models/index');
localAuth();
router.post('/local', passport_1.default.authenticate('local', {
    successRedirect: '/callback',
    failureRedirect: '/retry',
    session: true
}));
function localAuth() {
    handleSession();
    passport_1.default.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, done) {
        process.nextTick(() => {
            db.user
                .findOne({
                where: { username, password }
            })
                .then((user, err) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'usernameまたはpasswordが間違っています'
                    });
                }
                return done(null, user);
            });
        });
    }));
}
function handleSession() {
    passport_1.default.serializeUser(function (username, done) {
        done(null, username);
    });
    passport_1.default.deserializeUser(function (username, done) {
        done(null, { name: username });
    });
}
module.exports = router;
