export let users = []
export let posts = []
let userIdCounter = 1
let postIdCounter = 1

export const getUserId = () => userIdCounter++
export const getPostId = () => postIdCounter++
