import { auto } from '@popperjs/core'
import { useSelector } from 'react-redux'
import Camera from 'src/app/modules/dal/models/Camera'
import ModalWrapper from 'src/app/modules/modals/ModalWrapper'
import { RootState } from 'src/app/redux/reducers/rootReducer'
import EditCameraForm from './EditCameraForm'


export default function EditCamera() {
    const camera = useSelector<RootState>(state => state.cameraReducer.selectedCamera) as Camera

    return (
        <ModalWrapper title={'Edit Camera: ' + camera.name} style={{ width: auto, height: auto, alignItems: 'flex-start' }}>
            <EditCameraForm camera={camera} submitButtonLabel="Update Camera"></EditCameraForm>
        </ModalWrapper>
    )
}
