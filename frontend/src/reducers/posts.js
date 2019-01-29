import { 
    RECEIVE_POSTS,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    VOTE_POST_UP,
    VOTE_POST_DOWN
} from '../actions/posts'
import {
    ADD_COMMENT,
    DELETE_COMMENT
} from '../actions/comments'
import { arrayToObject } from '../utils/helpers'

export default function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                ...arrayToObject('id', action.posts)
            }
        case ADD_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }
        case EDIT_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }
        case DELETE_POST:
            return {
                ...arrayToObject(
                    'id',
                    Object.values(state).filter(post => post.id !== action.id)
                )
            }
        case VOTE_POST_UP:
            return {
                ...arrayToObject(
                    'id',
                    Object.values(state).map(post => post.id === action.id ? {...post, voteScore: post.voteScore + 1} : post)
                )
            }
        case VOTE_POST_DOWN:
            return {
                ...arrayToObject(
                    'id',
                    Object.values(state).map(post => post.id === action.id ? {...post, voteScore: post.voteScore - 1} : post)
                )
            }
        case ADD_COMMENT:
            return {
                ...arrayToObject(
                    'id',
                    Object.values(state).map(post => post.id === action.comment.parentId ? {...post, commentCount: post.commentCount + 1} : post)
                )
            }
        case DELETE_COMMENT:
            return {
                ...arrayToObject(
                    'id',
                    Object.values(state).map(post => post.id === action.postId ? {...post, commentCount: post.commentCount - 1} : post)
                )
            }
        default:
            return state
    }
}