

import 'dotenv/config.js'
import app from './src/app.js'
import { PORT } from './src/config/config.js'


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
})


process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err.message)
  process.exit(1)
})

