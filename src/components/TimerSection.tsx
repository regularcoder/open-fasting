import { useState } from 'react'
import type {FastingState} from '../types'
import { formatTime } from '../utils'
import { EditTimeModal } from './EditTimeModal'

interface TimerSectionProps {
    fastingState: FastingState
    startTime: Date | null
    displayTime: number
    timeLabel: string
    onToggleTimeDisplay: () => void
    onStartFast: () => void
    onEndFast: () => void
    onUpdateStartTime: (newTime: Date) => void
}

export const TimerSection = ({
    fastingState,
    startTime,
    displayTime,
    timeLabel,
    onToggleTimeDisplay,
    onStartFast,
    onEndFast,
    onUpdateStartTime
}: TimerSectionProps) => {
    const [showEditTime, setShowEditTime] = useState(false)

    const handleEditModalClose = (updatedTime?: Date) => {
        setShowEditTime(false)
        if (updatedTime) {
            onUpdateStartTime(updatedTime)
        }
    }

    return (
        <>
            <div className="timer-section">
                <div 
                    className={`status-indicator ${fastingState}`} 
                    onClick={onToggleTimeDisplay}
                    style={{ cursor: 'pointer' }}
                >
                    {fastingState === 'fasting' ? '🕐' : '🍽️'}
                </div>
                <h2 className="status-text">
                    {fastingState === 'fasting' ? 'Fasting' : 'Eating Window'}
                </h2>
                <div onClick={onToggleTimeDisplay} style={{ cursor: 'pointer' }}>
                    <div className="timer">
                        {formatTime(displayTime)}
                    </div>
                    <p className="timer-label">
                        {timeLabel}
                    </p>
                </div>

                <div className="action-buttons">
                    {fastingState === 'fasting' && startTime && (
                        <button
                            className="edit-time-button"
                            onClick={() => setShowEditTime(true)}
                            title="Edit start time"
                        >
                            ✏️
                        </button>
                    )}
                    <button
                        className={`action-button ${fastingState}`}
                        onClick={fastingState === 'fasting' ? onEndFast : onStartFast}
                    >
                        {fastingState === 'fasting' ? 'End Fast' : 'Start Fast'}
                    </button>
                </div>
            </div>

            <EditTimeModal
                isOpen={showEditTime}
                startTime={startTime}
                onClose={handleEditModalClose}
            />
        </>
    )
}