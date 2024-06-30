import { useState } from 'react'
import './FilterPanel.scss'
import { KTIcon } from '../../../../_metronic/helpers/components/KTIcon'
import { useAnalysisFilters } from './AnalysisFiltersContext'
import Flatpickr from 'react-flatpickr'
import { AnalysisFilterModel } from './Models/AnalysisFilterModel'
import { createFilter } from 'react-select'
import makeAnimated from 'react-select/animated'
import { useQuery } from '@apollo/client'
import { CAMERAS_QUERY } from './graphqlQueries'
import MotusSelectBox from '../../CommonComponents/MotusSelectBox'
import { useIntl } from 'react-intl'

const animatedComponents = makeAnimated()

//define props
interface FilterPanelProps {
    onClose: () => void
}

const FilterPanel = ({ onClose }: FilterPanelProps) => {
    const intl = useIntl()
    const { setFilters } = useAnalysisFilters()
    const analysisFilterModel = new AnalysisFilterModel()
    const [localFilters, setLocalFilters] = useState(analysisFilterModel)

    // set one week before-today as default date range
    const [selectedDateRange, setSelectedDateRange] = useState([new Date(2024, 0, 1), new Date()]) // Default date range [today, today

    const { data: camerasData, loading: camerasLoading } = useQuery(CAMERAS_QUERY)
    if (camerasLoading) return <div></div>

    const cameraOptions =
        camerasData?.getCameras.map(camera => ({
            value: camera.id,
            label: camera.name
        })) || []

    const handleFilterChange = (filterName: string, value: any) => {
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }))
    }

    const handleApplyFilters = () => {
        // convert daterange to startdate and enddate
        localFilters.startDate = selectedDateRange[0]
        localFilters.endDate = selectedDateRange[1]
        setFilters('ageGenderAnalysis', localFilters) // Global filtre state'ini güncelle
        onClose() // Filtre panelini kapat
    }

    return (
        <div className={`filter-panel menu menu-sub menu-sub-dropdown mb-5`}>
            <div className="px-7 py-5 d-flex justify-content-between align-items-center">
                <div className="fs-5 text-gray-900 fw-bolder">{intl.formatMessage({ id: 'FILTER_OPTIONS' })}</div>
                <button type="button" className="btn btn-icon btn-lg btn-light-primary" onClick={onClose}>
                    <KTIcon iconType="duotone" iconName="cross" />
                </button>
            </div>
            <div className="separator border-gray-200"></div>

            <div className="filter-panel-content px-7 py-5">
                <div className="filter-item">
                    <label className="form-label fw-bold">{intl.formatMessage({ id: 'DATE_RANGE' })}</label>
                    <div className="input-group flex-nowrap">
                        <Flatpickr
                            className="form-control form-control-solid"
                            value={selectedDateRange}
                            options={{
                                mode: 'range', // Aralık modunu etkinleştir
                                dateFormat: 'd.m.Y' // İstediğiniz tarih formatı
                            }}
                            onChange={([startDate, endDate]) => {
                                setSelectedDateRange([startDate, endDate])
                            }}
                        />
                    </div>
                </div>
                <div className="filter-item">
                    <MotusSelectBox
                        label={intl.formatMessage({ id: 'LOCATIONS' })}
                        components={animatedComponents}
                        defaultValue={cameraOptions}
                        options={cameraOptions}
                        isLoading={camerasLoading}
                        isMultiSelect={true}
                        onChange={value => handleFilterChange('locations', value)}
                        filterOption={createFilter({ ignoreCase: true, matchFrom: 'any' })}
                    />
                </div>
                <div className="filter-item">
                    <MotusSelectBox
                        label={intl.formatMessage({ id: 'CAMERAS' })}
                        components={animatedComponents}
                        defaultValue={cameraOptions}
                        options={cameraOptions}
                        isLoading={camerasLoading}
                        isMultiSelect={true}
                        onChange={value => handleFilterChange('cameras', value)}
                        filterOption={createFilter({ ignoreCase: true, matchFrom: 'any' })}
                    />
                </div>
                <div className="filter-item">
                    <MotusSelectBox
                        label={intl.formatMessage({ id: 'SESSIONS' })}
                        components={animatedComponents}
                        defaultValue={cameraOptions}
                        options={cameraOptions}
                        isLoading={camerasLoading}
                        isMultiSelect={true}
                        onChange={value => handleFilterChange('sessions', value)}
                        filterOption={createFilter({ ignoreCase: true, matchFrom: 'any' })}
                    />
                </div>
                <div className="filter-item">
                    <MotusSelectBox
                        label={intl.formatMessage({ id: 'TAGS' })}
                        components={animatedComponents}
                        defaultValue={cameraOptions}
                        options={cameraOptions}
                        isLoading={camerasLoading}
                        isMultiSelect={true}
                        onChange={value => handleFilterChange('tags', value)}
                        filterOption={createFilter({ ignoreCase: true, matchFrom: 'any' })}
                    />
                </div>
            </div>
            <div className="filter-panel-actions">
                <button type="button" onClick={handleApplyFilters} className="btn btn-primary fw-bold px-6" data-kt-menu-dismiss="true" data-kt-user-table-filter="filter">
                    Apply
                </button>
            </div>
        </div>
    )
}

export default FilterPanel
