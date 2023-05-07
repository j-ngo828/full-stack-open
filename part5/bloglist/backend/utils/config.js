require('dotenv').config()

const { PORT, NODE_ENV, TEST_MONGODB_URI, MONGODB_URI: DEV_MONGODB_URI } = process.env

const MONGODB_URI = NODE_ENV === 'test' ? TEST_MONGODB_URI : DEV_MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
}
