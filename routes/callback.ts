// const express = require('express')
import express, { Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from "./aaaa"
const router = express.Router()

// storにuser情報を渡す
router.get('/', (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  res.json({ user: req.user })
})

module.exports = router
