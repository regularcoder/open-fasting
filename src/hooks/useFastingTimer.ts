import { useState, useEffect } from 'react'
import type { FastingState } from '../types'
import { FASTING_DURATION_MS, EATING_DURATION_MS } from '../types'

interface UseFastingTimerReturn {
    fastingState: FastingState
    startTime: Date | null
    timeRemaining: number
    showElapsed: boolean
    startFast: () => void
    endFast: () => void
    toggleTimeDisplay: () => void
    updateStartTime: (newStartTime: Date) => void
    getDisplayTime: () => number
    getTimeLabel: () => string
}

export const useFastingTimer = (onFastComplete: (startTime: Date, endTime: Date, duration: number) => void): UseFastingTimerReturn => {
    const [fastingState, setFastingState] = useState<FastingState>('eating')
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [timeRemaining, setTimeRemaining] = useState<number>(0)
    const [showElapsed, setShowElapsed] = useState<boolean>(false)

    useEffect(() => {
        const savedState = localStorage.getItem('fastingState')
        const savedStartTime = localStorage.getItem('startTime')
        const savedShowElapsed = localStorage.getItem('showElapsed')

        if (savedState && savedStartTime) {
            setFastingState(savedState as FastingState)
            setStartTime(new Date(savedStartTime))
        }
        
        if (savedShowElapsed !== null) {
            setShowElapsed(savedShowElapsed === 'true')
        }
    }, [])

    useEffect(() => {
        let interval: number | undefined

        if (fastingState === 'fasting' && startTime) {
            interval = setInterval(() => {
                const now = new Date()
                const elapsed = now.getTime() - startTime.getTime()
                const remaining = FASTING_DURATION_MS - elapsed

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
                const remaining = EATING_DURATION_MS - elapsed
                setTimeRemaining(remaining > 0 ? remaining : 0)
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [showElapsed, fastingState, startTime])

    const startFast = () => {
        const now = new Date()
        setFastingState('fasting')
        setStartTime(now)
        setTimeRemaining(FASTING_DURATION_MS)
        localStorage.setItem('fastingState', 'fasting')
        localStorage.setItem('startTime', now.toISOString())
    }

    const endFast = () => {
        if (startTime) {
            const endTime = new Date()
            const duration = endTime.getTime() - startTime.getTime()
            onFastComplete(startTime, endTime, duration)
        }

        setFastingState('eating')
        setStartTime(new Date())
        localStorage.setItem('fastingState', 'eating')
        localStorage.setItem('startTime', new Date().toISOString())
    }

    const toggleTimeDisplay = () => {
        const newShowElapsed = !showElapsed
        setShowElapsed(newShowElapsed)
        localStorage.setItem('showElapsed', newShowElapsed.toString())
    }

    const updateStartTime = (newStartTime: Date) => {
        setStartTime(newStartTime)
        localStorage.setItem('startTime', newStartTime.toISOString())
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

    return {
        fastingState,
        startTime,
        timeRemaining,
        showElapsed,
        startFast,
        endFast,
        toggleTimeDisplay,
        updateStartTime,
        getDisplayTime,
        getTimeLabel
    }
}