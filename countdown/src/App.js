import { useState } from 'react';
import './App.css';
import CountdownTimer from './components/CountdownTimer.js';
import Settings from './components/Settings.js'

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [targetDate, setTargetDate] = useState(''); 
  const [fontSize, setFontSize] = useState(48);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <CountdownTimer isSettingsOpen={isSettingsOpen} targetDate={targetDate} fontSize={fontSize}/>
        <Settings isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} 
        targetDate={targetDate} setTargetDate={setTargetDate} 
        fontSize={fontSize} setFontSize={setFontSize} />
    </div>
  )
}

export default App;

