import { useState } from 'react';
import CountdownTimer from './components/CountdownTimer.js';
import Settings from './components/Settings.js'

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [targetDate, setTargetDate] = useState(''); 
  const [fontSize, setFontSize] = useState(48);
  const [fontColor, setFontColor] = useState('#000000');
  const [background, setBackground] = useState({ 
        type: 'color', 
        value: '#ffffff' 
  });

  return (
    <div>
        <CountdownTimer 
          isSettingsOpen={isSettingsOpen} 
          targetDate={targetDate} 
          fontSize={fontSize} 
          fontColor={fontColor} 
          background={background}
        />
        <Settings 
          isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} 
          targetDate={targetDate} setTargetDate={setTargetDate} 
          fontSize={fontSize} setFontSize={setFontSize} 
          fontColor={fontColor} setFontColor={setFontColor} 
          background={background} setBackground={setBackground} 
        />
    </div>
  )
}

export default App;

