import { useState } from 'react'

import { WidgetCardMemo } from '../Widget/WidgetCard'
import Toolbar, { ToolbarButton } from '../../../modules/toolbar/Toolbar'
import FilterPanel from '../Filter/FilterPanel'
import { CSSTransition } from 'react-transition-group'
import ApexChartWidget from '../Widget/ApexChartWidget'
import { ChartFilters } from '../Widget/ChartFilters'
import { useAnalysisFilters } from '../Filter/AnalysisFiltersContext'
import { AverageEmotionDistributionOptionProvider } from './ChartOptionProviders/AverageEmotionDistributionOptionProvider'
import { EmotionDistributionByTimeOptionProvider } from './ChartOptionProviders/EmotionDistributionByTimeOptionProvider'

const EmotionAnalysisPage = () => {
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
    const { state } = useAnalysisFilters()

    const toggleFilterPanel = () => setIsFilterPanelOpen(!isFilterPanelOpen)
    const exportReports = (value: string) => console.log('Exporting Reports', value)

    const toolbarButtons: ToolbarButton[] = [
        {
            title: 'General Filters',
            onClick: () => toggleFilterPanel()
        },
        {
            title: 'Export',
            onClick: () => exportReports('export')
        }
    ]

    return (
        <div>
            <Toolbar buttons={toolbarButtons} />
            <CSSTransition in={isFilterPanelOpen} timeout={200} classNames="filter-panel" unmountOnExit>
                <FilterPanel onClose={toggleFilterPanel} />
            </CSSTransition>

            <div className="row g-5 g-xl-8">
                <div className="col-xl-6">
                    <WidgetCardMemo
                        title="Emotion Analysis Over Time"
                        timePeriodFilterOptions={{ enabled: true, filters: '', active: 'week' }}
                        chartFilterOptions={{ enabled: true, filters: [{ type: ChartFilters.Gender }, { type: ChartFilters.AgeCategory }, { type: ChartFilters.TimeScale }] }}
                        widgets={[
                            {
                                widget: ApexChartWidget,
                                dataProvider: new EmotionDistributionByTimeOptionProvider(state.emotionAnalysis)
                            }
                        ]}
                    />
                </div>
                <div className="col-xl-6">
                    <WidgetCardMemo
                        title="Dominant Emotion Distribution"
                        timePeriodFilterOptions={{ enabled: false, filters: '', active: 'week' }}
                        chartFilterOptions={{ enabled: true, filters: [{ type: ChartFilters.Gender }, { type: ChartFilters.AgeCategory }] }}
                        widgets={[
                            {
                                widget: ApexChartWidget,
                                dataProvider: new AverageEmotionDistributionOptionProvider(state.emotionAnalysis)
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default EmotionAnalysisPage
