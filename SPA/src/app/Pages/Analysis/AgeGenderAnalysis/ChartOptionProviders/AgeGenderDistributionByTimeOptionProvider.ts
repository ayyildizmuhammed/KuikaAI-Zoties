import { getCSSVariableValue } from 'src/_metronic/assets/ts/_utils/DomHelpers'
import { ChartOptionProvider } from '../../Services/ChartOptionProvider'

export class AgeGenderDistributionByTimeOptionProvider extends ChartOptionProvider {
    cleanup(): void {
        throw new Error('Method not implemented.')
    }
    fetchData(): Promise<void> {
        return Promise.resolve()
    }

    async getChartOptions(height?: string): Promise<ApexCharts.ApexOptions> {
        const ageGroups = ['0-3', '3-13', '13-19', '20-29', '30-39', '40-49', '50-59', '60-69']
        const maleData = [30, 40, 25, 15, 12, 14, 12, 31] // Erkekler için yaş gruplarına göre sayılar
        const femaleData = [25, 35, 20, 20, 15, 10, 10, 25]

        const labelColor = getCSSVariableValue('--bs-gray-500')
        const borderColor = getCSSVariableValue('--bs-gray-200')
        const maleColor = getCSSVariableValue('--bs-info')
        const femaleColor = getCSSVariableValue('--bs-danger')

        const chartHeight = height || '350px'

        return {
            series: [
                {
                    name: 'Male',
                    data: maleData
                },
                {
                    name: 'Female',
                    data: femaleData
                }
            ],
            chart: {
                type: 'bar',
                height: chartHeight,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '80%',
                    borderRadius: 4,
                    barHeight: '70%',
                    dataLabels: {
                        position: 'top'
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center'
            },
            xaxis: {
                categories: ageGroups,
                labels: {
                    style: {
                        colors: labelColor,
                        fontSize: '12px'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: labelColor,
                        fontSize: '12px'
                    }
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                intersect: false,
                shared: true, // Tooltip'i paylaşılan (shared) yap
                y: {
                    formatter: function (val) {
                        return val + ' people'
                    }
                }
            },
            colors: [maleColor, femaleColor], // Seri renkleri
            grid: {
                borderColor: borderColor,
                strokeDashArray: 4,
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            }
        }
    }
}
