import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'
import { getCSSVariableValue } from '../../../_metronic/assets/ts/_utils'

const RealtimePieChart = () => {
    const chartRef = useRef(null)

    useEffect(() => {
        const chartOptions = {
            chart: {
                type: 'donut',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 500,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                },
                events: {
                    mounted: (chartContext, config) => {
                        chartRef.current = chartContext
                    }
                }
            },
            colors: [getCSSVariableValue('--bs-primary'), getCSSVariableValue('--bs-danger')],
            labels: ['Man', 'Woman'],
            series: [getRandomNumber(), getRandomNumber()],
            legend: {
                show: true
            }
        }

        const chart = new ApexCharts(document.querySelector('#pie-chart'), chartOptions)
        chart.render()

        const interval = setInterval(() => {
            chart.updateSeries([getRandomNumber(), getRandomNumber()])
        }, 5000)

        return () => {
            clearInterval(interval)
            if (chartRef.current) {
                chartRef.current.destroy()
            }
        }
    }, [])

    function getRandomNumber() {
        return Math.floor(Math.random() * 100) + 1 // 1 ile 100 arasında rastgele sayı üretir
    }

    return <div id="pie-chart"></div>
}

export default RealtimePieChart
