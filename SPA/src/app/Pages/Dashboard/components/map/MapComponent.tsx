import React, { useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker, Polygon } from '@react-google-maps/api'

import { v4 as uuidv4 } from 'uuid'
import map from './map.json'
import { useThemeMode } from 'src/_metronic/partials/layout/theme-mode/ThemeModeProvider'
//https://nominatim.openstreetmap.org/search.php?q=Ankara&polygon_geojson=1&format=json

const containerStyle = {
    width: '100%',
    height: '400px'
}

const center = {
    lat: 38.79967263478882,
    lng: 35.06827094893914
}

const MapComponent = ({ onLocationSelect }) => {
    const { mode } = useThemeMode()
    const [isMapsLoaded, setIsMapsLoaded] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState('İstinye Park - İzmir')

    const locations = [
        { lat: 38.4192, lng: 27.1287, name: 'İstinye Park - İzmir', city: 'izmir' }, // İzmir
        { lat: 41.0082, lng: 28.9784, name: 'Zorlu Center - İstanbul', city: 'istanbul' }, // İstanbul
        { lat: 39.9334, lng: 32.8597, name: 'AnkaMall - Ankara ', city: 'ankara' } // Ankara
    ]

    const onCitySelected = city => {
        onLocationSelect(city)
        setSelectedLocation(city.name)
    }

    const renderMarker = location => {
        const icon = {
            url: mode === 'dark' ? '/media/svg/brand-logos/big-chef-logo.png' : '/media/svg/brand-logos/big-chef-logo-dark.png',
            scaledSize: new window.google.maps.Size(30, 20),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 40)
        }

        return <Marker key={location.name} position={{ lat: location.lat, lng: location.lng }} onClick={() => onCitySelected(location)} icon={icon} />
    }

    const renderPolygon = (coordinates, locationData) => {
        const isSelected = locationData.name === selectedLocation
        return (
            <Polygon
                key={uuidv4()}
                paths={coordinates[0][0].map(c => {
                    return { lng: c[0], lat: c[1] }
                })}
                onClick={() => onCitySelected(locationData)}
                options={{
                    fillColor: isSelected ? '#ff0000' : 'red', // Change color if selected
                    fillOpacity: isSelected ? 0.6 : 0.4, // More opaque if selected
                    strokeColor: isSelected ? '#ffffff' : 'gray', // Change stroke color if selected
                    strokeOpacity: 1,
                    strokeWeight: isSelected ? 3 : 2, // Thicker border if selected
                    zIndex: isSelected ? 2 : 1 // Ensure selected polygon is on top
                }}
            />
        )
    }

    return (
        <div className={`card card-xl-stretch`}>
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold fs-3 mb-1">Active Locations</span>
                    <span className="text-muted fw-semibold fs-7"># of Points: 4 | Selected: </span>
                </h3>
            </div>
            <div className="card-body">
                <LoadScript googleMapsApiKey="AIzaSyDKT-lXXkFPQSFjeLwOUtP4Qs2oxORvIR4" onLoad={() => setIsMapsLoaded(true)}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={5.65}
                        options={{ disableDefaultUI: true, styles: mode === 'dark' ? darkMapStyles : lightMapStyles, scrollwheel: false, fullscreenControl: false, disableDoubleClickZoom: true }} // Stil uygulama
                    >
                        {isMapsLoaded && locations.map(location => renderMarker(location))}
                        {isMapsLoaded && locations.map(location => renderPolygon(map[location.city.toLowerCase().split(' ')[0]].coordinates, location))}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    )
}

export default React.memo(MapComponent)
const darkMapStyles = [
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
            {
                saturation: 36
            },
            {
                color: '#000000'
            },
            {
                lightness: 40
            }
        ]
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on'
            },
            {
                color: '#000000'
            },
            {
                lightness: 16
            }
        ]
    },
    {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#000000'
            },
            {
                lightness: 20
            }
        ]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#000000'
            },
            {
                lightness: 17
            },
            {
                weight: 1.2
            }
        ]
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000'
            },
            {
                lightness: 20
            }
        ]
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000'
            },
            {
                lightness: 21
            }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#000000'
            },
            {
                lightness: 17
            }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#000000'
            },
            {
                lightness: 29
            },
            {
                weight: 0.2
            }
        ]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000'
            },
            {
                lightness: 18
            }
        ]
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000'
            },
            {
                lightness: 16
            }
        ]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000'
            },
            {
                lightness: 19
            }
        ]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#000000'
            },
            {
                lightness: 17
            }
        ]
    }
]

const lightMapStyles = [
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e9e9e9'
            },
            {
                lightness: 17
            }
        ]
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5'
            },
            {
                lightness: 20
            }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                lightness: 17
            }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                lightness: 29
            },
            {
                weight: 0.2
            }
        ]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                lightness: 18
            }
        ]
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                lightness: 16
            }
        ]
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5'
            },
            {
                lightness: 21
            }
        ]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#dedede'
            },
            {
                lightness: 21
            }
        ]
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on'
            },
            {
                color: '#ffffff'
            },
            {
                lightness: 16
            }
        ]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                saturation: 36
            },
            {
                color: '#333333'
            },
            {
                lightness: 40
            }
        ]
    },
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f2f2f2'
            },
            {
                lightness: 19
            }
        ]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#fefefe'
            },
            {
                lightness: 20
            }
        ]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#fefefe'
            },
            {
                lightness: 17
            },
            {
                weight: 1.2
            }
        ]
    }
]
