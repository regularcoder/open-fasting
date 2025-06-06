interface BottomNavigationProps {
    activeTab: 'home' | 'settings' | 'info'
    onTabChange: (tab: 'home' | 'settings' | 'info') => void
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
    const tabs = [
        { id: 'home' as const, icon: '🏠', label: 'Home' },
        { id: 'settings' as const, icon: '⚙️', label: 'Settings' },
        { id: 'info' as const, icon: 'ℹ️', label: 'Info' }
    ]

    return (
        <nav className="bottom-navigation">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                    aria-label={tab.label}
                >
                    <span className="nav-icon">{tab.icon}</span>
                    <span className="nav-label">{tab.label}</span>
                </button>
            ))}
        </nav>
    )
}