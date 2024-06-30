import ApolloClientSingleton from 'src/app/utils/ApolloClientSingleton'
import { AnalysisFilterModel } from '../../Filter/Models/AnalysisFilterModel'
import { ChartOptionProvider } from '../../Services/ChartOptionProvider'
import { AgeCategories, getEnumKeyByValue } from '../../Filter/Models/AnalysisEnums'
import { gql } from '@apollo/client'

export class AgeGenderDistribution {
    Distribution: AgeCategoryDistribution[]

    Total: TotalDistribution
}

class TotalDistribution {
    manCount: number

    womanCount: number
}

export class AgeCategoryDistribution {
    ageCategory: number

    manCount: number

    womanCount: number
}

export class AgeGenderDistributionOptionProvider extends ChartOptionProvider {
    cleanup(): void {
        throw new Error('Method not implemented.')
    }
    constructor(public filters?: AnalysisFilterModel) {
        super(filters)
    }

    async fetchData(): Promise<AgeGenderDistribution> {
        const x = await ApolloClientSingleton.getInstance().query({
            query: AGE_GENDER_DISTRIBUTION_QUERY,
            variables: { filters: this.filters }
        })
        return x.data.ageGenderDistribution.data
    }

    async getChartOptions(height?: string): Promise<ApexCharts.ApexOptions> {
        // Dummy veriler
        const distributions = await this.fetchData()
        // Chart seçenekleri
        return {
            chart: {
                type: 'bar',
                height: height,
                toolbar: {
                    show: false // Toolbar gizleme
                }
            },
            xaxis: {
                categories: distributions.Distribution.sort((a, b) => a.ageCategory - b.ageCategory).map(d => getEnumKeyByValue(AgeCategories, d.ageCategory)) // X軸 kategorileri
            },
            series: [
                {
                    name: 'Female', // Seri adı
                    data: distributions.Distribution.map(d => d.womanCount), // Kadın sayıları
                    color: '#A93226' // Kadın grafiği rengi
                },
                {
                    name: 'Male', // Seri adı
                    data: distributions.Distribution.map(d => d.manCount), // Erkek sayıları
                    color: '#2471A3' // Erkek grafiği rengi
                }
            ],
            plotOptions: {
                bar: {
                    columnWidth: '50%', // Sütun genişliği
                    borderRadius: 4 // Sütun köşeleri yuvarlama
                }
            },
            dataLabels: {
                enabled: false // Veri etiketlerini gizleme
            },
            legend: {
                position: 'bottom', // Lejend konumu
                horizontalAlign: 'center' // Lejend hizalama
            },
            tooltip: {
                shared: false, // Her sütun için ayrı ipucu
                y: {
                    formatter: (value: number) => `${value.toLocaleString()} people` // Y ekseni ipucu formatı
                }
            },
            grid: {
                show: true, // Grid gösterimi
                borderColor: '#fff', // Grid rengi
                strokeDashArray: 10 // Grid çizgi stili
            },
            responsive: [
                {
                    breakpoint: 480, // Ekran genişliği 480px'den az olduğunda
                    options: {
                        chart: {
                            width: '100%' // Grafik genişliği
                        },
                        xaxis: {
                            labels: {
                                rotate: -90 // X軸ラベル回転
                            }
                        }
                    }
                }
            ],
            noData: {
                text: 'Loading...',
                align: 'center',
                verticalAlign: 'middle',
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: '#000000',
                    fontSize: '14px',
                    fontFamily: 'Helvetica'
                }
            }
        }
    }
}

const AGE_GENDER_DISTRIBUTION_QUERY = gql`
    query AgeGenderDistribution($filters: AnalysisFilterModel!) {
        ageGenderDistribution(filters: $filters) {
            data {
                Distribution {
                    ageCategory
                    womanCount
                    manCount
                }
                Total {
                    manCount
                    womanCount
                }
            }
            errors
            informations
            status
            warnings
        }
    }
`
