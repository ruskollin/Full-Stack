import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notifReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notifReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools()
)

export default store