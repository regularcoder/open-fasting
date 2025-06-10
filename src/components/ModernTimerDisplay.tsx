import { useState } from 'react'
import { CircularProgress } from './CircularProgress'
import { EditTimeModal } from './EditTimeModal'
import { getCurrentFastingPhase, getFastingPhaseIcon, getFastingPhaseLabel } from '../utils/fastingPhases'
import { formatTime } from '../utils'
import type { FastingState } from '../types'

interface ModernTimerDisplayProps {
  fastingState: FastingState
  startTime: Date | null
  displayTime: number
  timeLabel: string
  onToggleTimeDisplay: () => void
  onStartFast: () => void
  onFinishFast: () => void
  onUpdateStartTime: (newTime: Date) => void
}

export const ModernTimerDisplay = ({
  fastingState,
  startTime,
  displayTime,
  timeLabel,
  onToggleTimeDisplay,
  onStartFast,
  onFinishFast,
  onUpdateStartTime
}: ModernTimerDisplayProps) => {
  const [showEditTime, setShowEditTime] = useState(false)

  const handleEditModalClose = (updatedTime?: Date) => {
    setShowEditTime(false)
    if (updatedTime) {
      onUpdateStartTime(updatedTime)
    }
  }

  // Calculate progress and phase info
  const calculateProgressAndPhase = () => {
    if (!startTime) return { progress: 0, phaseIcon: '🍽️', phaseLabel: 'Ready to fast' }
    
    const now = new Date()
    const elapsedMs = now.getTime() - startTime.getTime()
    const elapsedHours = elapsedMs / (1000 * 60 * 60)
    
    if (fastingState === 'fasting') {
      const progress = Math.max(1, Math.min((elapsedHours / 16) * 100, 100))
      const currentPhase = getCurrentFastingPhase(elapsedHours)
      return {
        progress,
        phaseIcon: getFastingPhaseIcon(currentPhase),
        phaseLabel: getFastingPhaseLabel(currentPhase)
      }
    } else {
      const progress = Math.max(1, Math.min((elapsedHours / 8) * 100, 100))
      return {
        progress,
        phaseIcon: '🍽️',
        phaseLabel: 'Eating window'
      }
    }
  }

  const { progress, phaseIcon, phaseLabel } = calculateProgressAndPhase()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const formatTimeOnly = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    })
  }

  if (!startTime) {
    return (
      <div className="modern-timer-display">
        <div className="timer-header">
          <h1 className="fasting-title">Start your fast!</h1>
        </div>
        <div className="timer-circle-container">
          <CircularProgress progress={0}>
            <div className="timer-content">
              <div className="elapsed-time">00:00:00</div>
              <div className="phase-indicator">
                <span className="phase-icon">🍽️</span>
                <span className="phase-label">Ready to fast</span>
              </div>
            </div>
          </CircularProgress>
        </div>
        <button className="finish-fast-button" onClick={onStartFast}>
          Start fasting
        </button>
      </div>
    )
  }

  return (
    <div className="modern-timer-display">
      {/* Header */}
      <div className="timer-header">
        <h1 className="fasting-title">
          {fastingState === 'fasting' ? "You're fasting!" : "You're eating!"}
        </h1>
      </div>

      {/* Circular Progress with Timer */}
      <div className="timer-circle-container">
        <div className="timer-start-end-info">
          <div className="timer-start-info">
            <span className="timer-label">Start</span>
            <div className="start-time-with-edit">
              <span className="start-time">{formatTimeOnly(startTime)}</span>
              {fastingState === 'fasting' && startTime && (
                <button
                  className="inline-edit-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEditTime(true);
                  }}
                  title="Edit start time"
                >
                  ✏️
                </button>
              )}
            </div>
          </div>
          <div className="timer-end-info">
            <span className="timer-label">Target</span>
            <span className="end-time">
              {(() => {
                const targetHours = fastingState === 'fasting' ? 16 : 8;
                const endTime = new Date(startTime.getTime() + targetHours * 60 * 60 * 1000);
                return formatTimeOnly(endTime);
              })()}
            </span>
          </div>
        </div>
        <CircularProgress progress={progress} strokeWidth={20}>
          <div className="timer-content" onClick={onToggleTimeDisplay} style={{ cursor: 'pointer' }}>
            <div className="start-info">
              <span className="past-fast-date">{formatDate(startTime)}</span>
            </div>
            <div className="elapsed-time">
              {formatTime(displayTime)}
            </div>
            <div className="time-label-small">{timeLabel}</div>
            <div className="phase-indicator">
              <span className="phase-icon">{phaseIcon}</span>
              <span className="phase-label">{phaseLabel}</span>
            </div>
          </div>
        </CircularProgress>
      </div>

      {/* Action Button */}
      <button className="finish-fast-button" onClick={fastingState === 'fasting' ? onFinishFast : onStartFast}>
        {fastingState === 'fasting' ? 'Finish fasting' : 'Start fasting'}
      </button>

      <EditTimeModal
        isOpen={showEditTime}
        startTime={startTime}
        onClose={handleEditModalClose}
      />
    </div>
  )
}