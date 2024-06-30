import { Box, IconButton } from '@mui/material'
import CameraCardSettings from './CameraCardSettings'
import * as Mui from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import CommonStyles from '../../../../../modules/common/CommonStyles'
import { ECameraStatus } from '../../../../../modules/dal/enums/ECameraStatusType'
import { EModalName } from '../../../../../modules/dal/enums/EModalName'
import Camera from '../../../../../modules/dal/models/Camera'
import { setSelectedCamera } from '../../../../../redux/reducers/cameraReducer'
import { openModal } from '../../../../../redux/reducers/modalReducer'
import { useThemeMode } from 'src/_metronic/partials'
import { timeSince } from 'src/app/utils/DateUtils'

function getImageUrl(cameraStatus: ECameraStatus, mode: string, snapshotUrl: string): string {
    if (cameraStatus === ECameraStatus.Inactive) {
        return toAbsoluteUrl(`media/cameras/camera-no-snapshot${mode === 'dark' ? '-dark' : ''}.png`)
    } else {
        return toAbsoluteUrl(snapshotUrl)
    }
}

export default function CameraCard(props: Readonly<Camera>) {
    const { mode } = useThemeMode()
    const { status, name, type, address, last_seen_on, createdAt, snapshot_url } = props
    const dispatch = useDispatch()
    const getStatusColor = (status: ECameraStatus) => {
        return status === ECameraStatus.Active ? 'green' : 'red'
    }

    function handleLiveStreamClicked() {
        dispatch(setSelectedCamera(props))
        dispatch(openModal(EModalName.LiveCamera))
    }

    return (
        <Box sx={{ width: '100%', maxHeight: 350, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: '10px', mb: 2 }}>
            <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <img src={getImageUrl(status, mode, snapshot_url)} alt="Camera Snapshot" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.8, mb: 1, fontWeight: 'bolder' }}>
                    <span>
                        {name} : {type}
                    </span>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: 5 }}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                        <Mui.FiberManualRecord sx={{ color: getStatusColor(status), fontSize: '1rem' }} />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="motus-vertical-stack" style={{ fontSize: 12, opacity: 0.5 }}>
                        <span>
                            <strong>Address:</strong> {address}
                        </span>
                        <span>
                            <strong>Created On:</strong> {createdAt.toLocaleString()}
                        </span>
                        <span>
                            <strong>Last Seen:</strong> {timeSince(last_seen_on)}
                        </span>
                    </div>
                    <div className="motus-horizontal-stack">
                        <IconButton style={CommonStyles.IconStyle} onClick={handleLiveStreamClicked}>
                            <Mui.LiveTvOutlined {...CommonStyles.IconProps} />
                        </IconButton>
                        <CameraCardSettings {...props} />
                    </div>
                </Box>
            </Box>
        </Box>
    )
}
