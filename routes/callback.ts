// const express = require('express')
import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()

// storにuser情報を渡す
router.get('/', (req: any, res: Response, next: NextFunction) => {
  res.json({ user: req.user })
})

module.exports = router
