import { gql } from '@apollo/client'
import ApolloClientSingleton from 'src/app/utils/ApolloClientSingleton'
import { AnalysisFilterModel } from '../../Filter/Models/AnalysisFilterModel'
import { ChartOptionProvider } from '../../Services/ChartOptionProvider'

type TimePeriodGenderDistribution = {
    timePeriod: string
    avgManCount: number
    avgWomanCount: number
}

export class PersonCountByTimeOptionProvider extends ChartOptionProvider {
    cleanup(): void {
        throw new Error('Method not implemented.')
    }
    constructor(public filters?: AnalysisFilterModel) {
        super(filters)
    }

    async fetchData(): Promise<TimePeriodGenderDistribution[]> {
        const x = await ApolloClientSingleton.getInstance().query({
            query: PERSON_COUNT_BY_TIME_QUERY,
            variables: { filters: this.filters }
        })
        return x.data.genderCountByTime.data.distributions
    }

    async getChartOptions(height?: string): Promise<ApexCharts.ApexOptions> {
        // Dummy veriler
        const distributions = await this.fetchData()
        const series = distributions.map(distribution => {
            return {
                name: distribution.timePeriod,
                data: [distribution.avgManCount, distribution.avgWomanCount]
            }
        })
        const xaxis = {
            categories: distributions.map(distribution => distribution.timePeriod)
        }

        // Chart seçenekleri
        return {
            series,
            chart: {
                type: 'line',
                height: height || '350px'
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: xaxis,
            tooltip: {
                shared: false,
                intersect: false
            },
            legend: {
                horizontalAlign: 'center'
            }
        }
    }
}

const PERSON_COUNT_BY_TIME_QUERY = gql`
    query GenderCountByTime($filters: AnalysisFilterModel!) {
        genderCountByTime(filters: $filters) {
            data {
                distributions {
                    timePeriod
                    avgManCount
                    avgWomanCount
                }
            }
            errors
            informations
            status
            warnings
        }
    }
`
