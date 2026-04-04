import express from 'express'
import * as postController from '../controllers/post.controller.js'
import { AppError } from '../utils/AppError.js'

const router = express.Router()

const validateBody = (requiredFields) => (req, res, next) => {
  const missing = requiredFields.filter((field) => !req.body[field])
  if (missing.length > 0) {
    return next(new AppError(`Missing required fields: ${missing.join(', ')}`, 400))
  }
  next()
}

router.get('/', postController.getAllPosts)
router.get('/:id', postController.getPostById)
router.post('/', validateBody(['title', 'content', 'authorId']), postController.createPost)
router.put('/:id', validateBody(['title', 'content']), postController.updatePost)
router.patch('/:id', postController.updatePost)
router.patch('/:id/publish', postController.publishPost)
router.delete('/:id', postController.deletePost)

export default router
