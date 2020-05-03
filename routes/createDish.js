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
  Bucket: 'sample.makedinner',
  ACL: 'public-read',
  resize: {
    height: 350
  }
})
const upload = multer({ storage })

router.post('/', upload.single('dishFile'), (req, res, next) => {
  const fileCheck = req.file
  const dishId = uuid.v4()
  console.log(req.user)
  console.log(req.body.dishName)

  if (fileCheck === undefined) {
    db.dish
      .create({
        dishId,
        dishName: req.body.dishName,
        dishFile: null,
        dishUrl: req.body.dishUrl || '(未設定)',
        dishGenre: req.body.genre,
        dishRole: req.body.role,
        createdBy: req.user.name.id,
        updatedAt
      })
      .then(() => {
        res.redirect('/mypage')
      })
  } else {
    db.dish
      .create({
        dishId,
        dishName: req.body.dishName,
        dishFile: req.file.Location || null,
        dishUrl: req.body.dishUrl || '(未設定)',
        dishGenre: req.body.genre,
        dishRole: req.body.role,
        createdBy: req.user.id,
        updatedAt
      })
      .then(() => {
        res.redirect('/menu')
      })
  }
})

module.exports = router
