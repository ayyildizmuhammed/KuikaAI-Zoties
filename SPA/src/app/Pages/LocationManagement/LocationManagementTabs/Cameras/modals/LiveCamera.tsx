import { useEffect, useRef, useState } from 'react'
import './LiveCamera.scss'
import Hls from 'hls.js'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded'
import { useThemeMode } from '../../../../../../_metronic/partials'
import ModalWrapper from '../../../../../modules/modals/ModalWrapper'
import { Button } from '@mui/material'
import MotusSelectBox from '../../../../CommonComponents/MotusSelectBox'
import { useIntl } from 'react-intl'
import Camera, { generateRandomCameraData } from '../../../../../modules/dal/models/Camera'
import EmotionAnalysisPage from '../../../../Analysis/EmotionAnalysis/EmotionAnalysisPage'
import AgeGenderAnalysisPage from '../../../../Analysis/AgeGenderAnalysis/AgeGenderAnalysisPage'
import { CardsWidget31 } from '../../../../../../_metronic/partials/widgets/_new/cards/CardsWidget31'
import ReactApexChart from 'react-apexcharts'
import RealtimeEmotionChart from '../../../../CustomerDashboard/RealtimeEmotionChart'
import RealtimePieChart from '../../../../CustomerDashboard/RealtimePieChart'
import RealtimeRadialChart from '../../../../CustomerDashboard/RealtimeRadialChart'

export default function LiveCamera() {
    const [selectedCamera, setSelectedCamera] = useState<any>()
    const [cameras, setCameras] = useState<Camera[]>([])
    const intl = useIntl()

    const [refresh, setRefresh] = useState(false)
    const [analysesStarted, setAnalysesStarted] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const { mode } = useThemeMode()

    //selectedCamera değiştiğinde camera yayını başlatan effect
    useEffect(() => {
        function loadVideo(videoRef: any, streamUrl: any) {
            let video = videoRef.current
            if (!video || !streamUrl) return

            if (Hls.isSupported()) {
                const hls = new Hls()
                hls.loadSource(streamUrl)
                hls.attachMedia(video)
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play()
                })
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = streamUrl
                video.addEventListener('loadedmetadata', () => {
                    video.play()
                })
            }
        }
        if (!selectedCamera) {
            return
        }
        loadVideo(videoRef, selectedCamera.stream_url)
    }, [selectedCamera, refresh, analysesStarted])

    // camera datasını çeken effect
    useEffect(() => {
        const cameras = generateRandomCameraData(20)
        setCameras(cameras)
        // setSelectedCamera(cameras[0])
    }, [])

    function refreshConnection() {
        setRefresh(!refresh)
    }

    function renderHeaderElements() {
        const options = cameras.map(camera => ({ value: camera.id, label: camera.name }))
        return (
            <div className="header-elements">
                <MotusSelectBox label={'Camera'} labelPosition="left" options={options} onChange={(option: any) => setSelectedCamera(cameras.find(camera => camera.id === option.value))} />
                <Button variant="contained" endIcon={<ImageSearchRoundedIcon />} onClick={() => setAnalysesStarted(!analysesStarted)}>
                    {analysesStarted ? 'Stop Analyze' : 'Start Analyze'}
                </Button>
            </div>
        )
    }

    return (
        <ModalWrapper
            title={`Live Camera Feed: ${selectedCamera?.name}`}
            headerElements={renderHeaderElements()}
            style={{
                width: '80vw',
                height: '80vh',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
            <div className={`camera-content ${mode}`}>
                <div className="video-container" style={{ width: analysesStarted ? '60%' : '100%', height: '100%', marginLeft: 10 }}>
                    <video ref={videoRef} className="video-frame" autoPlay style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
                        <track kind="captions" />
                    </video>
                </div>
                {analysesStarted && (
                    <div className="analysis-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div className="row" style={{ flex: 1, alignItems: 'flex-end' }}>
                            <div className="col-6" style={{ display: 'flex' }}>
                                <RealtimePieChart />
                                {/* <RealtimeRadialChart /> */}
                            </div>
                        </div>
                        <div className="row" style={{ flex: 2 }}>
                            <RealtimeEmotionChart />
                        </div>
                    </div>
                )}
            </div>
        </ModalWrapper>
    )
}
