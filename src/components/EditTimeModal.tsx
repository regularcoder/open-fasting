import { useState, useEffect } from 'react'

interface EditTimeModalProps {
    isOpen: boolean
    startTime: Date | null
    onClose: (updatedTime?: Date) => void
}

export const EditTimeModal = ({ isOpen, startTime, onClose }: EditTimeModalProps) => {
    const [date, setDate] = useState<string>('')
    const [time, setTime] = useState<string>('')

    // Update state when startTime changes or modal opens
    useEffect(() => {
        if (startTime && isOpen) {
            const dateStr = `${startTime.getFullYear()}-${(startTime.getMonth() + 1).toString().padStart(2, '0')}-${startTime.getDate().toString().padStart(2, '0')}`
            const timeStr = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`
            
            setDate(dateStr)
            setTime(timeStr)
        }
    }, [startTime, isOpen])
    
    if (!isOpen || !startTime) return null

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value)
    }

    const handleClose = () => {
        if (date && time) {
            const updatedDateTime = new Date(`${date}T${time}`)
            onClose(updatedDateTime)
        } else {
            onClose()
        }
    }

    return (
        <div className="modal-overlay" onClick={() => onClose()}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-title">Edit Start Time</h3>
                
                <div className="datetime-inputs">
                    <div className="input-group">
                        <label className="input-label">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                            className="date-input"
                        />
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label">Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={handleTimeChange}
                            className="time-input"
                        />
                    </div>
                </div>
                
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