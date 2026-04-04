import * as postService from '../services/post.service.js'
import { sendSuccess } from '../utils/response.js'

export const getAllPosts = (req, res) => {
  try {
    const result = postService.getAllPosts(req.query)
    sendSuccess(res, 200, 'Posts fetched successfully', result)
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const getPostById = (req, res) => {
  try {
    const post = postService.getPostById(req.params.id)
    sendSuccess(res, 200, 'Post fetched successfully', post)
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const createPost = (req, res) => {
  try {
    const post = postService.createPost(req.body)
    sendSuccess(res, 201, 'Post created successfully', post)
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const updatePost = (req, res) => {
  try {
    const post = postService.updatePost(req.params.id, req.body)
    sendSuccess(res, 200, 'Post updated successfully', post)
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const deletePost = (req, res) => {
  try {
    postService.deletePost(req.params.id)
    sendSuccess(res, 200, 'Post deleted successfully')
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const publishPost = (req, res) => {
  try {
    const post = postService.publishPost(req.params.id)
    sendSuccess(res, 200, 'Post published successfully', post)
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}
