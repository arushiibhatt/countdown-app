import { useState } from 'react';
import './App.css';
import CountdownTimer from './components/CountdownTimer.js';
import Settings from './components/Settings.js'

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#36454F] flex flex-col items-center justify-center">
        <CountdownTimer isSettingsOpen={isSettingsOpen}/>
        <Settings isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />
    </div>
  )
}

export default App;
