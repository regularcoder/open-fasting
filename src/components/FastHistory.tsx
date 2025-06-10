import type { FastRecord } from '../types'
import { HistoryItem } from './HistoryItem'

interface FastHistoryProps {
    fastHistory: FastRecord[]
    onDeleteFast: (fastId: string) => void
    onUpdateFast: (fastId: string, updatedFields: Partial<Omit<FastRecord, 'id'>>) => void
}

export const FastHistory = ({ fastHistory, onDeleteFast, onUpdateFast }: FastHistoryProps) => {
    return (
        <div className="history-section">
            <h3 className="history-title">Past Fasts</h3>
            {fastHistory.length === 0 ? (
                <p className="no-history">No fasting records yet. Start your first fast!</p>
            ) : (
                <div className="history-list">
                    {fastHistory.map((record) => (
                        <HistoryItem 
                            key={record.id} 
                            record={record} 
                            onDelete={onDeleteFast}
                            onUpdate={onUpdateFast}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}