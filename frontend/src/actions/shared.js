import { getCategories, getPosts } from '../api/ReadableApi'
import { receiveCategories } from '../actions/categories'
import { receivePosts } from '../actions/posts'
import { showLoading, hideLoading } from 'react-redux-loading'

export const handleInitialData = () => (dispatch) => {
    dispatch(showLoading())

    return Promise.all([getCategories(), getPosts()])
    .then(data => {
        dispatch(receiveCategories(data[0]))
        dispatch(receivePosts(data[1]))
        dispatch(hideLoading())
    })
}