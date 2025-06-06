import type {FastRecord} from '../types'
import { formatTime, formatDate } from '../utils'

interface HistoryItemProps {
    record: FastRecord
    onDelete: (fastId: string) => void
}

export const HistoryItem = ({ record, onDelete }: HistoryItemProps) => {
    return (
        <div className="history-item">
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
                onClick={() => onDelete(record.id)}
                title="Delete this fast"
            >
                🗑️
            </button>
        </div>
    )
}