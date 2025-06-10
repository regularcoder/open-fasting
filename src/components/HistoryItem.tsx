import { useState } from 'react'
import type {FastRecord} from '../types'
import { formatTime, formatDate } from '../utils'
import { EditTimeModal } from './EditTimeModal'

interface HistoryItemProps {
    record: FastRecord
    onDelete: (fastId: string) => void
    onUpdate: (fastId: string, updatedFields: Partial<Omit<FastRecord, 'id'>>) => void
}

export const HistoryItem = ({ record, onDelete, onUpdate }: HistoryItemProps) => {
    const [editModalType, setEditModalType] = useState<'start' | 'end' | null>(null)
    
    const handleEditModalClose = (updatedTime?: Date) => {
        if (updatedTime && editModalType) {
            if (editModalType === 'start') {
                onUpdate(record.id, { startTime: updatedTime })
            } else if (editModalType === 'end') {
                onUpdate(record.id, { endTime: updatedTime })
            }
        }
        setEditModalType(null)
    }
    return (
        <div className="history-item">
            <div className="history-content">
                <div className="history-duration">
                    {formatTime(record.duration)}
                </div>
                <div className="history-dates">
                    <div className="date-with-edit">
                        <span className="start-date">{formatDate(record.startTime)}</span>
                        <button
                            className="inline-edit-button"
                            onClick={() => setEditModalType('start')}
                            title="Edit start time"
                        >
                            ✏️
                        </button>
                    </div>
                    <span className="separator">→</span>
                    <div className="date-with-edit">
                        <span className="end-date">{formatDate(record.endTime)}</span>
                        <button
                            className="inline-edit-button"
                            onClick={() => setEditModalType('end')}
                            title="Edit end time"
                        >
                            ✏️
                        </button>
                    </div>
                </div>
            </div>
            <button 
                className="delete-button"
                onClick={() => onDelete(record.id)}
                title="Delete this fast"
            >
                🗑️
            </button>
            
            {editModalType === 'start' && (
                <EditTimeModal
                    isOpen={true}
                    startTime={record.startTime}
                    onClose={handleEditModalClose}
                    title="Edit Start Time"
                />
            )}
            
            {editModalType === 'end' && (
                <EditTimeModal
                    isOpen={true}
                    startTime={record.endTime}
                    onClose={handleEditModalClose}
                    title="Edit End Time"
                />
            )}
        </div>
    )
}