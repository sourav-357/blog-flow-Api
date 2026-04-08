

import express from 'express'
import userRoutes from './user.routes.js'
import postRoutes from './post.routes.js'


const router = express.Router()


router.use('/users', userRoutes)
router.use('/posts', postRoutes)


router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is healthy'
  })
})


export default router

