import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducer'

// Configure the Redux store with the root reducer
const store = configureStore({
    reducer: rootReducer
})

export default store
