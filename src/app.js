import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routes/index.js'
import { AppError } from './utils/AppError.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

// Mount all routes
app.use('/api/v1', routes)

// 404 handler
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404))
})

// Global error handler - MUST be last with 4 parameters
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.isOperational ? err.message : 'Internal Server Error'

  if (process.env.NODE_ENV === 'development') {
    console.error('ERROR:', err)
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

export default app
