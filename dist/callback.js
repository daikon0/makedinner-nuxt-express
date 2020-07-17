"use strict";
var express = require('express');
var router = express.Router();
// storにuser情報を渡す
router.get('/', function (req, res, next) {
    res.json({ user: req.user });
});
module.exports = router;
