import express from 'express'
import { login, register } from '../controllers/authController.js';

const router = express.Router()

// Dang nhap
router.post('/login', login)

// Dang ky
router.post('/register',register)

export default router
