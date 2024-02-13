import { Router } from 'express'

import AuthController from '@/controllers/auth.controller'
import authValidation from '@/middlewares/validations/authValidation'
import UserModel from '@/models/user.model'
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
router.post('/auth/register', authValidation.register, authController.register)
router.post('/auth/login', authValidation.login, authController.login)
router.post('/auth/logout', authController.logout)
router.post('/auth/refresh-token', authController.refresh)

// TODO: remova a rota abaixo
router.get('/auth/teste', (_, res) => {
  res.send('teste de rota auth!')
})

// ------------------------------------
export default router
