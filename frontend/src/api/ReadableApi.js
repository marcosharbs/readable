import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:3001',
    headers: { 'Authorization': 'q1w2e3r4' }
})

export const getCategories = async () => {
    const response = await client.get('/categories')
    const data = await response.data
    return data.categories
}

export const getPosts = async () => {
    const response = await client.get('/posts')
    const data = await response.data
    return data
} 

export const addPost = async (post) => {
    const response = await client.post('/posts', post)
    const data = await response.data
    return data
}

export const editPost = async (id, title, body) => {
    const response = await client.put(`/posts/${id}`, { title, body })
    const data = await response.data
    return data
}

export const deletePost = async (id) => {
    const response = await client.delete(`/posts/${id}`)
    const data = await response.data
    return data
}

export const upVotePost = async (id) => {
    const response = await client.post(`/posts/${id}`, { option: 'upVote' })
    const data = await response.data
    return data
}

export const downVotePost = async (id) => {
    const response = await client.post(`/posts/${id}`, { option: 'downVote' })
    const data = await response.data
    return data
}

export const getComments = async (id) => {
    const response = await client.get(`/posts/${id}/comments`)
    const data = await response.data
    return data
}

export const addComment = async (comment) => {
    const response = await client.post('/comments', comment)
    const data = await response.data
    return data
}

export const upVoteComment = async (id) => {
    const response = await client.post(`/comments/${id}`, { option: 'upVote' })
    const data = await response.data
    return data
}

export const downVoteComment = async (id) => {
    const response = await client.post(`/comments/${id}`, { option: 'downVote' })
    const data = await response.data
    return data
}

export const editComment = async (id, timestamp, body) => {
    const response = await client.put(`/comments/${id}`, { timestamp, body })
    const data = await response.data
    return data
}

export const deleteComment = async (id) => {
    const response = await client.delete(`/comments/${id}`)
    const data = await response.data
    return data
}