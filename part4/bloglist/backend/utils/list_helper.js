const lowDash = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
  const listIsEmpty = blogs.length === 0
  if (listIsEmpty) {
    return null
  }
  return blogs.reduce((highestLikedBlog, blog) =>
    blog.likes > highestLikedBlog.likes ? blog : highestLikedBlog
  )
}

const mostBlogs = (blogs) => {
  const listIsEmpty = blogs.length === 0
  if (listIsEmpty) {
    return null
  }
  const reducerFunc = (mapSoFar, blog) => {
    if (lowDash.isEqual(mapSoFar, {})) {
      return {
        [blog.author]: 1,
      }
    }
    return {
      ...mapSoFar,
      [blog.author]: lowDash.isNil(mapSoFar[blog.author]) ? 1 : mapSoFar[blog.author] + 1,
    }
  }
  const authorsMap = blogs.reduce(reducerFunc, {})
  return lowDash.reduce(
    authorsMap,
    (result, value, key) => {
      if (lowDash.isEqual(result, {})) {
        return {
          author: key,
          blogs: value,
        }
      }
      return value > result.blogs
        ? {
            author: key,
            blogs: value,
          }
        : result
    },
    {}
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
