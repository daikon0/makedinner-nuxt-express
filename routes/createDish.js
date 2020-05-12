const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const updatedAt = new Date()
const multer = require('multer')
const s3Storage = require('multer-sharp-s3')
const aws = require('aws-sdk')
aws.config.update({ region: 'ap-northeast-1' })
const s3 = new aws.S3()

const db = require('../models/index')

const storage = s3Storage({
  s3,
  Bucket: 'sample.makediner',
  ACL: 'public-read',
  resize: {
    height: 350
  }
})
const upload = multer({ storage })
const dishId = uuid.v4()

router.post('/', upload.single('dishFile'), async (req, res, next) => {
  const fileCheck = req.file
  if (fileCheck === undefined) {
    await db.dish
      .create({
        dishId,
        dishName: req.body.dishName,
        dishFile: null,
        dishUrl: req.body.dishUrl,
        dishGenre: req.body.genre,
        dishRole: req.body.role,
        createdBy: req.user.name.id,
        updatedAt
      })
      .catch((err) => {
        next(err)
      })
    res.redirect('/mypage/menu')
  } else {
    await db.dish
      .create({
        dishId,
        dishName: req.body.dishName,
        dishFile: req.file.Location || null,
        dishUrl: req.body.dishUrl,
        dishGenre: req.body.genre,
        dishRole: req.body.role,
        createdBy: req.user.name.id,
        updatedAt
      })
      .catch((err) => {
        next(err)
      })

    res.redirect('/mypage/menu')
  }
})

router.post('/rakuten', async (req, res, next) => {
  await db.dish
    .create({
      dishId,
      dishName: req.body.dishName,
      dishFile: req.body.dishFile,
      dishUrl: req.body.dishUrl,
      dishGenre: req.body.dishGenre,
      dishRole: req.body.dishRole,
      createdBy: req.user.name.id,
      updatedAt
    })
    .catch((err) => {
      next(err)
    })

  res.redirect('/mypage/menu')
})

module.exports = router
