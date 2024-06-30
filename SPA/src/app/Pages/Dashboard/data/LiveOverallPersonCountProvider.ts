import { getCSSVariableValue } from "src/_metronic/assets/ts/_utils"
import { ChartOptionProvider } from "../../Analysis/Services/ChartOptionProvider"


export class LiveOverallPersonCountProvider extends ChartOptionProvider {
    adjustedData: any[]
    intervalId: any

    constructor() {
        super()
        this.startDataUpdate()
    }

    startDataUpdate() {
        this.updateData()
        this.intervalId = setInterval(() => {
            this.updateData()
        }, 5000) // Her 2 saniyede bir verileri güncelle
    }

    updateData() {
        this.data = Array.from({ length: 4 }, () => Math.random() * (1500 - 300) + 300)
        const adjustedData = this.data.map(value => value.toFixed(2))
        this.data = adjustedData
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
        this.data = [
            { name: 'İstinye Park - İzmir', value: 1200 },
            { name: 'Zorlu Center - İstanbul', value: 950 },
            { name: 'Akasya - İstanbul', value: 700 },
            { name: 'Optimum - İzmir', value: 650 }
        ]

        return {
            series: [
                {
                    name: '',
                    data: this.data.map(item => item.value).reverse()
                }
            ],
            chart: {
                type: 'bar',
                height: height,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                    distributed: true,
                    barHeight: '75%'
                }
            },
            colors: ['#B57BED', '#CA6CD8', '#D863B1', '#E55A89', '#F44F5E'],
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                style: {
                    fontFamily: 'inherit',
                    colors: ['#fff']
                },
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ': ' + val
                },
                offsetX: 0,
                dropShadow: {
                    enabled: true
                }
            },
            xaxis: {
                categories: this.data.map(item => item.name).reverse(),
                labels: {
                    style: {
                        colors: getCSSVariableValue('--bs-gray-800'),
                        fontSize: '12px',
                        fontFamily: 'IBM Plex Sans, sans-serif'
                    }
                }
            },
            legend: {
                show: false
            },
            yaxis: {
                labels: {
                    show: false
                }
            }
        }
    }
}
