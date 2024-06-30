import { KTIcon } from "src/_metronic/helpers/components/KTIcon"
import { useThemeMode } from "src/_metronic/partials/layout/theme-mode/ThemeModeProvider"

type LocationCustomerCardProps = {
    data: {
        id: number
        name: string
        iconPath: string
        customerAnalysis: {
            currentCount: {
                value: number
                percentage: number
                capacity: number
            }
            customerPleasure: {
                value: number
                percentage: number
            }
            staffCount: {
                value: number
                total: number
            }
            staffPleasure: {
                value: number
                percentage: number
            }
        }
    }
    index: number
    total: number
    isTop: boolean
}

export const LocationCustomerCard: React.FC<LocationCustomerCardProps> = ({ data, index, total, isTop }) => {
    const { mode } = useThemeMode()
    const renderPercentageBadge = (percentage: number) => {
        const isPositive = percentage >= 0
        const badgeClass = isPositive ? 'badge-light-success' : 'badge-light-danger'
        const iconClass = isPositive ? 'arrow-up' : 'arrow-down'

        return (
            <span className={`badge ${badgeClass} fw-semibold ms-2`}>
                <KTIcon iconName={iconClass} className={`fs-6 me-1 ${badgeClass}`} />
                {Math.abs(percentage)}%
            </span>
        )
    }

    return (
        <div className="row rounded p-5 mb-7" style={{ backgroundColor: mode === 'dark' ? '#0e0e0e8c' : '#f7f6f78c' }}>
            <div className="col-3" style={{ marginTop: '10px' }}>
                {data.iconPath && <img className="me-5" width={30} alt={`${data.name} Logo`} src={data.iconPath} />}
                <a href="/" className="fw-bold text-gray-800 text-hover-primary fs-6">
                    {data.name}
                </a>
            </div>
            {[
                {
                    label: '# of Person',
                    value: `${data.customerAnalysis.currentCount.value} / ${data.customerAnalysis.currentCount.capacity}`,
                    percentage: data.customerAnalysis.currentCount.percentage
                },
                { label: 'Customer Pleasure', value: data.customerAnalysis.customerPleasure.value, percentage: data.customerAnalysis.customerPleasure.percentage },
                { label: '# of Staff', value: `${data.customerAnalysis.staffCount.value}` },
                { label: 'Staff Pleasure', value: data.customerAnalysis.staffPleasure.value, percentage: data.customerAnalysis.staffPleasure.percentage }
            ].map((item, idx) => (
                <div className="col-2" key={idx}>
                    <span className="text fw-semibold d-block fs-6" style={{ marginBottom: '4px', fontSize: '12px' }}></span>
                    <span className="fw-normal d-block fs-6" style={{ marginTop: '10px' }}>
                        {item.value}
                        {item.percentage !== undefined && renderPercentageBadge(item.percentage)}
                    </span>
                </div>
            ))}

            <div className="col-1">
                <a
                    href={`/location-analysis/${data.id}/customer`}
                    className="btn btn-sm btn-icon btn-active-color-primary"
                    style={{ marginTop: '5px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="fw-normal fs-6" style={{ whiteSpace: 'nowrap' }}>
                        See Detailed
                    </span>
                </a>
            </div>
        </div>
    )
}
