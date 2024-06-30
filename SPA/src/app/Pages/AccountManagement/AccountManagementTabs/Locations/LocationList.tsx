import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Content from 'src/_metronic/layout/components/content/Content'
import { KTIcon, toAbsoluteUrl } from 'src/_metronic/helpers'
import Toolbar from 'src/app/modules/toolbar/Toolbar'
import ToolbarButtonRenderer from 'src/app/modules/toolbar/ToolbarButtonRenderer'
import Location from 'src/app/modules/dal/models/Location'
import { useIntl } from 'react-intl'
import { LocationModal } from './modals/LocationModal'
import useConfirmationDialog from 'src/app/modules/hooks/useConfirmationDialog'

export default function LocationManagementLocationsList({ className = 'card card-xxl-stretch mb-5 mb-xl-8' }) {
    const intl = useIntl()

    const { requestConfirmation, renderConfirmationDialog } = useConfirmationDialog()

    const [allLocations, setAllLocations] = useState<Location[]>([])
    const [searchValue, setSearchValue] = useState('')
    const location = useLocation()

    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const [addLocationModalVisible, setAddLocationModalVisible] = useState<boolean>(false)

    useEffect(() => {
        if (allLocations.length === 0) {
            setAllLocations(locationsData)
        } else {
            setAllLocations(allLocations)
        }
    }, [searchValue, allLocations, location])

    const handleEditLocation = (location: Location) => {
        setSelectedLocation(location)
        setAddLocationModalVisible(true)
    }

    const handleCloseModal = () => {
        setAddLocationModalVisible(false)
        setSelectedLocation(null) // Reset the selected location when the modal is closed
    }

    const handleDeleteLocation = async locationId => {
        try {
            const confirm = await requestConfirmation('Are you sure you want to delete this item?')
            if (confirm) {
                console.log('Delete the item:', locationId)
                deleteLocation(locationId)
            }
        } catch {
            console.log('Deletion cancelled')
        }
    }

    const deleteLocation = async locationId => {
        console.log('Deleting location with id:', locationId)
        // Here you would typically use ApolloClient to run your mutation, like:
        // await ApolloClientSingleton.getInstance().mutate({
        //   mutation: YOUR_GRAPHQL_DELETE_MUTATION,
        //   variables: { id: locationId }
        // });

        // Update the local state to reflect the change
        setAllLocations(allLocations.filter(loc => loc.id !== locationId))
    }

    const searchButton = ToolbarButtonRenderer.createSearchButton(setSearchValue, 'after')
    const addNewButton = ToolbarButtonRenderer.createAddNewButton(() => {
        setAddLocationModalVisible(true)
    }, 'after')
    const filterButton = ToolbarButtonRenderer.createFilterButton(() => {}, 'after')
    const backButton = ToolbarButtonRenderer.createBackButton('/dashboard', 'before')

    return (
        <Content>
            <Toolbar buttons={[searchButton, filterButton, backButton, addNewButton]} />
            {renderConfirmationDialog()}
            <LocationModal show={addLocationModalVisible} handleClose={handleCloseModal} selectedLocation={selectedLocation} />
            <div className={className}>
                <div className="card-body py-3">
                    <div className="table-responsive">
                        <table className="table align-middle gs-0 gy-4">
                            <thead>
                                <tr className="fw-bold text-muted bg-light">
                                    <th className="ps-4 min-w-250px rounded-start">{intl.formatMessage({ id: 'NAME' })}</th>
                                    <th className="min-w-200px text-center">{intl.formatMessage({ id: 'ADDRESS' })}</th>
                                    <th className="min-w-125px text-center">{intl.formatMessage({ id: 'NUMBER_OF_CAMERAS' })}</th>
                                    <th className="min-w-125px text-center">{intl.formatMessage({ id: 'NUMBER_OF_STAFF' })}</th>
                                    <th className="min-w-125px text-center">{intl.formatMessage({ id: 'UPDATED_ON' })}</th>
                                    <th className="min-w-125px text-center">{intl.formatMessage({ id: 'ACTIONS' })}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allLocations.map(location => (
                                    <tr key={location.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="symbol symbol-50px me-5">
                                                    <img src={toAbsoluteUrl(location.image)} alt="" />
                                                </div>
                                                <Link to={`/location-management/${location.id}/cameras`}>
                                                    <div className="d-flex justify-content-start flex-column">
                                                        <span
                                                            className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                                                            onClick={() => {
                                                                console.log('Route to location management')
                                                            }}>
                                                            {location.name}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </td>

                                        <td className="text-center">
                                            <div className="d-flex justify-content-start flex-column">
                                                <span className="text-gray-900 fw-bold mb-1 fs-6">{location.address}</span>
                                            </div>
                                        </td>

                                        <td className="text-center">
                                            <div className="d-flex justify-content-start flex-column">
                                                <span className="text-gray-900 fw-bold mb-1 fs-6">{location.numberOfCameras}</span>
                                            </div>
                                        </td>

                                        <td className="text-center">
                                            <div className="d-flex justify-content-start flex-column">
                                                <span className="text-gray-900 fw-bold mb-1 fs-6">{location.numberOfStaff}</span>
                                            </div>
                                        </td>

                                        <td className="text-center">
                                            {location.createdAt.toLocaleDateString('en-GB', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>

                                        <td className="text-center">
                                            <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1" onClick={() => handleEditLocation(location)}>
                                                <KTIcon iconName="pencil" className="fs-3" />
                                            </button>
                                            <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onClick={() => handleDeleteLocation(location.id)}>
                                                <KTIcon iconName="trash" className="fs-3" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Content>
    )
}

// Örnek veri dizisi

export const locationsData: Location[] = [
    {
        id: '1',
        name: 'BigChefs İstinye Park',
        address: 'İstinye Bayırı Cad. No:73',
        image: 'media/location-logo/istinye-park-light.svg',
        numberOfCameras: 10,
        numberOfStaff: 40,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    },
    {
        id: '2',
        name: 'BigChefs Mavi Bahçe',
        address: 'Mavişehir Mah. No:92',
        image: 'media/location-logo/mavibahce.svg',
        numberOfCameras: 20,
        numberOfStaff: 50,
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-10')
    }
]
