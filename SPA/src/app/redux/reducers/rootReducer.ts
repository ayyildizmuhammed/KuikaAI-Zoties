import { combineReducers } from 'redux'
import modalReducer from './modalReducer'
import cameraReducer from './cameraReducer'
import userReducer from './userReducer'
import locationReducer from './locationReducer'

const rootReducer = combineReducers({
    modalReducer: modalReducer,
    cameraReducer: cameraReducer,
    userReducer: userReducer,
    locationReducer: locationReducer
})

/**
 * Type definition for the root state.
 */
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
