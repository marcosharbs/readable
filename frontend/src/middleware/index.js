import thunk from 'redux-thunk'
import { applyMiddleware, compose } from 'redux'

export default compose(
    applyMiddleware(thunk), 
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)