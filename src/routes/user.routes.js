import express from 'express'
import * as userController from '../controllers/user.controller.js'
import { AppError } from '../utils/AppError.js'

const router = express.Router()

const validateBody = (requiredFields) => (req, res, next) => {
  const missing = requiredFields.filter((field) => !req.body[field])
  if (missing.length > 0) {
    return next(new AppError(`Missing required fields: ${missing.join(', ')}`, 400))
  }
  next()
}

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/', validateBody(['name', 'email']), userController.createUser)
router.put('/:id', validateBody(['name', 'email']), userController.updateUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router
