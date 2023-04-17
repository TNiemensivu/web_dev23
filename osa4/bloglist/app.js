const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const url = config.MONGODB_URI
logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

morgan.token('body', function (req) { return JSON.stringify(req.body) })

app.use(bodyParser.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)
app.use(middleware.tokenExtractor)
app.use(middleware.tokenValidator)

const PORT = config.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})