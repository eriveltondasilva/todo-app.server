import { Router } from 'express'

import AuthController from '@/controllers/authController'
import isAuthenticated from '@/middlewares/isAuthenticated'
import authValidation from '@/middlewares/validations/authValidation'
import UserModel from '@/models/userModel'
import ResponseService from '@/services/response'
import prisma from '@/singletons/prisma'

// ------------------------------------
//# Instances
const router = Router()

const response = new ResponseService()
const userModel = new UserModel(prisma)
const authController = new AuthController(response, userModel)

// ------------------------------------
//# Middlewares
// router.use()

// ------------------------------------
//# Auth Routes
router.post('/auth/signup', authValidation.signup, authController.signup)
router.post('/auth/login', authValidation.login, authController.login)
router.post('/auth/refresh-token', authController.refresh)
router.post('/auth/logout', isAuthenticated, authController.logout)
//
router.get('/auth/teste', (_, res) => {
  res.send('teste de rota auth!')
})

// ------------------------------------
export default router
