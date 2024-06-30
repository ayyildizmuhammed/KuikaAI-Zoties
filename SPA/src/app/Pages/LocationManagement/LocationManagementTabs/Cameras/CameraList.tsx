import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './CameraList.scss'
import CameraCard from './cards/CameraCard'
import Content from '../../../../../_metronic/layout/components/content/Content'
import ToolbarWrapper from '../../../../../_metronic/layout/components/toolbar/ToolbarWrapper'
import Dropdown2 from '../../../../../_metronic/partials/content/dropdown/Dropdown2'
import { EModalName } from '../../../../modules/dal/enums/EModalName'
import Camera, { generateRandomCameraData } from '../../../../modules/dal/models/Camera'
import { openModal } from '../../../../redux/reducers/modalReducer'
import { useNavigate } from 'react-router-dom'

export default function CameraList() {
    const [cameras, setCameras] = useState<Camera[]>([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchCameras() {
            const data = generateRandomCameraData(20)
            setCameras(data)
        }
        fetchCameras()
    }, [])

    return (
        <Content>
            <ToolbarWrapper
                showPageTitle={true}
                onClickAddNewButton={() => dispatch(openModal(EModalName.AddCamera))}
                onClickBackButtonPath="/location-management"
                renderFilterDropdown={Dropdown2}
                onSearchValueChange={searchValue => console.log('Searching For Cameras...')}></ToolbarWrapper>

            <Content>
                <div className="camera-container">
                    {cameras.map(camera => (
                        <CameraCard
                            key={camera.id}
                            id={camera.id}
                            status={camera.status}
                            name={camera.name}
                            type={camera.type}
                            address={camera.address}
                            last_seen_on={camera.last_seen_on}
                            createdAt={new Date(camera.createdAt)}
                            snapshot_url={camera.snapshot_url}
                            stream_url={camera.stream_url}
                            updatedAt={camera.updatedAt}
                        />
                    ))}
                </div>
            </Content>
        </Content>
    )
}
