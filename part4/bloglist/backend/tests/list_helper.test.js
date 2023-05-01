const listHelper = require('../utils/list_helper')

const { totalLikes } = listHelper

const generateBlogs = (likesArr) =>
  likesArr.map((likes) => ({
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    __v: 0,
    likes,
  }))

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when list only has one blog equals the likes of that blog', () => {
    expect(totalLikes(listWithOneBlog)).toBe(listWithOneBlog[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(generateBlogs([5, 1, 0, 2]))).toBe(8)
  })
})
