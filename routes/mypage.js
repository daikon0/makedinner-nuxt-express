const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../models/index')
const jsonParser = bodyParser.json()

// user情報取得
router.get('/user', (req, res) => {
  if (req.user) {
    res.send(req.user)
  } else {
    res.redirect('/signin')
  }
})

// メニュー一覧表示
router.get('/menu', async (req, res, next) => {
  const dish = await db.dish
    .findAll({
      where: { createdBy: req.user.name.id },
      order: [['"updatedAt"', 'DESC']]
    })
    .catch((err) => {
      next(err)
    })
  res.send(dish)
})

// 料理の画面表示
router.get('/menu/:dishId', async (req, res, next) => {
  const dish = await db.dish
    .findOne({
      where: { dishId: req.params.dishId }
    })
    .catch((err) => {
      next(err)
    })
  res.send(dish)
})

// 料理の編集
router.post('/menu/:dishId/edit', jsonParser, async (req, res, next) => {
  const dish = await db.dish
    .findOne({
      where: { dishId: req.params.dishId }
    })
    .catch((err) => {
      next(err)
    })
  dish
    .update({
      dishName: req.body.dishName,
      dishUrl: req.body.dishUrl
    })
    .catch((err) => {
      next(err)
    })
  res.redirect('/mypage/menu')
})

// 料理の削除
router.post('/menu/:dishId/delete', async (req, res, next) => {
  await deleteDish(req.params.dishId).catch((err) => {
    next(err)
  })
  res.redirect('/mypage/menu')
})

async function deleteDish(dishId, done, err) {
  const dish = await db.dish.findAll({
    where: { dishId }
  })
  const promises = dish.map((d) => {
    return d.destroy()
  })
  return Promise.all(promises)
}

router.get('/selectGenre', async (req, res, next) => {
  const genre = req.query.genre
  const maindish = await selectDish(req, genre, 'main')
  const subdish = await selectDish(req, genre, 'sub')
  const soup = await selectDish(req, genre, 'soup')
  const dish = {
    main: maindish,
    sub: subdish,
    soup
  }
  res.send(dish)
})

async function selectDish(req, genre, role) {
  const dish = await db.dish.findAll({
    where: {
      dishGenre: genre,
      createdBy: req.user.name.id,
      dishRole: role
    }
  })
  const dishArray = []
  dish.forEach((dish) => {
    dishArray.push(dish)
  })
  return romdomDish(dishArray)
}

function romdomDish(dishArray) {
  return dishArray[Math.floor(Math.random() * dishArray.length)]
}

module.exports = router
