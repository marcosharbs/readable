import {
    getComments as getCommentsApi, 
    addComment as addCommenttApi,
    editComment as editCommentApi,
    deleteComment as deleteCommentApi,
    upVoteComment as voteCommentUpApi,
    downVoteComment as voteCommentDownApi
} from '../api/ReadableApi'
import { UUID } from '../utils/helpers'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT_UP = 'VOTE_COMMENT_UP'
export const VOTE_COMMENT_DOWN = 'VOTE_COMMENT_DOWN'

function receiveComments(postId, comments) {
    return { type: RECEIVE_COMMENTS, postId, comments }
}

export const handleGetComments = (postId) => (dispatch) => {
    return getCommentsApi(postId)
    .then(comments => dispatch(receiveComments(postId, comments)))
}

function addComment(comment) {
    return { type: ADD_COMMENT, comment }
}

export const handleAddComment = (body, author, postId) => (dispatch) => {
    return addCommenttApi({
        id: UUID(),
        timestamp: Date.now(),
        body,
        author,
        parentId: postId
    })
    .then(comment => dispatch(addComment(comment)))
}

function editComment(comment) {
    return { type: EDIT_COMMENT, comment }
}

export const handleEditComment = (id, body) => (dispatch) => {
    return editCommentApi(
        id, 
        Date.now(), 
        body
    )
    .then(comment => dispatch(editComment(comment)))
}

function deleteComment(postId, id) {
    return { type: DELETE_COMMENT, postId, id }
}

export const handleDeleteComment = (postId, id) => (dispatch) => {
    return deleteCommentApi(id)
    .then(comment => dispatch(deleteComment(postId, comment.id)))
}

function voteCommentUp(postId, id) {
    return { type: VOTE_COMMENT_UP, postId, id }
}

function voteCommentDown(postId, id) {
    return { type: VOTE_COMMENT_DOWN, postId, id }
}

export const handleVoteCommentUp = (postId, id) => (dispatch) => {
    dispatch(voteCommentUp(postId, id))

    return voteCommentUpApi(id)
    .catch(_ => dispatch(voteCommentDown(postId, id)))
}

export const handleVoteCommentDown = (postId, id) => (dispatch) => {
    dispatch(voteCommentDown(postId, id))

    return voteCommentDownApi(id)
    .catch(_ => dispatch(voteCommentUp(postId, id)))
}