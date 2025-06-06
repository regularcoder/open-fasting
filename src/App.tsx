import { useState } from 'react'
import './App.css'
import { TimerSection } from './components/TimerSection'
import { FastHistory } from './components/FastHistory'
import { Settings } from './components/Settings'
import { Info } from './components/Info'
import { BottomNavigation } from './components/BottomNavigation'
import { useFastingTimer } from './hooks/useFastingTimer'
import { useFastHistory } from './hooks/useFastHistory'

function App() {
    const [activeTab, setActiveTab] = useState<'home' | 'settings' | 'info'>('home')
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

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
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
            case 'settings':
                return <Settings />
            case 'info':
                return <Info />
            default:
                return null
        }
    }

    return (
        <div className="app">
            <div className="container">
                {renderContent()}
            </div>
            <BottomNavigation 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
            />
        </div>
    )
}

export default App
