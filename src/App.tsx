import { useState, useEffect } from 'react'
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

  useEffect(() => {
    const savedState = localStorage.getItem('fastingState')
    const savedStartTime = localStorage.getItem('startTime')
    const savedHistory = localStorage.getItem('fastHistory')

    if (savedState && savedStartTime) {
      setFastingState(savedState as FastingState)
      setStartTime(new Date(savedStartTime))
    }

    if (savedHistory) {
      setFastHistory(JSON.parse(savedHistory))
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
        setTimeRemaining(elapsed)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [fastingState, startTime, fastingDuration])

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

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">Intermittent Fasting Tracker</h1>
        </header>

        <div className="timer-section">
          <div className={`status-indicator ${fastingState}`}>
            {fastingState === 'fasting' ? '🕐' : '🍽️'}
          </div>
          <h2 className="status-text">
            {fastingState === 'fasting' ? 'Fasting' : 'Eating Window'}
          </h2>
          <div className="timer">
            {formatTime(timeRemaining)}
          </div>
          <p className="timer-label">
            {fastingState === 'fasting' ? 'Time Remaining' : 'Time Elapsed'}
          </p>
          
          <button 
            className={`action-button ${fastingState}`}
            onClick={fastingState === 'fasting' ? endFast : startFast}
          >
            {fastingState === 'fasting' ? 'End Fast' : 'Start Fast'}
          </button>
        </div>

        <div className="history-section">
          <h3 className="history-title">Past Fasts</h3>
          {fastHistory.length === 0 ? (
            <p className="no-history">No fasting records yet. Start your first fast!</p>
          ) : (
            <div className="history-list">
              {fastHistory.map((record) => (
                <div key={record.id} className="history-item">
                  <div className="history-duration">
                    {formatTime(record.duration)}
                  </div>
                  <div className="history-dates">
                    <span className="start-date">{formatDate(record.startTime)}</span>
                    <span className="separator">→</span>
                    <span className="end-date">{formatDate(record.endTime)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
