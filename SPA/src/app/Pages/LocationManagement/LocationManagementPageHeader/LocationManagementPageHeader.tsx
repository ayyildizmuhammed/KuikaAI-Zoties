import { useSelector } from 'react-redux'
import { toAbsoluteUrl } from 'src/_metronic/helpers'
import Content from 'src/_metronic/layout/components/content/Content'
import PageHeaderWrapper from 'src/app/modules/PageHeaderWrapper/PageHeaderWrapper'
import { RootState } from 'src/app/redux/reducers/rootReducer'

export default function LocationManagementPageHeader() {
    const selectedLocation = useSelector((state: RootState) => state.locationReducer.selectedLocation)
    const totalLocationStats = useSelector((state: RootState) => state.locationReducer.totalLocationStats)

    const navigations = [
        {
            title: 'Cameras',
            path: `/location-management/${selectedLocation.id}/cameras`
        },
        {
            title: 'Staff',
            path: `/location-management/${selectedLocation.id}/staff`
        },
        {
            title: 'Sessions',
            path: `/location-management/${selectedLocation.id}/sessions`
        }
    ]

    return (
        <Content>
            <PageHeaderWrapper
                navigations={navigations}
                imagePath={selectedLocation?.image != null ? toAbsoluteUrl(selectedLocation.image) : '/media/svg/brand-logos/bigChefLogo.png'}
                infoComponent={<div></div>}></PageHeaderWrapper>
        </Content>
    )
}
