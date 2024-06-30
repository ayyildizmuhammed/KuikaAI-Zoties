import { AgeCategories, DatetimeCategories, Emotion, Gender, RealtimeRanges, TimePeriods } from './AnalysisEnums'

export class AnalysisFilterModel {
    sessionIds?: Array<string>

    startDate?: Date

    endDate?: Date

    cameraIds?: Array<string>

    cameraRegionIds?: Array<string>

    gender?: Gender

    ageCategories?: Array<AgeCategories>

    emotions?: Array<Emotion>

    timeScale?: DatetimeCategories

    timeScaleForChartContent?: DatetimeCategories

    timePeriod?: TimePeriods

    timeIntervalForChart?: Array<object>

    realtimeRange?: RealtimeRanges

    realtimeRangeMs?: number
}
