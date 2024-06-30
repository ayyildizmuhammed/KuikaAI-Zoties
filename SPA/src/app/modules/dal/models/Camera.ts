import { ECameraStatus } from '../enums/ECameraStatusType'
import { ECameraType } from '../enums/ECameraType'
import ModelBase from './ModelBase'

export default class Camera extends ModelBase {
    status?: ECameraStatus
    name?: string
    type?: ECameraType
    address?: string
    last_seen_on?: string
    snapshot_url?: string
    stream_url?: string
    public constructor(data: Camera | null) {
        super(data)

        if (!data) return
        this.status = data['status']
        this.name = data['name']
        this.type = data['type']
        this.address = data['address']
        this.last_seen_on = data['last_seen_on']
        this.snapshot_url = data['snapshot_url']
        this.stream_url = data['stream_url']
    }
}

export function generateRandomCameraData(size: number = 1): Camera[] {
    // İhtimallerin tanımlandığı diziler
    const statuses = [ECameraStatus.Active, ECameraStatus.Inactive]
    const types = [ECameraType.IPCamera, ECameraType.Screenshot, ECameraType.Video, ECameraType.Webcam]
    const streamUrls = [
        'https://live-par-2-cdn-alt.livepush.io/live/bigbuckbunnyclip/index.m3u8',
        'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
    ]

    // Camera nesnesinin oluşturulması ve dönülmesi
    const cameras: Camera[] = []
    for (let i = 0; i < size; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const name = `Camera ${Math.floor(Math.random() * 100)}`
        const type = types[Math.floor(Math.random() * types.length)]
        const address = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.') // Rastgele bir IP adresi
        const snapshotUrl = `media/svg/brand-logos/cam${Math.floor(Math.random() * 3 + 1)}.jpeg`
        const lastSeenOn = new Date(Date.now() - Math.floor(Math.random() * 10000000000)) // Son görülme tarihi için rastgele bir tarih
        const streamUrl = streamUrls[Math.floor(Math.random() * streamUrls.length)]
        cameras.push(
            new Camera({
                id: (Math.random() + 1).toString(36).substring(7), // Basit bir random ID
                createdAt: new Date(),
                updatedAt: new Date(),
                status,
                name,
                type,
                address,
                last_seen_on: lastSeenOn.toISOString(),
                snapshot_url: snapshotUrl,
                stream_url: streamUrl
            })
        )
    }
    return cameras
}
