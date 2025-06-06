import {useEffect, useState} from 'react'
import './App.css'

interface FastRecord {
    id: string
    startTime: Date
    endTime: Date
    duration: number
}

type FastingState = 'fasting' | 'eating'

function App() {
    const [fastingState, setFastingState] = useState<FastingState>('eating')
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [timeRemaining, setTimeRemaining] = useState<number>(0)
    const [fastHistory, setFastHistory] = useState<FastRecord[]>([])
    const [fastingDuration] = useState<number>(16 * 60 * 60 * 1000) // 16 hours in milliseconds
    const [eatingDuration] = useState<number>(8 * 60 * 60 * 1000) // 8 hours in milliseconds
    const [showElapsed, setShowElapsed] = useState<boolean>(false)
    const [showEditTime, setShowEditTime] = useState<boolean>(false)

    useEffect(() => {
        const savedState = localStorage.getItem('fastingState')
        const savedStartTime = localStorage.getItem('startTime')
        const savedHistory = localStorage.getItem('fastHistory')

        if (savedState && savedStartTime) {
            setFastingState(savedState as FastingState)
            setStartTime(new Date(savedStartTime))
        }

        if (savedHistory) {
            const parsedHistory = JSON.parse(savedHistory).map((record: any) => ({
                ...record,
                startTime: new Date(record.startTime),
                endTime: new Date(record.endTime)
            }))
            setFastHistory(parsedHistory)
        }
    }, [])

    useEffect(() => {
        let interval: number | undefined

        if (fastingState === 'fasting' && startTime) {
            interval = setInterval(() => {
                const now = new Date()
                const elapsed = now.getTime() - startTime.getTime()
                const remaining = fastingDuration - elapsed

                if (remaining <= 0) {
                    endFast()
                } else {
                    setTimeRemaining(remaining)
                }
            }, 1000)
        } else if (fastingState === 'eating' && startTime) {
            interval = setInterval(() => {
                const now = new Date()
                const elapsed = now.getTime() - startTime.getTime()
                const remaining = eatingDuration - elapsed
                setTimeRemaining(remaining > 0 ? remaining : 0)
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [showElapsed, fastingState, startTime, fastingDuration])

    const startFast = () => {
        const now = new Date()
        setFastingState('fasting')
        setStartTime(now)
        setTimeRemaining(fastingDuration)
        localStorage.setItem('fastingState', 'fasting')
        localStorage.setItem('startTime', now.toISOString())
    }

    const endFast = () => {
        if (startTime) {
            const endTime = new Date()
            const duration = endTime.getTime() - startTime.getTime()

            const newRecord: FastRecord = {
                id: Date.now().toString(),
                startTime,
                endTime,
                duration
            }

            const updatedHistory = [newRecord, ...fastHistory]
            setFastHistory(updatedHistory)
            localStorage.setItem('fastHistory', JSON.stringify(updatedHistory))
        }

        setFastingState('eating')
        setStartTime(new Date())
        localStorage.setItem('fastingState', 'eating')
        localStorage.setItem('startTime', new Date().toISOString())
    }

    const formatTime = (milliseconds: number): string => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60))
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const toggleTimeDisplay = () => {
        console.log(`Toggling time display to ${!showElapsed}`)
        setShowElapsed(!showElapsed)
    }

    const getDisplayTime = () => {
        if (showElapsed && startTime) {
            const now = new Date()
            return now.getTime() - startTime.getTime()
        }

        return timeRemaining
    }

    const getTimeLabel = () => {
        return showElapsed ? 'Time Elapsed' : 'Time Remaining'
    }

    const deleteFast = (fastId: string) => {
        const updatedHistory = fastHistory.filter(record => record.id !== fastId)
        setFastHistory(updatedHistory)
        localStorage.setItem('fastHistory', JSON.stringify(updatedHistory))
    }

    const updateStartTime = (newStartTime: Date) => {
        setStartTime(newStartTime)
        localStorage.setItem('startTime', newStartTime.toISOString())
    }

    const formatDateTimeLocal = (date: Date): string => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    return (
        <div className="app">
            <div className="container">
                <header className="header">
                    <h1 className="title">Intermittent Fasting Tracker</h1>
                </header>

                <div className="timer-section">
                    <div className={`status-indicator ${fastingState}`} onClick={toggleTimeDisplay}
                         style={{cursor: 'pointer'}}>
                        {fastingState === 'fasting' ? '🕐' : '🍽️'}
                    </div>
                    <h2 className="status-text">
                        {fastingState === 'fasting' ? 'Fasting' : 'Eating Window'}
                    </h2>
                    <div onClick={toggleTimeDisplay} style={{cursor: 'pointer'}}>
                        <div className="timer">
                            {formatTime(getDisplayTime())}
                        </div>
                        <p className="timer-label">
                            {getTimeLabel()}
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
                            onClick={fastingState === 'fasting' ? endFast : startFast}
                        >
                            {fastingState === 'fasting' ? 'End Fast' : 'Start Fast'}
                        </button>
                    </div>
                </div>

                <div className="history-section">
                    <h3 className="history-title">Past Fasts</h3>
                    {fastHistory.length === 0 ? (
                        <p className="no-history">No fasting records yet. Start your first fast!</p>
                    ) : (
                        <div className="history-list">
                            {fastHistory.map((record) => (
                                <div key={record.id} className="history-item">
                                    <div className="history-content">
                                        <div className="history-duration">
                                            {formatTime(record.duration)}
                                        </div>
                                        <div className="history-dates">
                                            <span className="start-date">{formatDate(record.startTime)}</span>
                                            <span className="separator">→</span>
                                            <span className="end-date">{formatDate(record.endTime)}</span>
                                        </div>
                                    </div>
                                    <button 
                                        className="delete-button"
                                        onClick={() => deleteFast(record.id)}
                                        title="Delete this fast"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            {showEditTime && startTime && (
                <div className="modal-overlay" onClick={() => setShowEditTime(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Edit Start Time</h3>
                        <input
                            type="datetime-local"
                            defaultValue={formatDateTimeLocal(startTime)}
                            onChange={(e) => {
                                if (e.target.value) {
                                    updateStartTime(new Date(e.target.value))
                                }
                            }}
                            className="datetime-input"
                        />
                        <div className="modal-buttons">
                            <button 
                                className="cancel-button"
                                onClick={() => setShowEditTime(false)}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
