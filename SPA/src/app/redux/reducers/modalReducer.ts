import { EModalName } from '../../modules/dal/enums/EModalName'

const initialState = {
    isModalOpen: false,
    modalName: EModalName.None
}

export default function modalReducer(state = initialState, action: { type: string; payload: any }) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                isModalOpen: true,
                modalName: action.payload
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                isModalOpen: false,
                modelName: EModalName.None
            }
        default:
            return state
    }
}

export function openModal(modalName: EModalName) {
    return {
        type: 'OPEN_MODAL',
        payload: modalName
    }
}

export function closeModal() {
    return {
        type: 'CLOSE_MODAL'
    }
}
