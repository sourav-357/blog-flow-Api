import * as store from '../data/store.js'
import { AppError } from '../utils/AppError.js'

export const getAllUsers = () => store.users

export const getUserById = (id) => {
  const user = store.users.find((u) => u.id === parseInt(id))
  if (!user) throw new AppError('User not found', 404)
  return user
}

// Create user with duplicate email check
export const createUser = (data) => {
  const { name, email } = data
  const exists = store.users.find((u) => u.email === email)
  if (exists) throw new AppError('Email already exists', 409)

  const user = {
    id: store.getUserId(),
    name,
    email,
    createdAt: new Date().toISOString(),
  }
  store.users.push(user)
  return user
}

export const updateUser = (id, data) => {
  const index = store.users.findIndex((u) => u.id === parseInt(id))
  if (index === -1) throw new AppError('User not found', 404)

  store.users[index] = { ...store.users[index], ...data }
  return store.users[index]
}

export const deleteUser = (id) => {
  const index = store.users.findIndex((u) => u.id === parseInt(id))
  if (index === -1) throw new AppError('User not found', 404)

  store.users.splice(index, 1)
}
