import ModelBase from './ModelBase'

export default class Location extends ModelBase {
    name?: string
    address: string
    image: string
    numberOfCameras?: number
    numberOfStaff?: number

    constructor(data: Location | null) {
        super(data)
        if (!data) return
        this.id = data.id
        this.name = data.name
    }
}

export function generateRandomLocationData(size: number = 1): Location[] {
    const locations: Location[] = []
    for (let i = 0; i < size; i++) {
        const newLocation = new Location({
            name: `Location ${i}`,
            address: `Address ${i}`,
            image: `Image ${i}`,
            numberOfCameras: Math.floor(Math.random() * 100) + 1,
            numberOfStaff: Math.floor(Math.random() * 100) + 1
        })
        locations.push(newLocation)
    }
    return locations
}
