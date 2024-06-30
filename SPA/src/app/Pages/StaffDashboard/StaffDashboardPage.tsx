import { toAbsoluteUrl } from 'src/_metronic/helpers'
import Content from 'src/_metronic/layout/components/content/Content'
import { CardsWidget20, CardsWidget17, CardsWidget7 } from 'src/_metronic/partials/widgets'
import { CardsWidget31 } from 'src/_metronic/partials/widgets/_new/cards/CardsWidget31'
import EmotionAnalysisPage from '../Analysis/EmotionAnalysis/EmotionAnalysisPage'

export default function StaffDashboardPage() {
    return (
        <Content>
            <div className="row g-5 g-xl-10">
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                    <CardsWidget31 className="" />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                    <CardsWidget20 className="" description="Live Sessions" color="#F1416C" img={toAbsoluteUrl('media/patterns/vector-1.png')} />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                    <CardsWidget17 className="" />
                </div>

                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                    <CardsWidget7 className="" description="Staff" icon={false} stats={357} labelColor="dark" textColor="gray-300" />
                </div>
                <EmotionAnalysisPage></EmotionAnalysisPage>
            </div>
        </Content>
    )
}
