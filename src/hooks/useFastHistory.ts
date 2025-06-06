import { useState, useEffect } from 'react'
import type { FastRecord } from '../types'

interface UseFastHistoryReturn {
    fastHistory: FastRecord[]
    addFast: (startTime: Date, endTime: Date, duration: number) => void
    deleteFast: (fastId: string) => void
}

export const useFastHistory = (): UseFastHistoryReturn => {
    const [fastHistory, setFastHistory] = useState<FastRecord[]>([])

    useEffect(() => {
        const savedHistory = localStorage.getItem('fastHistory')
        if (savedHistory) {
            const parsedHistory = JSON.parse(savedHistory).map((record: any) => ({
                ...record,
                startTime: new Date(record.startTime),
                endTime: new Date(record.endTime)
            }))
            setFastHistory(parsedHistory)
        }
    }, [])

    const addFast = (startTime: Date, endTime: Date, duration: number) => {
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

    const deleteFast = (fastId: string) => {
        const updatedHistory = fastHistory.filter(record => record.id !== fastId)
        setFastHistory(updatedHistory)
        localStorage.setItem('fastHistory', JSON.stringify(updatedHistory))
    }

    return {
        fastHistory,
        addFast,
        deleteFast
    }
}