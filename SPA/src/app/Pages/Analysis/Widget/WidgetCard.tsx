import React, { FunctionComponent, useState } from 'react'
import { KTIcon, WithChildren } from '../../../../_metronic/helpers'
import ChartWidgetFilter, { ChartWidgetFilterElement } from './ChartWidgetFilter'
import { AnalysisFilterModel } from '../Filter/Models/AnalysisFilterModel'
import { DataProvider } from '../Services/DataProvider'
import { ChartOptionProvider } from '../Services/ChartOptionProvider'
import './widget.scss'
import { Tooltip } from '@mui/material'

interface WidgetDataProviderPair {
    widget: FunctionComponent<{ dataProvider: DataProvider; live?: { enabled: boolean; refreshRate: number } }> // Widget bileşeni
    dataProvider?: ChartOptionProvider // Veri sağlayıcı // Data Provider base class
    className?: string
}

interface WidgetCardProps {
    title: string
    subTitle?: string
    timePeriodFilterOptions?: { enabled: boolean; filters: any; active: string }
    chartFilterOptions?: { enabled: boolean; filters: ChartWidgetFilterElement[] }
    widgets: WidgetDataProviderPair[]
    live?: { enabled: true; refreshRate: number }
}

const WidgetCard: React.FC<WidgetCardProps & WithChildren> = ({ title, subTitle, timePeriodFilterOptions, live, chartFilterOptions, widgets }) => {
    const [activeTimePeriod, setActiveTimePeriod] = useState(timePeriodFilterOptions?.active || 'week')
    const [updateKey, setUpdateKey] = useState(0)

    const handleApplyFilters = (filters: AnalysisFilterModel) => {
        widgets.forEach(({ dataProvider }) => {
            dataProvider.filters = filters
            dataProvider.fetchData()
            setUpdateKey(prevKey => prevKey + 1)
        })
    }

    const renderLiveIndicator = () => {
        if (!live?.enabled) return null

        return (
            <div className="live-indicator">
                <Tooltip title={`Refresh Rate: ${live.refreshRate}s`} placement="right">
                    <span className="live-dot"></span>
                </Tooltip>
                <span className="live-text">Live</span>
            </div>
        )
    }

    const renderChartFilterButton = () => {
        return (
            <>
                {chartFilterOptions?.enabled && (
                    <>
                        <button type="button" className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                            <KTIcon iconName="filter" className="fs-2" />
                        </button>
                        <ChartWidgetFilter onApplyFilters={handleApplyFilters} chartFilterElements={chartFilterOptions.filters} />
                    </>
                )}
            </>
        )
    }

    const renderCardToolbar = () => {
        return (
            <div className="card-toolbar" data-kt-buttons="true">
                {timePeriodFilterOptions?.enabled && <TimePeriodButtons setActiveTimePeriod={setActiveTimePeriod} activeTimePeriod={activeTimePeriod} />}
                {renderChartFilterButton()}
            </div>
        )
    }

    return (
        <div className={`card card-xl-stretch mb-5 mb-xl-8`}>
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold fs-3 mb-1">{title}</span>
                    <span className="text-muted fw-semibold fs-7">{subTitle}</span>
                </h3>
                {renderLiveIndicator()}
                {renderCardToolbar()}
            </div>

            <div className="card-body">
                {widgets.map(({ widget: Widget, dataProvider, className }, index) => (
                    <div key={index} className={className}>
                        <Widget key={`${index}-${updateKey}`} live={live} dataProvider={dataProvider} />
                    </div>
                ))}
            </div>
        </div>
    )
}

const TimePeriodButtons: FunctionComponent<{ setActiveTimePeriod: Function; activeTimePeriod: string }> = ({ setActiveTimePeriod, activeTimePeriod }) => {
    const timePeriods = ['year', 'month', 'week', 'day']
    return (
        <>
            {timePeriods.map(period => (
                <button
                    key={period}
                    className={`btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1 ${activeTimePeriod === period ? 'active' : ''}`}
                    onClick={() => setActiveTimePeriod(period)}>
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
            ))}
        </>
    )
}

const areEqual = (prevProps, nextProps) => {
    // Title kontrolü
    if (prevProps.title !== nextProps.title) return false
    // SubTitle kontrolü
    if (prevProps.subTitle !== nextProps.subTitle) return false
    // TimePeriodFilterOptions kontrolü
    if (prevProps.timePeriodFilterOptions?.active !== nextProps.timePeriodFilterOptions?.active) return false
    // ChartFilterOptions kontrolü (length ve her bir elementin type'ını kontrol et)
    if (prevProps.chartFilterOptions.filters.length !== nextProps.chartFilterOptions.filters.length) return false
    for (let i = 0; i < prevProps.chartFilterOptions.filters.length; i++) {
        if (prevProps.chartFilterOptions.filters[i].type !== nextProps.chartFilterOptions.filters[i].type) return false
    }

    // Widgets kontrolü (widgets array'inin length'i ve her bir widget/dataprovider çiftinin referans eşitliği)
    if (prevProps.widgets.length !== nextProps.widgets.length) return false
    for (let i = 0; i < prevProps.widgets.length; i++) {
        if (prevProps.widgets[i].widget !== nextProps.widgets[i].widget || prevProps.widgets[i].dataProvider.filters !== nextProps.widgets[i].dataProvider.filters) return false
    }

    // Tüm kontrolerden geçtiyse, prop'lar eşittir ve render edilmemelidir.
    return true
}

export const WidgetCardMemo = React.memo(WidgetCard, areEqual)
