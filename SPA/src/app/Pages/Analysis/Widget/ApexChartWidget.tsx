import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'
import { useThemeMode } from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { ChartOptionProvider } from '../Services/ChartOptionProvider'

interface ApexChartWidgetProps {
    height?: string
    dataProvider: ChartOptionProvider
    live?: { enabled: true; refreshRate: number }
}

const ApexChartWidget: React.FC<ApexChartWidgetProps> = ({ dataProvider, height = '350px' }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const { mode } = useThemeMode()

    useEffect(() => {
        let chart: ApexCharts

        const initChart = async () => {
            const chartOptions = await dataProvider.getChartOptions(height)
            if (chartRef.current) {
                chart = new ApexCharts(chartRef.current, chartOptions)
                await chart.render()
            }
        }

        initChart()

        const dataUpdateListener = () => {
            chart.updateSeries([{ data: dataProvider.data }], false)
        }

        dataProvider.addListener(dataUpdateListener)

        return () => {
            chart?.destroy()
            dataProvider.removeListener(dataUpdateListener)
        }
    }, [dataProvider, mode, height])

    return <div ref={chartRef} id="kt_charts_widget_2_chart" style={{ height: height }} />
}

export default ApexChartWidget
