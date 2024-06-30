import { useState } from 'react'

import { CSSTransition } from 'react-transition-group'

import { useAnalysisFilters } from '../Filter/AnalysisFiltersContext'

import FilterPanel from '../Filter/FilterPanel'
import { WidgetCardMemo } from '../Widget/WidgetCard'
import ApexChartWidget from '../Widget/ApexChartWidget'
import { AgeGenderDistributionOptionProvider } from './ChartOptionProviders/AgeGenderDistributionOptionProvider'
import { ChartFilters } from '../Widget/ChartFilters'
import { PersonCountByTimeOptionProvider } from './ChartOptionProviders/PersonCountByTimeOptionProvider'
import Toolbar, { ToolbarButton } from 'src/app/modules/toolbar/Toolbar'
import Content from 'src/_metronic/layout/components/content/Content'

const AgeGenderAnalysisPage = () => {
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
    const { state } = useAnalysisFilters()

    const toggleFilterPanel = () => {
        setIsFilterPanelOpen(!isFilterPanelOpen)
    }
    const exportReports = (value: string) => console.log('Exporting Reports', value)

    const toolbarButtons: ToolbarButton[] = [
        {
            title: 'General Filters',
            onClick: () => toggleFilterPanel()
        },
        {
            title: 'export',
            onClick: () => exportReports('export')
        }
    ]

    return (
        <Content>
            <Toolbar buttons={toolbarButtons} />
            <CSSTransition in={isFilterPanelOpen} timeout={200} classNames="filter-panel" unmountOnExit>
                <FilterPanel onClose={toggleFilterPanel} />
            </CSSTransition>

            <div className="row g-5 g-xl-8">
                <div className="col-xl-6">
                    <WidgetCardMemo
                        title="Age & Gender Distribution"
                        subTitle="Most: Sunday 45, Least: Monday 15"
                        timePeriodFilterOptions={{ enabled: false, filters: '', active: 'week' }}
                        chartFilterOptions={{ enabled: false, filters: [{ type: ChartFilters.Gender }] }}
                        widgets={[
                            {
                                widget: ApexChartWidget,
                                dataProvider: new AgeGenderDistributionOptionProvider(state.ageGenderAnalysis)
                            }
                        ]}
                    />
                </div>

                <div className="col-xl-6">
                    <WidgetCardMemo
                        title="Person Count"
                        subTitle="Most: Tuesday 814, Least: Wednesday 326"
                        timePeriodFilterOptions={{ enabled: true, filters: '', active: 'week' }}
                        chartFilterOptions={{ enabled: true, filters: [{ type: ChartFilters.AgeCategory }] }}
                        widgets={[
                            {
                                widget: ApexChartWidget,
                                dataProvider: new PersonCountByTimeOptionProvider(state.ageGenderAnalysis)
                            }
                        ]}
                    />
                </div>
            </div>
        </Content>
    )
}

export default AgeGenderAnalysisPage
