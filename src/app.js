

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routes from './routes/index.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))


app.use('/api/v1', routes)

app.use(notFound)
app.use(errorHandler)

export default app
