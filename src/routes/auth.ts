import { Router } from 'express'

// ------------------------------------
//# Instances
const router = Router()

// ------------------------------------
//# Auth Controller Methods

// ------------------------------------
//# Middlewares

// ------------------------------------
//# Auth Routes
router.post('/auth/login', authController.login)

router.post('/auth/register', authController.register)

router.post('/auth/logout', authController.logout)

// ------------------------------------
export default router
