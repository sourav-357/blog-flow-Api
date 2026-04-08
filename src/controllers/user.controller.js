

import * as store from '../data/store.js'


class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}




export const getAllUsers = (req, res) => {
  try {
    const users = store.users
    res.status(200).json({ 
      success: true, 
      message: 'Users fetched successfully', 
      data: users 
    })
  } catch (err) {
    res.status(err.statusCode || 500).json({ 
      success: false, 
      message: err.message, 
      data: null 
    })
  }
}




export const getUserById = (req, res) => {
  try {
    const user = store.users.find((u) => u.id === parseInt(req.params.id))
    if (!user) throw new AppError('User not found', 404)
    res.status(200).json({ 
      success: true, 
      message: 'User fetched successfully', 
      data: user 
    })
  } catch (err) {
    res.status(err.statusCode || 500).json({ 
      success: false, 
      message: err.message, 
      data: null 
    })
  }
}




export const createUser = (req, res) => {
  try {
    const { name, email } = req.body
    const exists = store.users.find((u) => u.email === email)
    if (exists) throw new AppError('Email already exists', 409)

    const user = {
      id: store.getUserId(),
      name,
      email,
      createdAt: new Date().toISOString(),
    }
    store.users.push(user)
    res.status(201).json({ 
      success: true, 
      message: 'User created successfully', 
      data: user 
    })
  } catch (err) {
    res.status(err.statusCode || 500).json({ 
      success: false, 
      message: err.message, 
      data: null 
    })
  }
}




export const updateUser = (req, res) => {
  try {
    const index = store.users.findIndex((u) => u.id === parseInt(req.params.id))
    if (index === -1) throw new AppError('User not found', 404)

    store.users[index] = { ...store.users[index], ...req.body }
    const user = store.users[index]
    res.status(200).json({ 
      success: true, 
      message: 'User updated successfully', 
      data: user 
    })
  } catch (err) {
    res.status(err.statusCode || 500).json({ 
      success: false, 
      message: err.message, 
      data: null
    })
  }
}



export const deleteUser = (req, res) => {
  try {
    const index = store.users.findIndex((u) => u.id === parseInt(req.params.id))
    if (index === -1) throw new AppError('User not found', 404)

    store.users.splice(index, 1)
    res.status(200).json({ 
      success: true, 
      message: 'User deleted successfully', 
      data: null 
    })
  } catch (err) {
    res.status(err.statusCode || 500).json({ 
      success: false, 
      message: err.message, 
      data: null 
    })
  }
}


