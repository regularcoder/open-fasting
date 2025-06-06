export interface FastRecord {
    id: string
    startTime: Date
    endTime: Date
    duration: number
}

export type FastingState = 'fasting' | 'eating'

export const FASTING_DURATION_HRS = 16
export const FASTING_DURATION_MS = FASTING_DURATION_HRS * 60 * 60 * 1000
export const EATING_DURATION_MS = (24 - FASTING_DURATION_HRS) * 60 * 60 * 1000