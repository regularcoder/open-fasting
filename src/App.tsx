import './App.css'
import { TimerSection } from './components/TimerSection'
import { FastHistory } from './components/FastHistory'
import { useFastingTimer } from './hooks/useFastingTimer'
import { useFastHistory } from './hooks/useFastHistory'

function App() {
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
        <div className="app">
            <div className="container">
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
            </div>
        </div>
    )
}

export default App
