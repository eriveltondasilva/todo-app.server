import { Router } from 'express'

import AuthController from '@/controllers/auth.controller'
import UserModel from '@/models/user.model'
import ResponseService from '@/services/response.service'
import prisma from '@/singletons/prisma'
import authValidation from '@/validations/auth.validator'

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
