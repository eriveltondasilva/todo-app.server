import { Router } from 'express'

import AuthController from '@/controllers/authController'
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
//# Auth Controller Methods
const { signup, login } = authController

// ------------------------------------
//# Middlewares

// ------------------------------------
//# Auth Routes
router.post('/auth/signup', signup)
router.post('/auth/login', login)
// router.post('/auth/logout', logout)

// ------------------------------------
export default router
