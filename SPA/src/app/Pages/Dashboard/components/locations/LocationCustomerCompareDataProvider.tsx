import { gql } from '@apollo/client'
export class LocationCustomerCompareDataProvider {
    sortBy = 'currentCount'

    query = gql`
        query {
            locationCustomerCompare {
                name
                customerAnalysis {
                    currentCount {
                        count
                        percentage
                    }
                    pleasure {
                        count
                        percentage
                    }
                }
                selectedAvgTimePeriod
                selectedCompareType
            }
        }
    `

    setSortBy(criteria) {
        this.sortBy = criteria
    }

    //returns the top 3 and low 3 items from the sortby
    async getPreparedData() {
        const data = await this.fetchData()
        const sortedData = this.sortData(data.locationCustomerCompare)
        const top3 = sortedData.slice(0, 3)
        const low3 = sortedData.slice(-3)
        return { top3, low3 }
    }

    sortData(data) {
        return [...data].sort((a, b) => {
            return b.customerAnalysis[this.sortBy].value - a.customerAnalysis[this.sortBy].value
        })
    }
    // iconPath: 'media/location-logo/istinye-park-light.svg',
    // iconPath: 'media/location-logo/zorlu-center.png',
    // iconPath: 'media/location-logo/mavibahce.svg',
    async fetchData(): Promise<any> {
        return {
            locationCustomerCompare: [
                {
                    "id": 1,
                    "name": "İstinye Park",
                    "iconPath": "media/location-logo/istinye-park-light.svg",
                    "customerAnalysis": {
                        "currentCount": {
                            "value": 175,
                            "percentage": 12,
                            "capacity": 190
                        },
                        "customerPleasure": {
                            "value": 92.6,
                            "percentage": -4
                        },
                        "staffCount": {
                            "value": 16,
                            "total": 30
                        },
                        "staffPleasure": {
                            "value": 68,
                            "percentage": -12
                        }
                    }
                },
                {
                    "id": 2,
                    "name": "Zorlu Center",
                    "iconPath": "media/location-logo/zorlu-center.png",
                    "customerAnalysis": {
                        "currentCount": {
                            "value": 165,
                            "percentage": 10,
                            "capacity": 200
                        },
                        "customerPleasure": {
                            "value": 93,
                            "percentage": 5
                        },
                        "staffCount": {
                            "value": 20,
                            "total": 25
                        },
                        "staffPleasure": {
                            "value": 75,
                            "percentage": -7
                        }
                    }
                },
                {
                    "id": 3,
                    "name": "Vadistanbul AVM",
                    "customerAnalysis": {
                        "currentCount": {
                            "value": 110,
                            "percentage": 15,
                            "capacity": 160
                        },
                        "customerPleasure": {
                            "value": 70,
                            "percentage": -2
                        },
                        "staffCount": {
                            "value": 18,
                            "total": 28
                        },
                        "staffPleasure": {
                            "value": 65,
                            "percentage": -10
                        }
                    }
                },
                {
                    "id": 4,
                    "name": "Mall of Istanbul",
                    "customerAnalysis": {
                        "currentCount": {
                            "value": 160,
                            "percentage": 20,
                            "capacity": 210
                        },
                        "customerPleasure": {
                            "value": 90,
                            "percentage": 0
                        },
                        "staffCount": {
                            "value": 22,
                            "total": 32
                        },
                        "staffPleasure": {
                            "value": 80,
                            "percentage": -5
                        }
                    }
                },
                {
                    "id": 5,
                    "name": "Forum Istanbul",
                    "customerAnalysis": {
                        "currentCount": {
                            "value": 130,
                            "percentage": 18,
                            "capacity": 190
                        },
                        "customerPleasure": {
                            "value": 85,
                            "percentage": 3
                        },
                        "staffCount": {
                            "value": 19,
                            "total": 29
                        },
                        "staffPleasure": {
                            "value": 72,
                            "percentage": -8
                        }
                    }
                },
                {
                    "id": 6,
                    "name": "Mavi Bahçe",
                    "iconPath": "media/location-logo/mavibahce.svg",
                    "customerAnalysis": {
                        "currentCount": {
                            "value": 115,
                            "percentage": 14,
                            "capacity": 180
                        },
                        "customerPleasure": {
                            "value": 78,
                            "percentage": -3
                        },
                        "staffCount": {
                            "value": 17,
                            "total": 27
                        },
                        "staffPleasure": {
                            "value": 69,
                            "percentage": -11
                        }
                    }
                },
                {
                    "id": 7,
                    "name": "Kanyon",
                    "customerAnalysis": {
                        "currentCount": {
                            "value": 145,
                            "percentage": 16,
                            "capacity": 220
                        },
                        "customerPleasure": {
                            "value": 88,
                            "percentage": 6
                        },
                        "staffCount": {
                            "value": 21,
                            "total": 31
                        },
                        "staffPleasure": {
                            "value": 77,
                            "percentage": -9
                        }
                    }
                },
                {
                    "id": 8,
                    "name": "Vialand",
                    "customerAnalysis": {
                        "currentCount": {
                            "value": 105,
                            "percentage": 11,
                            "capacity": 150
                        },
                        "customerPleasure": {
                            "value": 68,
                            "percentage": -5
                        },
                        "staffCount": {
                            "value": 15,
                            "total": 26
                        },
                        "staffPleasure": {
                            "value": 63,
                            "percentage": -13
                        }
                    }
                },
                {
                    "id": 9,
                    "name": "Emaar Square Mall",
                    "customerAnalysis": {
                        "currentCount": {
                            "value": 135,
                            "percentage": 17,
                            "capacity": 195
                        },
                        "customerPleasure": {
                            "value": 81,
                            "percentage": 4
                        },
                        "staffCount": {
                            "value": 20,
                            "total": 35
                        },
                        "staffPleasure": {
                            "value": 74,
                            "percentage": -6
                        }
                    }
                },
                {
                    "id": 10,
                    "name": "Cevahir Mall",
                    "customerAnalysis": {
                        "currentCount": {
                            "value": 150,
                            "percentage": 19,
                            "capacity": 230
                        },
                        "customerPleasure": {
                            "value": 92,
                            "percentage": 7
                        },
                        "staffCount": {
                            "value": 23,
                            "total": 33
                        },
                        "staffPleasure": {
                            "value": 79,
                            "percentage": -4
                        }
                    }
                }
            ]            
        }
    }
}
