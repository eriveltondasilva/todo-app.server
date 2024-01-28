import { Router } from 'express'
import ControllerFactory from '../app/factories/controllerFactory'
import AuthController from '../controllers/auth'
import UserModel from '../models/user'

// ------------------------------------
//# Instances
const router = Router()
const authController = ControllerFactory.create(AuthController, UserModel)

// ------------------------------------
//# Auth Controller Methods
const { signup, login, logout } = authController

// ------------------------------------
//# Middlewares

// ------------------------------------
//# Auth Routes
router.post('/signup', signup)

router.post('/login', login)

router.post('/logout', logout)

// ------------------------------------
export default router
