import React, { useState } from 'react'
import { AgeCategoryFilter, ChartFilters, EmotionFilter, GenderFilter } from './ChartFilters'

interface ChartWidgetFilterProps {
    onApplyFilters: (filters: any) => void
    chartFilterElements: ChartWidgetFilterElement[]
}

export interface ChartWidgetFilterElement {
    type: ChartFilters
}

const filterComponents = {
    Gender: GenderFilter,
    AgeCategory: AgeCategoryFilter,
    Emotion: EmotionFilter
}

const ChartWidgetFilter: React.FC<ChartWidgetFilterProps> = ({ onApplyFilters, chartFilterElements }) => {
    const [filters, setFilters] = useState({})

    const handleFilterChange = (filterName: string, value: any) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }))
    }

    const resetFilters = () => {
        setFilters({})
    }

    const applyFilters = () => {
        onApplyFilters(filters)
    }

    const renderChartFilterElements = () => {
        if (!chartFilterElements) return null
        return (
            <div>
                {chartFilterElements.map((filter, index) => {
                    const FilterComponent = filterComponents[filter.type]
                    return FilterComponent ? <FilterComponent key={index} onChange={handleFilterChange} /> : null
                })}
            </div>
        )
    }

    return (
        <div className="menu menu-sub menu-sub-dropdown w-300px w-md-325px" data-kt-menu="true">
            {/* begin::Header */}
            <div className="px-7 py-5">
                <div className="fs-5 text-gray-900 fw-bolder">Filter Options</div>
            </div>
            {/* end::Header */}

            {/* begin::Separator */}
            <div className="separator border-gray-200"></div>
            {/* end::Separator */}

            {/* begin::Content */}
            <div className="px-7 py-5" data-kt-user-table-filter="form">
                {renderChartFilterElements()}
                {/* begin::Actions */}
                <div className="d-flex justify-content-end">
                    <button type="button" onClick={resetFilters} className="btn btn-light btn-active-light-primary fw-bold me-2 px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="reset">
                        Reset
                    </button>
                    <button type="button" onClick={applyFilters} className="btn btn-primary fw-bold px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="filter">
                        Apply
                    </button>
                </div>
                {/* end::Actions */}
            </div>
            {/* end::Content */}
        </div>
    )
}

export default ChartWidgetFilter
