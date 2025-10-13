function Settings({ isSettingsOpen, setIsSettingsOpen }) {
    return (
        <>
            <button 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="fixed left-8 text-gray-800 p-4 z-50 transition-transform duration-500"
                style={{
                    bottom: '2rem',
                    transform: isSettingsOpen ? 'translateY(-28vh)' : 'translateY(0)',
                }}
            >
                {!isSettingsOpen ? (
                    <p className="text-white">Settings</p>
                ) : (
                    <span className="text-white text-3xl" title="Close Settings">⌵</span>
                )}
            </button>

            <div 
                className="fixed bottom-0 left-0 right-0 bg-black transition-transform duration-500 z-40"
                style={{ 
                    transform: isSettingsOpen ? 'translateY(0)' : 'translateY(100%)',
                    height: '40%'
                }}
            >
                <div className="p-8 text-white">
                    <div className="flex flex-row gap-4 mt-8">
                        <div>
                            <p>Set Date</p>
                        </div>
                        <div>
                            <p>Font Size</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;