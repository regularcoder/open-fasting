import type { FastingPhase } from '../types'
import { FASTING_PHASES } from '../types'

export const getCurrentFastingPhase = (elapsedHours: number): FastingPhase => {
  if (elapsedHours >= FASTING_PHASES['deep-ketosis']) {
    return 'deep-ketosis'
  } else if (elapsedHours >= FASTING_PHASES['ketosis']) {
    return 'ketosis'
  } else if (elapsedHours >= FASTING_PHASES['fat-burning']) {
    return 'fat-burning'
  } else {
    return 'starting'
  }
}

export const getFastingPhaseIcon = (phase: FastingPhase): string => {
  switch (phase) {
    case 'starting':
      return '🔄'
    case 'fat-burning':
      return '🔥'
    case 'ketosis':
      return '⚡'
    case 'deep-ketosis':
      return '🧠'
    default:
      return '🔄'
  }
}

export const getFastingPhaseLabel = (phase: FastingPhase): string => {
  switch (phase) {
    case 'starting':
      return 'Starting'
    case 'fat-burning':
      return 'Fat burning'
    case 'ketosis':
      return 'Ketosis'
    case 'deep-ketosis':
      return 'Deep ketosis'
    default:
      return 'Starting'
  }
}