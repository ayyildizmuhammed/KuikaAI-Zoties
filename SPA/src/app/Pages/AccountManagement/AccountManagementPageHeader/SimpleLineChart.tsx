import ReactApexChart from 'react-apexcharts'

export default function SimpleLineChart() {
    const options: any = {
        chart: {
            id: 'basic-line-chart',
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 4
        },
        dataLabels: {
            enabled: false,
            formatter: function (val) {
                return val + '%'
            },
            offsetY: -10
        },
        tooltip: {
            y: {
                formatter: function (val: any) {
                    return val + '%'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value: any) {
                    return value + '%'
                }
            }
        },
        grid: {
            borderColor: '#f1f1f1'
        }
    }

    const series = [
        {
            name: 'Customer Rate',
            data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
        }
    ]

    return <ReactApexChart options={options} series={series} type="bar" />
}
