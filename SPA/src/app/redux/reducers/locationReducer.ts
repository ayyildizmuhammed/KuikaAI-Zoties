import Location from '../../modules/dal/models/Location'

interface LocationState {
    allLocations?: Location[]
    selectedLocation: Location | null
    totalLocationStats?: {
        totalNumberOfCameras: number
        totalNumberOfStaff: number
        totalNumberOfSessions: number
    }
}

const initialState: LocationState = {
    selectedLocation: null,
    allLocations: [],
    totalLocationStats: null
}

export default function userReducer(state = initialState, action: any): LocationState {
    switch (action.type) {
        case 'SET_SELECTED_LOCATION':
            return {
                ...state,
                selectedLocation: action.payload
            }
        case 'SET_TOTAL_LOCATION_STATS':
            return {
                ...state,
                totalLocationStats: action.payload
            }
        case 'SET_ALL_LOCATIONS':
            return {
                ...state,
                allLocations: action.payload
            }
        case 'ADD_LOCATION':
            return {
                ...state,
                allLocations: [...state.allLocations, action.payload]
            }
        case 'UPDATE_LOCATION':
            return {
                ...state,
                allLocations: state.allLocations.map(location => (location.id === action.payload.id ? action.payload : location))
            }
        case 'DELETE_LOCATION':
            return {
                ...state,
                allLocations: state.allLocations.filter(location => location.id !== action.payload.id)
            }

        default:
            return state
    }
}

export function setselectedLocation(location: Location) {
    return {
        type: 'SET_SELECTED_LOCATION',
        payload: location
    }
}

export function setTotalLocationStats(stats: { totalNumberOfCameras: number; totalNumberOfStaff: number; totalNumberOfSessions: number }) {
    return {
        type: 'SET_TOTAL_LOCATION_STATS',
        payload: stats
    }
}

export function setAllLocations(locations: Location[]) {
    return {
        type: 'SET_ALL_LOCATIONS',
        payload: locations
    }
}

export function addLocation(location: Location) {
    return {
        type: 'ADD_LOCATION',
        payload: location
    }
}

export function updateLocation(location: Location) {
    return {
        type: 'UPDATE_LOCATION',
        payload: location
    }
}

export function deleteLocation(location: Location) {
    return {
        type: 'DELETE_LOCATION',
        payload: location
    }
}
