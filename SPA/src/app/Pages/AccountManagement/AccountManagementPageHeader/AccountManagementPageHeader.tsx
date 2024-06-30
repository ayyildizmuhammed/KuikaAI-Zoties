import { useSelector } from 'react-redux'
import * as Mui from '@mui/icons-material'
import { KTIcon } from 'src/_metronic/helpers'
import Content from 'src/_metronic/layout/components/content/Content'
import PageHeaderWrapper from 'src/app/modules/PageHeaderWrapper/PageHeaderWrapper'
import { useIntl } from 'react-intl'

export default function AccountManagementPageHeader() {
    const intl = useIntl()

    const navigations = [
        { title: intl.formatMessage({ id: 'LOCATIONS' }), path: '/account-management/locations' },
        { title: intl.formatMessage({ id: 'USERS' }), path: '/account-management/users' }
    ]

    return (
        <Content>
            <PageHeaderWrapper navigations={navigations} imagePath={'/media/svg/brand-logos/bigChefLogo.png'} infoComponent={Info()} />
        </Content>
    )

    function Info() {
        return (
            <div className="flex-grow-1" style={{ marginBottom: 0 }}>
                <div className="d-flex justify-content-between align-items-start flex-wrap">
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center" style={{ paddingBottom: 0, paddingTop: 0 }}>
                            <span className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1 mt-0">BigChefs</span>
                            <KTIcon iconName="verify" className="fs-1 text-primary" />
                        </div>

                        <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2 mt-14">
                            <div className="motus-horizontal-stack">
                                <span className="d-flex align-items-center text-gray-500 text-hover-primary mb-2">
                                    <KTIcon iconName="profile-circle" className="fs-4 me-1" />
                                    Staff: {30}
                                </span>
                                <span className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2" style={{ paddingLeft: 15 }}>
                                    <Mui.VideoCameraFrontOutlined className="fs-4 me-1"></Mui.VideoCameraFrontOutlined>
                                    Cameras : {20}
                                </span>
                                <span className="d-flex align-items-center text-gray-500 text-hover-primary mb-2">
                                    <Mui.CalendarMonthOutlined className="fs-4 me-1"></Mui.CalendarMonthOutlined>
                                    Sessions: {2}
                                </span>
                                <span className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2" style={{ paddingLeft: 15 }}>
                                    <KTIcon iconName="geolocation" className="fs-4 me-1" />
                                    Türkiye
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
