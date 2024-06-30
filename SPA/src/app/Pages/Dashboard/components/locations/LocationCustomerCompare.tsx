import { useState, useEffect } from 'react'
import { KTIcon } from 'src/_metronic/helpers'
import { v4 as uuidv4 } from 'uuid'
import { LocationCustomerCard } from './LocationCustomerCard'
import { LocationCustomerCompareDataProvider } from './LocationCustomerCompareDataProvider'

const columns = [
    { key: 'name', label: 'Name', sortable: false },
    { key: 'currentCount', label: '# of Person', sortable: true },
    { key: 'customerPleasure', label: 'Customer Pleasure', sortable: true },
    { key: 'staffCount', label: '# of Staff', sortable: true },
    { key: 'staffPleasure', label: 'Staff Pleasure', sortable: true }
]

export const LocationCustomerCompare = () => {
    const dataProvider = new LocationCustomerCompareDataProvider()
    const [sortCriteria, setSortCriteria] = useState('currentCount')

    const [top3, setTop3] = useState([])
    const [low3, setLow3] = useState([])

    const fetchData = async criteria => {
        dataProvider.setSortBy(criteria)
        const { top3, low3 } = await dataProvider.getPreparedData()
        setTop3(top3)
        setLow3(low3)
    }

    useEffect(() => {
        // Fetch data and update state
        fetchData(sortCriteria)
    }, [sortCriteria])

    const handleSortChange = async criteria => {
        setSortCriteria(criteria)
        fetchData(criteria)
    }

    const renderColumnHeader = () => {
        return (
            <div className="row mb-3">
                {columns.map(({ key, label, sortable }) => (
                    <div className={`col-${sortable ? '2' : '3'}`} key={key}>
                        {sortable ? (
                            <button
                                className={`btn btn-link p-0 ${sortCriteria === key ? 'text-primary' : ''}`}
                                onClick={() => sortable && handleSortChange(key)}
                                style={{ textDecoration: 'none', width: '100%', textAlign: 'left' }}>
                                <strong>{label}</strong>
                                {sortCriteria === key && <KTIcon iconName="arrow-down" className="ms-2" />}
                            </button>
                        ) : (
                            <strong>{label}</strong>
                        )}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div
            className={`card card-flush bgi-no-repeat bgi-size-cover bgi-position-x-end`}
            style={
                {
                    // backgroundColor: 'black',
                    // backgroundImage: `url('${toAbsoluteUrl('media/misc/compare-bg.jpg')}')`
                }
            }>
            <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold fs-3 mb-1">Location Performance Insights</span>
                    <span className="text-muted mt-1 fw-semibold fs-7">Total Location - 23 | Average Count: 435 | Average Pleasure: 65%</span>
                </h3>
                {/* <div className="card-toolbar">
                    <button
                        type="button"
                        className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                        data-kt-menu-trigger="click"
                        data-kt-menu-placement="bottom-end"
                        data-kt-menu-flip="top-end">
                        <KTIcon iconName="category" className="fs-2" />
                    </button>
                    <LocationCustomerCardOptions />
                </div> */}
                <div className="live-indicator">
                    <span className="live-dot"></span>
                    <span className="live-text">Live</span>
                </div>
            </div>

            <div className="card-body py-2">
                <div className="row">
                    <div className="col-4">
                        <h4 className="text-success mb-4">Best Performers - {columns.find(x => x.key === sortCriteria).label}</h4>
                    </div>
                </div>

                <div className="border-0 pt-5">{renderColumnHeader()}</div>

                {top3.map((data, index) => (
                    <div key={uuidv4()} className="mb-4 ">
                        <LocationCustomerCard key={uuidv4()} data={data} index={index} total={top3.length} isTop={true} />
                    </div>
                ))}

                <div className="separator separator-content my-14">
                    <span className="w-125px text-gray-500 fw-semibold fs-7">
                        <h1 className="text-gray-900 fw-bolder mb-3 fs-2">
                            <a href="/location-analysis/customer" className="text-decoration-none dot">
                                See All
                            </a>
                        </h1>
                    </span>
                </div>

                <div className="row mb-6">
                    <div className="col-4">
                        <h4 className="text-danger mb-4">Needs Attention - {columns.find(x => x.key === sortCriteria).label}</h4>
                    </div>
                </div>
                {renderColumnHeader()}

                {low3.map((data, index) => (
                    <div key={uuidv4()} className="mb-4">
                        <LocationCustomerCard key={uuidv4()} data={data} index={index} total={low3.length} isTop={false} />
                    </div>
                ))}
            </div>
        </div>
    )
}
