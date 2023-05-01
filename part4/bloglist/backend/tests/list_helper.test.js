const listHelper = require('../utils/list_helper')

const { totalLikes, favoriteBlog, mostBlogs, mostLikes } = listHelper

const generateBlogs = (likesArr) =>
  likesArr.map((likes, index) => ({
    _id: `5a422aa71b54a676234d17f${index}`,
    title: 'Go To Statement Considered Harmful',
    author: `Edsger W. Dijkstra Number ${index}`,
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    __v: 0,
    likes,
  }))

const generateBlogsAuthor = (authors) =>
  authors.map((author, index) => ({
    _id: `5a422aa71b54a676234d17f${index}`,
    title: 'Go To Statement Considered Harmful',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    __v: 0,
    likes: author.likes || Math.floor(Math.random() * authors.length),
    author: author.name,
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

describe('favorite blog', () => {
  test('is null when bloglist is empty', () => {
    expect(favoriteBlog([])).toBeNull()
  })

  test('is blog with highest like in bloglist', () => {
    const blogList = generateBlogs([0, 4, 5, 1, 10])
    expect(favoriteBlog(blogList)).toEqual(blogList[blogList.length - 1])
  })

  test('is first blog with highest like in bloglist', () => {
    const blogList = generateBlogs([11, 4, 11, 1, 10])
    expect(favoriteBlog(blogList)).toEqual(blogList[0])
  })
})

describe('most blogs', () => {
  test('returns null if bloglist is empty', () => {
    expect(mostBlogs([])).toBeNull()
  })

  test('returns the author with highest amount of blog', () => {
    const blogList = generateBlogsAuthor([
      { name: 'A' },
      { name: 'A' },
      { name: 'B' },
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
    ])
    expect(mostBlogs(blogList)).toEqual({
      author: 'A',
      blogs: 3,
    })
  })

  test('returns the first author with highest amount of blog', () => {
    const blogList = generateBlogsAuthor([
      { name: 'A' },
      { name: 'B' },
      { name: 'B' },
      { name: 'A' },
    ])
    expect(mostBlogs(blogList)).toEqual({
      author: 'A',
      blogs: 2,
    })
  })
})

describe('most likes', () => {
  test('is null for empty bloglist', () => {
    expect(mostLikes([])).toBeNull()
  })

  test('return the author with highest number of likes', () => {
    const blogList = generateBlogsAuthor([
      { name: 'A', likes: 10 },
      { name: 'B', likes: 23 },
      { name: 'C', likes: 1 },
    ])
    expect(mostLikes(blogList)).toEqual({
      author: 'B',
      likes: 23,
    })
  })

  test('return the first author with highest number of likes', () => {
    const blogList = generateBlogsAuthor([
      { name: 'A', likes: 10 },
      { name: 'B', likes: 9 },
      { name: 'C', likes: 10 },
      { name: 'D', likes: 10 },
      { name: 'B', likes: 30 },
    ])
    expect(mostLikes(blogList)).toEqual({
      author: 'B',
      likes: 39,
    })
  })
})
