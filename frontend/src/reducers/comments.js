import {
    RECEIVE_COMMENTS,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    VOTE_COMMENT_UP,
    VOTE_COMMENT_DOWN
} from '../actions/comments'

export default function comments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {
                ...state,
                [action.postId]: [...action.comments]
            }
        case ADD_COMMENT:
            return {
                ...state,
                [action.comment.parentId]: [...state[action.comment.parentId], action.comment]
            }
        case EDIT_COMMENT:
            return {
                ...state,
                [action.comment.parentId]: [...state[action.comment.parentId].map(comment => comment.id === action.comment.id ? action.comment : comment)]
            }
        case DELETE_COMMENT:
            return {
                ...state,
                [action.postId]: [...state[action.postId].filter(comment => comment.id !== action.id)]
            }
        case VOTE_COMMENT_UP:
            return {
                ...state,
                [action.postId]: [...state[action.postId].map(comment => comment.id === action.id ? {...comment, voteScore: comment.voteScore + 1} : comment)]
            }
        case VOTE_COMMENT_DOWN:
        return {
            ...state,
            [action.postId]: [...state[action.postId].map(comment => comment.id === action.id ? {...comment, voteScore: comment.voteScore - 1} : comment)]
        }
        default:
            return state
    }
}