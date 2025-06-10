import { useState, useEffect } from 'react'
import type { FastRecord } from '../types'

interface UseFastHistoryReturn {
    fastHistory: FastRecord[]
    addFast: (startTime: Date, endTime: Date, duration: number) => void
    deleteFast: (fastId: string) => void
    updateFast: (fastId: string, updatedFields: Partial<Omit<FastRecord, 'id'>>) => void
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

    const updateFast = (fastId: string, updatedFields: Partial<Omit<FastRecord, 'id'>>) => {
        const updatedHistory = fastHistory.map(record => {
            if (record.id === fastId) {
                const updatedRecord = { ...record, ...updatedFields }
                
                // If both start and end times are modified, recalculate duration
                if (updatedFields.startTime && updatedFields.endTime) {
                    updatedRecord.duration = updatedRecord.endTime.getTime() - updatedRecord.startTime.getTime()
                }
                // If only start time is modified, recalculate duration
                else if (updatedFields.startTime) {
                    updatedRecord.duration = record.endTime.getTime() - updatedFields.startTime.getTime()
                }
                // If only end time is modified, recalculate duration
                else if (updatedFields.endTime) {
                    updatedRecord.duration = updatedFields.endTime.getTime() - record.startTime.getTime()
                }
                
                return updatedRecord
            }
            return record
        })
        
        setFastHistory(updatedHistory)
        localStorage.setItem('fastHistory', JSON.stringify(updatedHistory))
    }

    return {
        fastHistory,
        addFast,
        deleteFast,
        updateFast
    }
}