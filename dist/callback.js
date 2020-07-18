"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// storにuser情報を渡す
router.get('/', (req, res, next) => {
    res.json({ user: req.user });
});
module.exports = router;
