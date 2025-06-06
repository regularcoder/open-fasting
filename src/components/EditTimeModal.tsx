import { useState } from 'react'
import { formatDateTimeLocal } from '../utils'

interface EditTimeModalProps {
    isOpen: boolean
    startTime: Date | null
    onClose: (updatedTime?: Date) => void
}

export const EditTimeModal = ({ isOpen, startTime, onClose }: EditTimeModalProps) => {
    const [currentTime, setCurrentTime] = useState<Date | null>(startTime)
    
    if (!isOpen || !startTime) return null

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setCurrentTime(new Date(e.target.value))
        }
    }

    const handleClose = () => {
        onClose(currentTime || undefined)
    }

    return (
        <div className="modal-overlay" onClick={() => onClose()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-title">Edit Start Time</h3>
                <input
                    type="datetime-local"
                    defaultValue={formatDateTimeLocal(startTime)}
                    onChange={handleTimeChange}
                    className="datetime-input"
                />
                <div className="modal-buttons">
                    <button 
                        className="cancel-button"
                        onClick={handleClose}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    )
}