import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'

const RealtimeRadialBarChart = () => {
    const chartRef = useRef(null)

    useEffect(() => {
        const chart = new ApexCharts(chartRef.current, {
            chart: {
                height: 150,
                type: 'radialBar'
            },
            series: [50], // Başlangıç değeri
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '60%'
                    }
                }
            },
            labels: ['Pleasure']
        })

        chart.render()

        const updateChart = () => {
            chart.updateSeries([getRandomValue()])
        }

        const interval = setInterval(updateChart, 2000)

        return () => {
            clearInterval(interval)
            chart.destroy()
        }
    }, [])

    function getRandomValue() {
        // 50 ile 80 arasında rastgele bir sayı üretir
        return Math.floor(Math.random() * (80 - 50 + 1)) + 50
    }

    return <div ref={chartRef}></div>
}

export default RealtimeRadialBarChart
