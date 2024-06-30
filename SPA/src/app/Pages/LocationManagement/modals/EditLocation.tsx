import { auto } from '@popperjs/core'
import { useSelector } from 'react-redux'
import FormModalWrapper from 'src/app/modules/modals/FormModalWrapper'
import { RootState } from 'src/app/redux/reducers/rootReducer'
import EditLocationForm from './EditLocationForm'
import Location from 'src/app/modules/dal/models/Location'

export default function EditLocation() {
    const location = useSelector<RootState>(state => state.locationReducer.selectedLocation) as Location
    return (
        <FormModalWrapper title={'Edit Location: ' + location.name} style={{ width: auto, height: auto, alignItems: 'flex-start' }}>
            <EditLocationForm location={location} submitButtonLabel="Add Location"></EditLocationForm>
        </FormModalWrapper>
    )
}
