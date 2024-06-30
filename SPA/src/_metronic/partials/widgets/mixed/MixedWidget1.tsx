import { FC } from 'react'
import { KTIcon } from '../../../helpers'
import { useThemeMode } from '../../layout/theme-mode/ThemeModeProvider'
import { useNavigate } from 'react-router-dom'

type Props = {
    className: string
    color: string
    img: string
    selectedLocation: string
}

const MixedWidget1: FC<Props> = ({ className, color, img, selectedLocation }) => {
    const { mode } = useThemeMode()
    const navigate = useNavigate()
    const buttonStyles = {
        backgroundColor: 'transparent',
        color: mode === 'dark' ? '#FFFFFF' : '#12131A', // Dark mod için beyaz, light mod için siyah metin rengi
        borderColor: mode === 'dark' ? '#1E1E2D' : '#E4E6EF', // Kenarlık rengi
        position: 'absolute',
        right: '15px',
        bottom: '15px',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '0.875rem',
        fontWeight: '500',
        cursor: 'pointer'
    }
    return (
        <div className={`card ${className} bgi-no-repeat bgi-size-contain bgi-position-x-end`}>
            {/* begin::Body */}
            <div className="card-body p-0">
                {/* begin::Header */}
                <div
                    className={`px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}
                    style={{
                        backgroundColor: color,
                        backgroundImage: `url('${img}')`
                    }}>
                    {/* begin::Heading */}
                    <div className="d-flex flex-stack">
                        <h3 className="m-0 fw-bold fs-3">Summary - {selectedLocation?.['name']}</h3>
                        <div className="ms-1">
                            {/* begin::Menu */}

                            <a className="btn btn-sm btn-secondary btn-color-muted btn-active btn-active-primary px-4 me-1" id="kt_charts_widget_2_year_btn">
                                Year
                            </a>

                            <a className="btn btn-sm btn-secondary btn-color-muted btn-active btn-active-primary px-4 me-1" id="kt_charts_widget_2_month_btn">
                                Month
                            </a>

                            <a className="btn btn-sm btn-color-muted btn-active btn-active-primary active px-4" id="kt_charts_widget_2_week_btn">
                                Week
                            </a>

                            <a className="btn btn-sm btn-secondary btn-color-muted btn-active btn-active-primary px-4" id="kt_charts_widget_2_week_btn">
                                Day
                            </a>
                            {/* end::Menu */}
                        </div>
                    </div>
                    {/* end::Heading */}
                    {/* begin::Balance */}
                    <div className="d-flex text-center flex-column pt-8">
                        <span className="fw-semibold fs-7"># of Faces Analyzed</span>
                        <span className="fw-bold fs-2x pt-1">123.424</span>
                    </div>
                    {/* end::Balance */}
                </div>
                {/* end::Header */}
                {/* begin::Items */}
                <div className="shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-body" style={{ marginTop: '-100px' }}>
                    {/* begin::Item */}
                    <div className="d-flex align-items-center mb-6">
                        {/* begin::Symbol */}
                        <div className="symbol symbol-45px w-40px me-5">
                            <span className="symbol-label bg-lighten">
                                <KTIcon iconName="happy-emoji" className="fs-1" />
                            </span>
                        </div>
                        {/* end::Symbol */}
                        {/* begin::Description */}
                        <div className="d-flex align-items-center flex-wrap w-100">
                            {/* begin::Title */}
                            <div className="mb-1 pe-3 flex-grow-1">
                                <a href="#" className="fs-5 text-gray-800 text-hover-primary fw-bold">
                                    Overall Pleasure
                                </a>
                                <div className="text-gray-500 fw-semibold fs-7">%72</div>
                            </div>
                            {/* end::Title */}
                            {/* begin::Label */}
                            <div className="d-flex align-items-center">
                                <div className="fw-bold fs-5 text-gray-800 pe-1">3.1%</div>
                                <KTIcon iconName="arrow-up" className="fs-5 text-success ms-1" />
                            </div>
                            {/* end::Label */}
                        </div>
                        {/* end::Description */}
                    </div>
                    {/* end::Item */}
                    {/* begin::Item */}
                    <div className="d-flex align-items-center mb-6">
                        {/* begin::Symbol */}
                        <div className="symbol symbol-45px w-40px me-5">
                            <span className="symbol-label bg-lighten">
                                <KTIcon iconName="people" className="fs-1" />
                            </span>
                        </div>
                        {/* end::Symbol */}
                        {/* begin::Description */}
                        <div className="d-flex align-items-center flex-wrap w-100">
                            {/* begin::Title */}
                            <div className="mb-1 pe-3 flex-grow-1">
                                <a href="#" className="fs-5 text-gray-800 text-hover-primary fw-bold">
                                    Total Visit
                                </a>
                                <div className="text-gray-500 fw-semibold fs-7">4562</div>
                            </div>
                            {/* end::Title */}
                            {/* begin::Label */}
                            <div className="d-flex align-items-center">
                                <div className="fw-bold fs-5 text-gray-800 pe-1">11%</div>
                                <KTIcon iconName="arrow-down" className="fs-5 text-danger ms-1" />
                            </div>
                            {/* end::Label */}
                        </div>
                        {/* end::Description */}
                    </div>
                    {/* end::Item */}
                    {/* begin::Item */}
                    <div className="d-flex align-items-center mb-6">
                        {/* begin::Symbol */}
                        <div className="symbol symbol-45px w-40px me-5">
                            <span className="symbol-label bg-lighten">
                                <KTIcon iconName="emoji-happy" className="fs-1" />
                            </span>
                        </div>
                        {/* end::Symbol */}
                        {/* begin::Description */}
                        <div className="d-flex align-items-center flex-wrap w-100">
                            {/* begin::Title */}
                            <div className="mb-1 pe-3 flex-grow-1">
                                <a href="#" className="fs-5 text-gray-800 text-hover-primary fw-bold">
                                    Top Emotion
                                </a>
                                <div className="text-gray-500 fw-semibold fs-7">Happy</div>
                            </div>
                            {/* end::Title */}
                        </div>
                        {/* end::Description */}
                    </div>
                    {/* end::Item */}
                    {/* begin::Item */}
                    <div className="d-flex align-items-center">
                        {/* begin::Symbol */}
                        <div className="symbol symbol-45px w-40px me-5">
                            <span className="symbol-label bg-lighten">
                                <KTIcon iconName="user-tick" className="fs-1" />
                            </span>
                        </div>
                        {/* end::Symbol */}
                        {/* begin::Description */}
                        <div className="d-flex align-items-center flex-wrap w-100">
                            {/* begin::Title */}
                            <div className="mb-1 pe-3 flex-grow-1">
                                <a href="#" className="fs-5 text-gray-800 text-hover-primary fw-bold">
                                    Most Frequently Visited Age Group
                                </a>
                                <div className="text-gray-500 fw-semibold fs-7">30-39</div>
                            </div>
                            {/* end::Title */}
                            {/* begin::Label */}
                            {/* end::Label */}
                        </div>
                        {/* end::Description */}
                    </div>
                    {/* end::Item */}
                </div>
                {/* Buton */}
                <div style={{ marginTop: '65px' }}>
                    <a href="#" className={`detail-analysis-btn ${mode}`}>
                        <span style={{ fontFamily: 'IBM Plex Sans', zIndex: 100000 }}> Go to detailed analysis</span>
                        <KTIcon iconName="arrow-right" className="ms-2" />
                    </a>
                </div>
                {/* end::Items */}
            </div>
            <style>
                {`
                    .detail-analysis-btn {
                        position: absolute;
                        right: 15px;
                        bottom: 15px;
                        display: flex;
                        align-items: center;
                        background-color: transparent;
                        color: ${mode === 'dark' ? '#FFFFFF' : '#12131A'};
                        padding: 10px 20px;
                        border-radius: 5px;
                        font-size: 0.875rem;
                        font-weight: 500;
                        text-decoration: none;
                        transition: color 0.3s;
                    }

                    .detail-analysis-btn:hover {
                        color: ${mode === 'dark' ? '#FFC107' : '#007BFF'}; // Dark modda sarı, light modda mavi renk
                    }

                    .detail-analysis-btn .kt-icon {
                        transition: transform 0.3s;
                    }

                    .detail-analysis-btn:hover .kt-icon {
                        transform: translateX(5px);
                    }
                `}
            </style>

            {/* end::Body */}
        </div>
    )
}

export { MixedWidget1 }
