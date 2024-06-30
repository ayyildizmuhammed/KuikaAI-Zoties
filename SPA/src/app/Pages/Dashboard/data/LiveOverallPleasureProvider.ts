import { getCSSVariableValue } from 'src/_metronic/assets/ts/_utils'
import { ChartOptionProvider } from '../../Analysis/Services/ChartOptionProvider'

export class LiveOverallPleasureProvider extends ChartOptionProvider {
    adjustedData: any[]
    intervalId: any
    threshold: number = 60

    constructor() {
        super()
        this.startDataUpdate()
    }

    startDataUpdate() {
        this.updateData()
        this.intervalId = setInterval(() => {
            this.updateData()
        }, 5000) // Her 5 saniyede bir verileri güncelle
    }

    updateData() {
        this.data = Array.from({ length: 4 }, () => (this.threshold + (Math.random() * 30 - 15)).toFixed(2))
        // const adjustedData = this.data.map(value => (value - this.threshold).toFixed(2))
        // this.data = adjustedData
        // Veri güncellendiğinde dinleyicileri tetikle
        this.notifyListeners()
    }

    cleanup() {
        clearInterval(this.intervalId)
    }

    fetchData(): Promise<any> {
        throw new Error('Method not implemented.')
    }

    async getChartOptions(height?: string): Promise<ApexCharts.ApexOptions> {
        const threshold = 60

        this.data = [37.4, 69.24, 88.12, 45.87]

        // Belirlenen eşik değerine göre verileri güncelle
        // const adjustedData = this.data.map(value => (value - threshold).toFixed(2))
        // this.data = adjustedData
        return {
            series: [
                {
                    name: 'Overall Pleasure',
                    data: this.data
                }
            ],
            chart: {
                type: 'bar',
                height: 350,
                animations: {
                    enabled: false,
                    speed: 600 // Animasyon süresini milisaniye cinsinden ayarlayın
                }
            },
            fill: {
                opacity: 0.8
            },
            plotOptions: {
                bar: {
                    colors: {
                        ranges: [
                            {
                                from: 0,
                                to: 30,
                                color: '#FF6B6B'
                            },
                            {
                                from: 30,
                                to: 55,
                                color: '#C49A00'
                            },
                            {
                                from: 55,
                                to: 60,
                                color: '#92C4EE'
                            },
                            {
                                from: 60,
                                to: 65,
                                color: '#92C4EE'
                            },
                            {
                                from: 65,
                                to: 100,
                                color: '#16C653'
                            }
                        ]
                    },
                    columnWidth: '80%'
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val: number) {
                    return Math.abs(val) + '%' // Mutlak değeri göster
                }
            },
            yaxis: {
                show: false,
                title: {
                    text: 'Overall Pleasure'
                },

                labels: {
                    formatter: function (y) {
                        return Math.abs(y).toFixed(0) + '%' // Mutlak değeri göster
                    }
                }
            },
            xaxis: {
                type: 'category',
                categories: ['İstinye Park - İzmir', 'Optimum - İzmir', 'Akasya - İstanbul', 'Zorlu Center - İstanbul'],
                labels: {
                    rotate: -90,
                    style: {
                        colors: getCSSVariableValue('--bs-gray-800'),
                        fontSize: '12px',
                        fontFamily: 'IBM Plex Sans, sans-serif'
                    }
                }
            },
            annotations: {
                yaxis: [
                    {
                        y: threshold + 5,
                        y2: threshold - 5,
                        strokeDashArray: 5,
                        opacity: 0.2,
                        borderColor: '#8943C1',
                        label: {
                            borderColor: '#8943C1',
                            textAnchor: 'end',
                            borderRadius: 5,
                            style: {
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: '#fff',
                                background: '#8943C1'
                            },
                            text: `Threshold: ${threshold - 5} - ${threshold + 5} %`,
                            position: 'right'
                        }
                    }
                ]
            }
        }
    }
}
