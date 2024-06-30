import { gql } from '@apollo/client'

export const CAMERAS_QUERY = gql`
    query GetCameras {
        getCameras {
            id
            name
        }
    }
`

export const LOCATIONS_QUERY = gql`
    query GetLocations {
        getLocations {
            name
            address
        }
    }
`
