import { 
    RECEIVE_POSTS,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    VOTE_POST_UP,
    VOTE_POST_DOWN
} from '../actions/posts'

export default function posts(state = [], action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return [...state, ...action.posts]
        case ADD_POST:
            return [...state, action.post]
        case EDIT_POST:
            return [...state.map(post => post.id === action.post.id ? action.post : post)]
        case DELETE_POST:
            return [...state.filter(post => post.id !== action.id)]
        case VOTE_POST_UP:
            return [...state.map(post => post.id === action.id ? {...post, voteScore: post.voteScore + 1} : post)]
        case VOTE_POST_DOWN:
            return [...state.map(post => post.id === action.id ? {...post, voteScore: post.voteScore - 1} : post)]
        default:
            return state
    }
}