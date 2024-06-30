export const getEnumKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value)
}

export const getKeyOfEnumByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value)
}

export enum Gender {
    Man = 'Man',
    Woman = 'Woman',
    Unisex = 'Both'
}

export enum AgeCategories {
    '0-2' = '0',
    '3-13' = '3',
    '13-19' = '13',
    '20-29' = '20',
    '30-39' = '30',
    '40-49' = '40',
    '50-59' = '50',
    '60+' = '60'
}

export enum DatetimeCategories {
    Yearly = 'Yearly',
    Monthly = 'Monthly',
    Weekly = 'Weekly',
    Daily = 'Daily',
    Hourly = 'Hourly',
    Minute = 'Minute'
}

export enum DayHours {
    '00:00' = 0, //auto-increment
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'
}

export enum Emotion {
    Happy = 'Happy',
    Angry = 'Angry',
    Sad = 'Sad',
    Disgust = 'Disgust',
    Neutral = 'Neutral',
    Fear = 'Fear',
    Surprise = 'Surprise'
}

export enum Months {
    January = 0, //auto-increment
    February,
    March,
    April,
    May,
    Jun,
    July,
    August,
    September,
    October,
    November,
    December
}

export enum RealtimeRanges {
    FiveMin = '5m',
    FifteenMin = '15m',
    HalfAnHour = '30m',
    AnHour = '1h',
    SixHour = '6h',
    TwelveHour = '12h'
}

export enum TimePeriods {
    HourOfDay = 'HoursOfDay',
    DayOfWeek = 'DaysOfWeek',
    DayOfMonth = 'DaysOfMonth',
    WeekOfMonth = 'WeeksOfMonth',
    MonthOfYear = 'MonthsOfYear'
}

export enum WeekDays {
    Monday = 1, //auto-increment
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}
