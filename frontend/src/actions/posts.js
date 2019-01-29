import { 
    addPost as addPostApi,
    editPost as editPostApi,
    deletePost as deletePostApi,
    upVotePost as votePostUpApi,
    downVotePost as votePostDownApi
} from '../api/ReadableApi'
import { UUID } from '../utils/helpers'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST_UP = 'VOTE_POST_UP'
export const VOTE_POST_DOWN = 'VOTE_POST_DOWN'

export function receivePosts(posts) {
    return { type: RECEIVE_POSTS, posts }
}

function addPost(post) {
    return { type: ADD_POST, post }
}

export const handleAddPost = (title, body, author, category, callback) => (dispatch) => {
    return addPostApi({
        id: UUID(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    })
    .then(post => {
        dispatch(addPost(post))
        callback()
    })
}

function editPost(post) {
    return { type: EDIT_POST, post }
}

export const handleEditPost = (id, title, body, callback) => (dispatch) => {
    return editPostApi(
        id, 
        title, 
        body
    )
    .then(post => {
        dispatch(editPost(post))
        callback()
    })
}

function deletePost(id) {
    return { type: DELETE_POST, id }
}

export const handleDeletePost = (id, callback) => (dispatch) => {
    return deletePostApi(id)
    .then(post => {
        dispatch(deletePost(post.id))
        callback()
    })
}

function votePostUp(id) {
    return { type: VOTE_POST_UP, id }
}

function votePostDown(id) {
    return { type: VOTE_POST_DOWN, id }
}

export const handleVotePostUp = (id) => (dispatch) => {
    dispatch(votePostUp(id))

    return votePostUpApi(id)
    .catch(_ => dispatch(votePostDown(id)))
}

export const handleVotePostDown = (id) => (dispatch) => {
    dispatch(votePostDown(id))

    return votePostDownApi(id)
    .catch(_ => dispatch(votePostUp(id)))
}