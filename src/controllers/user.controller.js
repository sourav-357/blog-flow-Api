import * as userService from '../services/user.service.js'
import { sendSuccess } from '../utils/response.js'

export const getAllUsers = (req, res) => {
  try {
    const users = userService.getAllUsers()
    sendSuccess(res, 200, 'Users fetched successfully', users)
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const getUserById = (req, res) => {
  try {
    const user = userService.getUserById(req.params.id)
    sendSuccess(res, 200, 'User fetched successfully', user)
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const createUser = (req, res) => {
  try {
    const user = userService.createUser(req.body)
    sendSuccess(res, 201, 'User created successfully', user)
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const updateUser = (req, res) => {
  try {
    const user = userService.updateUser(req.params.id, req.body)
    sendSuccess(res, 200, 'User updated successfully', user)
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}

export const deleteUser = (req, res) => {
  try {
    userService.deleteUser(req.params.id)
    sendSuccess(res, 200, 'User deleted successfully')
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, data: null })
  }
}
