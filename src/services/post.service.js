import * as store from '../data/store.js'
import { AppError } from '../utils/AppError.js'

export const getAllPosts = (query = {}) => {
  let posts = [...store.posts]

  if (query.authorId) {
    posts = posts.filter((p) => p.authorId === parseInt(query.authorId))
  }

  if (query.status) {
    posts = posts.filter((p) => p.status === query.status)
  }

  const page = parseInt(query.page) || 1
  const limit = parseInt(query.limit) || 10
  const startIndex = (page - 1) * limit
  const paginated = posts.slice(startIndex, startIndex + limit)

  return {
    total: posts.length,
    page,
    limit,
    totalPages: Math.ceil(posts.length / limit),
    data: paginated,
  }
}

export const getPostById = (id) => {
  const post = store.posts.find((p) => p.id === parseInt(id))
  if (!post) throw new AppError('Post not found', 404)
  return post
}

// Create post with author validation
export const createPost = (data) => {
  const { title, content, authorId, status = 'draft' } = data

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
  return post
}

export const updatePost = (id, data) => {
  const index = store.posts.findIndex((p) => p.id === parseInt(id))
  if (index === -1) throw new AppError('Post not found', 404)

  store.posts[index] = {
    ...store.posts[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  return store.posts[index]
}

export const deletePost = (id) => {
  const index = store.posts.findIndex((p) => p.id === parseInt(id))
  if (index === -1) throw new AppError('Post not found', 404)
  store.posts.splice(index, 1)
}

export const publishPost = (id) => {
  return updatePost(id, { status: 'published' })
}
