import User from '../../modules/dal/models/User'

export interface UserState {
    selectedUser: User | null
    selectedUserFromList: User | null
}

const initialState: UserState = {
    selectedUser: null,
    selectedUserFromList: null
}

export default function userReducer(state = initialState, action: any): UserState {
    switch (action.type) {
        case 'SET_SELECTED_USER':
            return {
                ...state,
                selectedUser: action.payload
            }

        case 'SET_SELECTED_USER_FROM_LIST':
            return {
                ...state,
                selectedUserFromList: action.payload
            }
        default:
            return state
    }
}

export function setSelectedUser(user: User) {
    return {
        type: 'SET_SELECTED_USER',
        payload: user
    }
}

export function setSelectedUserFromList(user: User) {
    return {
        type: 'SET_SELECTED_USER_FROM_LIST',
        payload: user
    }
}
