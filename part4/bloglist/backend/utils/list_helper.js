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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
