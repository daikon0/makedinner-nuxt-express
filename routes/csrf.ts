import express, { Request, Response, NextFunction } from 'express'
import csrf from 'csurf'

const router = express.Router()
const csrfProtection = csrf({ cookie: true })

router.get('/', csrfProtection, (req: Request, res: Response, next: NextFunction) => {
  res.send(req.csrfToken())
})

module.exports = router
