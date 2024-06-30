import { getCSSVariableValue } from 'src/_metronic/assets/ts/_utils/DomHelpers'
import { ChartOptionProvider } from '../../Services/ChartOptionProvider'

export class EmotionDistributionByTimeOptionProvider extends ChartOptionProvider {
    cleanup(): void {
        throw new Error('Method not implemented.')
    }
    async fetchData(): Promise<any> {
        // Burada veritabanından veri çekilir
    }

    async getChartOptions(height = '350px'): Promise<ApexCharts.ApexOptions> {
        const categories = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const series = [
            { name: 'Happy', data: [30, 40, 35, 50, 49, 60, 70] },
            { name: 'Sad', data: [10, 30, 45, 50, 49, 60, 22] },
            { name: 'Angry', data: [5, 20, 25, 30, 45, 55, 65] }
            // Diğer duygular için benzer şekilde
        ]

        return {
            series,
            chart: {
                type: 'area',
                height,
                toolbar: {
                    show: false
                }
            },
            xaxis: {
                categories,
                labels: {
                    style: {
                        colors: getCSSVariableValue('--bs-gray-500'),
                        fontSize: '12px'
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Emotion Count'
                },
                labels: {
                    style: {
                        colors: getCSSVariableValue('--bs-gray-500'),
                        fontSize: '12px'
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + ' %'
                    }
                }
            },
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                }
            },
            colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a']
        }
    }
}
