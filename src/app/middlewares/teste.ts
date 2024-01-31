import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

// =====================================
function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1]

  if (token == null) {
    res.sendStatus(400).send('Token not present')
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).send('Token invalid')
    } else {
      req.user = user
      next() //proceed to the next action in the calling function
    }
  })
}
