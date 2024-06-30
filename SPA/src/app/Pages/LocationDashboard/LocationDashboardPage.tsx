import { toAbsoluteUrl } from "src/_metronic/helpers";
import Content from "src/_metronic/layout/components/content/Content";
import { CardsWidget7, CardsWidget17, CardsWidget20 } from "src/_metronic/partials/widgets";
import { CardsWidget31 } from "src/_metronic/partials/widgets/_new/cards/CardsWidget31";


export default function LocationDashboardPage() {
    return (
        <Content>
            <div className="row g-5 g-xl-10">
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                    <CardsWidget31 className="" />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                    <CardsWidget7 className="" description="Staff" icon={false} stats={357} labelColor="dark" textColor="gray-300" />
                </div>

                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                    <CardsWidget17 className="" />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3">
                    <CardsWidget20 className="" description="Live Sessions" color="#F1416C" img={toAbsoluteUrl('media/patterns/vector-1.png')} />
                </div>


            </div>
        </Content>
    )
}
