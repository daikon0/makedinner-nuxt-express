import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
