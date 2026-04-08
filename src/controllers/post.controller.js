import * as store from '../data/store.js'

class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export const getAllPosts = (req, res) => {
  try {
    let posts = [...store.posts]

    if (req.query.authorId) {
      posts = posts.filter((p) => p.authorId === parseInt(req.query.authorId))
    }

    if (req.query.status) {
      posts = posts.filter((p) => p.status === req.query.status)
    }

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * limit
    const paginated = posts.slice(startIndex, startIndex + limit)

    const result = {
      total: posts.length,
      page,
      limit,
      totalPages: Math.ceil(posts.length / limit),
      data: paginated,
    }
    res.status(200).json({ success: true, message: 'Posts fetched successfully', data: result })
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const getPostById = (req, res) => {
  try {
    const post = store.posts.find((p) => p.id === parseInt(req.params.id))
    if (!post) throw new AppError('Post not found', 404)
    res.status(200).json({ success: true, message: 'Post fetched successfully', data: post })
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const createPost = (req, res) => {
  try {
    const { title, content, authorId, status = 'draft' } = req.body

    const author = store.users.find((u) => u.id === parseInt(authorId))
    if (!author) throw new AppError('Author not found', 404)

    const post = {
      id: store.getPostId(),
      title,
      content,
      authorId: parseInt(authorId),
      authorName: author.name,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    store.posts.push(post)
    res.status(201).json({ success: true, message: 'Post created successfully', data: post })
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const updatePost = (req, res) => {
  try {
    const index = store.posts.findIndex((p) => p.id === parseInt(req.params.id))
    if (index === -1) throw new AppError('Post not found', 404)

    store.posts[index] = {
      ...store.posts[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    }
    const post = store.posts[index]
    res.status(200).json({ success: true, message: 'Post updated successfully', data: post })
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const deletePost = (req, res) => {
  try {
    const index = store.posts.findIndex((p) => p.id === parseInt(req.params.id))
    if (index === -1) throw new AppError('Post not found', 404)
    store.posts.splice(index, 1)
    res.status(200).json({ success: true, message: 'Post deleted successfully', data: null })
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const publishPost = (req, res) => {
  try {
    const index = store.posts.findIndex((p) => p.id === parseInt(req.params.id))
    if (index === -1) throw new AppError('Post not found', 404)

    store.posts[index] = {
      ...store.posts[index],
      status: 'published',
      updatedAt: new Date().toISOString(),
    }
    const post = store.posts[index]
    res.status(200).json({ success: true, message: 'Post published successfully', data: post })
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}
