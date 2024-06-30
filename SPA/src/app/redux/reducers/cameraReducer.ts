import Camera from '../../modules/dal/models/Camera'

export interface CameraState {
    selectedCamera: Camera | null
}

const initialState: CameraState = {
    selectedCamera: null
}

export default function cameraReducer(state = initialState, action: any): CameraState {
    switch (action.type) {
        case 'SET_SELECTED_CAMERA':
            return {
                ...state,
                selectedCamera: action.payload
            }
        default:
            return state
    }
}

export function setSelectedCamera(camera: Camera) {
    return {
        type: 'SET_SELECTED_CAMERA',
        payload: camera
    }
}
