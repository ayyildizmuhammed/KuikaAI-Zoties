import { Emotion, Gender } from '../Filter/Models/AnalysisEnums'

export enum ChartFilters {
    Gender = 'Gender',
    AgeCategory = 'AgeCategory',
    Emotion = 'Emotion',
    RealtimeRange = 'RealtimeRange',
    TimeScale = 'TimeScale',
    TimePeriod = 'TimePeriod'
}

export const GenderFilter = ({ onChange }) => {
    const genderOptions = Object.values(Gender).map(gender => ({
        label: gender,
        value: gender
    }))
    return (
        <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Gender:</label>
            <select className="form-select form-select-solid fw-bolder" onChange={e => onChange('gender', e.target.value)}>
                {genderOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export const AgeCategoryFilter = ({ onChange }) => (
    <div className="mb-10">
        <label className="form-label fs-6 fw-bold">Age Categories:</label>
        <div className="d-flex">
            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                <input className="form-check-input" type="checkbox" value="A" defaultChecked={true} />
                <span className="form-check-label">All</span>
            </label>
            <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                <input className="form-check-input" type="checkbox" value="B" defaultChecked={true} />
                <span className="form-check-label">10-20</span>
            </label>

            <label className="form-check form-check-sm form-check-custom form-check-solid">
                <input className="form-check-input" type="checkbox" value="C" defaultChecked={true} />
                <span className="form-check-label">20-30</span>
            </label>
        </div>
    </div>
)

export const EmotionFilter = ({ onChange }) => {
    const emotionOptions = Object.values(Emotion).map(gender => ({
        label: gender,
        value: gender
    }))

    return (
        <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Emotions:</label>
            <select className="form-select form-select-solid fw-bolder" onChange={e => onChange('emotions', e.target.value)}>
                {emotionOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export const RealtimeRangeFilter = ({ onChange }) => {
    return (
        <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Realtime Range:</label>
            <select className="form-select form-select-solid fw-bolder" onChange={e => onChange('realtimeRange', e.target.value)}>
                <option value="FiveMin">Last 5 minutes</option>
                <option value="FifteenMin">Last 15 minutes</option>
                <option value="HalfAnHour">Last 30 minutes</option>
                <option value="AnHour">Last 1 hour</option>
                <option value="SixHours">Last 6 hours</option>
                <option value="TwelveHours">Last 12 hours</option>
            </select>
        </div>
    )
}

export const TimeScaleFilter = ({ onChange }) => {
    return (
        <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Time Scale:</label>
            <select className="form-select form-select-solid fw-bolder" onChange={e => onChange('timeScale', e.target.value)}>
                <option value="Yearly">TimePeriods</option>
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Daily">Daily</option>
                <option value="Hourly">Hourly</option>
                <option value="Minute">Minute</option>
            </select>
        </div>
    )
}

// TimePeriodFilter.js
export const TimePeriodFilter = ({ onChange }) => {
    return (
        <div className="mb-10">
            <label className="form-label fs-6 fw-bold">Time Period:</label>
            <select className="form-select form-select-solid fw-bolder" onChange={e => onChange('timePeriod', e.target.value)}>
                <option value="HourOfDay">Hour of Day</option>
                <option value="DayOfWeek">Day of Week</option>
                <option value="DayOfMonth">Day of Month</option>
                <option value="WeekOfMonth">Week of Month</option>
                <option value="MonthOfYear">Month of Year</option>
            </select>
        </div>
    )
}
