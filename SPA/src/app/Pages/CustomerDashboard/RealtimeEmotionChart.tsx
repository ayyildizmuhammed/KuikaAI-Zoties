import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'

const max = 80
const min = 50

const RealtimeEmotionChart = () => {
    const chartRef = useRef(null)

    useEffect(() => {
        const initialSeries = [
            {
                name: 'Happy',
                data: getInitialData()
            },
            {
                name: 'Neutral',
                data: getInitialData()
            },
            {
                name: 'Surprised',
                data: getInitialData()
            }
        ]

        const chartOptions = {
            chart: {
                height: 350,
                type: 'area',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 500
                    }
                },
                events: {
                    mounted: (chartContext, config) => {
                        chartRef.current = chartContext
                    }
                }
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Emotion Distribution',
                align: 'left',
                margin: 5,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize:  '14px',
                  fontWeight:  'bolder',
                  fontFamily:  'IBM Plex Sans',
                  color:  '#263238'
                },
            },
            colors: ['#F44336', '#E91E63', '#9C27B0'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + ' %'
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            series: initialSeries,
            xaxis: {
                type: 'datetime',
                title: {
                    text: 'Time'
                }
            },
            yaxis: {
                max: 100,
                title: {
                    text: 'Percentage'
                }
            },
            legend: {
                show: true
            }
        }

        const chart = new ApexCharts(document.querySelector('#chart'), chartOptions)
        chart.render()

        const interval = setInterval(() => {
            chart.appendData([
                { data: [[new Date().getTime(), Math.floor(Math.random() * (max - min) + min)]] },
                { data: [[new Date().getTime(), Math.floor(Math.random() * (max - min) + min)]] },
                { data: [[new Date().getTime(), Math.floor(Math.random() * (max - min) + min)]] }
            ])
        }, 5000)

        return () => {
            clearInterval(interval)
            if (chartRef.current) {
                chartRef.current.destroy()
            }
        }
    }, [])

    function getInitialData() {
        const data = []
        const now = new Date().getTime()
        for (let i = 0; i < 10; i++) {
            data.push([now - (10 - i) * 5000, Math.floor(Math.random() * (max - min) + min)])
        }
        return data
    }

    return <div id="chart"></div>
}

export default RealtimeEmotionChart
