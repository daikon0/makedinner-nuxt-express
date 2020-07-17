"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
// storにuser情報を渡す
router.get('/', function (req, res, next) {
    res.json({ user: req.user });
});
module.exports = router;
