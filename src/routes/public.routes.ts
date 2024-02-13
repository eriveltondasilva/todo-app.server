import { Router, type Request, type Response } from 'express'

// ====================================
const router = Router()

router.get('/', (_: Request, res: Response) => {
  res.send('Hello World!')
})

// ------------------------------------
export default router
