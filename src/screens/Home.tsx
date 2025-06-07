import { ModernTimerDisplay } from '../components/ModernTimerDisplay'
import { FastHistory } from '../components/FastHistory'
import { useFastingTimer } from '../hooks/useFastingTimer'
import { useFastHistory } from '../hooks/useFastHistory'

export const Home = () => {
    const { fastHistory, addFast, deleteFast } = useFastHistory()
    
    const {
        fastingState,
        startTime,
        startFast,
        endFast,
        toggleTimeDisplay,
        updateStartTime,
        getDisplayTime,
        getTimeLabel
    } = useFastingTimer(addFast)

    return (
        <>
            <ModernTimerDisplay
                fastingState={fastingState}
                startTime={startTime}
                displayTime={getDisplayTime()}
                timeLabel={getTimeLabel()}
                onToggleTimeDisplay={toggleTimeDisplay}
                onStartFast={startFast}
                onFinishFast={endFast}
                onUpdateStartTime={updateStartTime}
            />

            <FastHistory
                fastHistory={fastHistory}
                onDeleteFast={deleteFast}
            />
        </>
    )
}