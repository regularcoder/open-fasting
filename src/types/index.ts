export interface FastRecord {
    id: string
    startTime: Date
    endTime: Date
    duration: number
}

export type FastingState = 'fasting' | 'eating'

export type FastingPhase = 'starting' | 'fat-burning' | 'ketosis' | 'deep-ketosis'

export const FASTING_DURATION_HRS = 16
export const FASTING_DURATION_MS = FASTING_DURATION_HRS * 60 * 60 * 1000
export const EATING_DURATION_MS = (24 - FASTING_DURATION_HRS) * 60 * 60 * 1000

// Fasting phase thresholds in hours
export const FASTING_PHASES = {
  'starting': 0,
  'fat-burning': 12,
  'ketosis': 16,
  'deep-ketosis': 24
}