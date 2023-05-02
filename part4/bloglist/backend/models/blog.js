const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    /* eslint-disable no-underscore-dangle */
    const updatedObject = {
      ...returnedObject,
      id: returnedObject._id.toString(),
    }
    delete updatedObject.__v
    delete updatedObject._id
    /* eslint-enable no-underscore-dangle */
    return updatedObject
  },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
