import { TimerSection } from '../components/TimerSection'
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
            <header className="header">
                <h1 className="title">Simple Fast<br/>(Intermittent Fasting Tracker)</h1>
            </header>

            <TimerSection
                fastingState={fastingState}
                startTime={startTime}
                displayTime={getDisplayTime()}
                timeLabel={getTimeLabel()}
                onToggleTimeDisplay={toggleTimeDisplay}
                onStartFast={startFast}
                onEndFast={endFast}
                onUpdateStartTime={updateStartTime}
            />

            <FastHistory
                fastHistory={fastHistory}
                onDeleteFast={deleteFast}
            />
        </>
    )
}