import { getCSSVariableValue } from 'src/_metronic/assets/ts/_utils/DomHelpers'
import { ChartOptionProvider } from '../../Services/ChartOptionProvider'

export class AverageEmotionDistributionOptionProvider extends ChartOptionProvider {
    cleanup(): void {
        throw new Error('Method not implemented.')
    }
    async fetchData(): Promise<any> {
        // Burada veritabanından veri çekilir
    }

    async getChartOptions(height = '350px'): Promise<ApexCharts.ApexOptions> {
        const categories = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const series = [
            { name: 'Happiness', data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 110, 120, 150] },
            { name: 'Sadness', data: [20, 30, 35, 40, 34, 25, 19, 20, 25, 45, 50, 60] },
            { name: 'Anger', data: [10, 15, 25, 30, 27, 20, 15, 19, 20, 25, 30, 35] },
            { name: 'Fear', data: [5, 10, 15, 20, 19, 25, 30, 45, 50, 55, 60, 65] },
            { name: 'Surprise', data: [2, 5, 8, 12, 14, 15, 25, 30, 35, 40, 45, 50] },
            { name: 'Disgust', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
            { name: 'Neutral', data: [31, 45, 40, 35, 30, 25, 20, 15, 10, 5, 2, 1] }
        ]

        return {
            series,
            chart: {
                type: 'bar',
                height,
                stacked: true,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: true
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false
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
                    text: 'Emotion Percentage'
                }
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            colors: ['#00E396', '#FEB019', '#FF4560', '#008FFB', '#775DD0', '#546E7A', '#7D6608'],
            dataLabels: {
                enabled: false
            }
        }
    }
}
