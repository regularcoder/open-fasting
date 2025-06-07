import { useState } from 'react'
import './App.css'
import { Home } from './screens/Home'
import { Settings } from './screens/Settings'
import { Info } from './screens/Info'
import { BottomNavigation } from './components/BottomNavigation'

function App() {
    const [activeTab, setActiveTab] = useState<'home' | 'settings' | 'info'>('home')

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <Home />
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
