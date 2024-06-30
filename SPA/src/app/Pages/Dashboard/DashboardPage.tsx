import { useState } from 'react'
import { toAbsoluteUrl } from 'src/_metronic/helpers'
import Content from 'src/_metronic/layout/components/content/Content'
import { CardsWidget17, CardsWidget20, CardsWidget7, MixedWidget1 } from 'src/_metronic/partials/widgets'
import { CardsWidget31 } from 'src/_metronic/partials/widgets/_new/cards/CardsWidget31'
import { LocationCustomerCompare } from './components/locations/LocationCustomerCompare'
import MapComponent from './components/map/MapComponent'

export default function DashboardPage() {
    const [selectedLocation, setSelectedLocation] = useState('İstinye Park - İzmir')

    return (
        <Content>
            <div className="row g-5 g-xl-10">
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                    <CardsWidget20 className="" description="Live Sessions" color="#F1416C" img={toAbsoluteUrl('media/patterns/vector-1.png')} />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                    <CardsWidget17 className="" />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                    <CardsWidget31 className="" />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                    <CardsWidget7 className="" description="Total number of Staff" icon={false} stats={357} labelColor="dark" textColor="gray-300" />
                </div>
                <div className="col-xxl-12">
                    <LocationCustomerCompare></LocationCustomerCompare>
                </div>
                <div className="col-xxl-6">
                    <MixedWidget1 selectedLocation={selectedLocation} className="card-xl-stretch" color="muted" img={toAbsoluteUrl('media/patterns/vector-1.png')} />
                </div>

                <div className="col-xxl-6">
                    <MapComponent onLocationSelect={setSelectedLocation}></MapComponent>
                </div>

                {/* <div className="col-xxl-6">
                    <MixedWidget1 className="card-xl-stretch mb-xl-8" color="muted" img={toAbsoluteUrl('media/patterns/vector-1.png')} />
                    <WidgetCardMemo
                        title="Instant Count"
                        subTitle="Avg: 987 Max: Akasya Min:İstinye"
                        timePeriodFilterOptions={{ enabled: false, filters: '', active: 'live' }}
                        chartFilterOptions={{ enabled: true, filters: [{ type: ChartFilters.Gender }] }}
                        live={{ enabled: true, refreshRate: 5 }}
                        widgets={[
                            {
                                widget: ApexChartWidget,
                                dataProvider: new LiveOverallPersonCountProvider({})
                            }
                        ]}
                    />
                </div>
                <div className="col-xxl-6">
                    <WidgetCardMemo
                        title="Overall Pleasure"
                        subTitle="Avg: 61% Max: Akasya Min:İstinye"
                        timePeriodFilterOptions={{ enabled: true, filters: '', active: 'live' }}
                        chartFilterOptions={{ enabled: false, filters: [{ type: ChartFilters.Gender }] }}
                        live={{ enabled: true, refreshRate: 5 }}
                        widgets={[
                            {
                                widget: ApexChartWidget,
                                dataProvider: new LiveOverallPleasureProvider({})
                            }
                        ]}
                    />
                </div> */}
            </div>
        </Content>
    )
}
