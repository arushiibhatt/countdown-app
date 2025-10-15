import { useState } from 'react';
import CountdownTimer from './components/CountdownTimer.js';
import Settings from './components/SettingsPanel.js'

function Background({ background, children }) {
    return(
        <div className="min-h-screen relative flex flex-col items-center justify-center"
        style={background.type === 'color' ? { 
            backgroundColor: background.value 
        } : {}}>
            {background.type === 'image' && (
            <img 
                src={background.value} 
                alt="Background"
                className="fixed inset-0 w-full h-full object-cover -z-10"/>
            )}
                    
            {background.type === 'video' && (
            <video 
                src={background.value} 
                autoPlay 
                loop 
                muted
                className="fixed inset-0 w-full h-full object-cover -z-10"
            />
            )}
            {children}
        </div>
    );
} 

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [background, setBackground] = useState({ 
        type: 'color', 
        value: '#ffffff' 
  });
  const [selectedCountdownId, setSelectedCountdownId] = useState(1);
  const [countdowns, setCountdowns] = useState([
  {
    id: 1,
    targetDate: '',
    styles: {
      days: { fontSize: 48, fontColor: '#000000', font: 'Arial' },
      hours: { fontSize: 48, fontColor: '#000000', font: 'Arial' },
      minutes: { fontSize: 48, fontColor: '#000000', font: 'Arial' },
      seconds: { fontSize: 48, fontColor: '#000000', font: 'Arial' },
    },
  }
  ]);

  // Get the currently selected countdown
  const selectedCountdown = countdowns.find(c => c.id === selectedCountdownId);

  // Update a specific countdown
  const updateCountdown = (id, updates) => {
    setCountdowns(prev => 
      prev.map(countdown => 
        countdown.id !== id
        ? countdown
        : updates.styles
        ? {
            ...countdown,
            styles: {
              ...countdown.styles,
              ...Object.fromEntries(
                Object.entries(updates.styles).map(([key, val]) => [
                  key,
                  { ...countdown.styles[key], ...val },
                ])
              ),
            },
          }
        : { ...countdown, ...updates }
      )
    );
  };

  // Add a new countdown
  const addCountdown = () => {
    const newId = Math.max(...countdowns.map(c => c.id), 0) + 1;
    const newCountdown = {
      styles: {
      days: { fontSize: 48, fontColor: '#000000', font: 'Arial' },
      hours: { fontSize: 48, fontColor: '#000000', font: 'Arial' },
      minutes: { fontSize: 48, fontColor: '#000000', font: 'Arial' },
      seconds: { fontSize: 48, fontColor: '#000000', font: 'Arial' },
    },
    };
    setCountdowns(prev => [...prev, newCountdown]);
    setSelectedCountdownId(newId); 
    };

  // Delete a countdown
  const deleteCountdown = (id) => {
    if (countdowns.length === 1) {
      alert("You must have at least one countdown!");
      return;
    }
    setCountdowns(prev => prev.filter(c => c.id !== id));
    // Select first remaining countdown
    const remaining = countdowns.filter(c => c.id !== id);
    if (remaining.length > 0) {
      setSelectedCountdownId(remaining[0].id);
    }
  };

  return (
    <div>
      <Background background={background}>
        {countdowns.map(countdown => (
          <CountdownTimer 
            key={countdown.id}
            countdown={countdown}
            isSelected={countdown.id === selectedCountdownId}
            onSelect={() => setSelectedCountdownId(countdown.id)}
            isSettingsOpen={isSettingsOpen} 
            background={background}
          />
        ))}
      </Background>

      <Settings 
        isSettingsOpen={isSettingsOpen} 
        setIsSettingsOpen={setIsSettingsOpen} 
        selectedCountdown={selectedCountdown}
        updateCountdown={updateCountdown}
        addCountdown={addCountdown}
        deleteCountdown={deleteCountdown}
        background={background} 
        setBackground={setBackground} 
        countdowns={countdowns}
      />
    </div>
  )
}

export default App;

