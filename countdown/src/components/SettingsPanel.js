
import { useState, useEffect } from 'react';
import './Settings.css';
import { DateTimePicker, FontSizePicker, FontColorPicker, FontPicker, FontUploader, BackgroundPicker} from './SettingsControls.js';

//settings button component
function SettingsButton({ isSettingsOpen, setIsSettingsOpen }) {
    return (
        <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="fixed left-8 bottom-8 z-30 flex gap-2 items-center bg-black px-6 py-2 rounded-2xl hover:shadow-xl transition-shadow"
        >
            <p className="text-white">Settings</p>
        </button>
    );
}

const defaultFonts = [
  "Arial",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Trebuchet MS",
  "Comic Sans MS",
  "Lucida Console",
];

function Settings({ isSettingsOpen, setIsSettingsOpen, selectedCountdown, updateCountdown, addCountdown, deleteCountdown, countdowns, background, setBackground }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [fonts, setFonts] = useState(defaultFonts);

    //get today's date in yyyy-mm-dd
    const getToday = () => {
        const d = new Date();
        return d.toISOString().slice(0, 10);
    };

    const getDefaultTime = () => '00:00';

    //on button click, set date and time for selected countdown
    const handleSetDate = () => {
        if (!selectedCountdown) return;
        
        const selectedDate = date || getToday();
        const selectedTime = time || getDefaultTime();
        const newTargetDate = `${selectedDate}T${selectedTime}`;
        
        updateCountdown(selectedCountdown.id, { targetDate: newTargetDate });
    };

    //update settings panel based on selected countdown
    useEffect(() => {
    if (selectedCountdown?.targetDate) {
        const [datePart, timePart] = selectedCountdown.targetDate.split('T');
        setDate(datePart || '');
        setTime(timePart || '');
    } else {
        setDate('');
        setTime('');
    }
    }, [selectedCountdown]);

    return (
        <>
            <SettingsButton isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />
            <div 
                className="fixed bottom-0 left-0 right-0 bg-black transition-transform duration-500 z-40 overflow-y-auto"
                style={{ 
                    transform: isSettingsOpen ? 'translateY(0)' : 'translateY(100%)',
                    height: '40vh'
                }}
            >
                <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="absolute top-4 left-4 text-white text-3xl hover:text-gray-300 transition-colors"
                    title="Close Settings"
                >⌵</button>
            
                <div className="p-8 text-white">
                    {selectedCountdown && (
                        <div className="flex flex-row gap-4 mt-8 flex-wrap">
                            <div className="flex flex-col">
                                <div className="flex gap-2 items-end">
                                <DateTimePicker 
                                    date={date} 
                                    time={time} 
                                    setDate={setDate} 
                                    setTime={setTime} 
                                />
                                <button 
                                    onClick={handleSetDate}
                                    className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 h-fit mb-2"
                                >Set</button>
                                </div>
                                <div className="mt-8 flex gap-2">
                                    <button 
                                    onClick={addCountdown}
                                    className="px-6 py-2 bg-black rounded border border-gray-700 hover:bg-gray-800 w-32"
                                    >+ Add Date</button>
                                    
                                    {countdowns.length > 1 && (
                                    <button 
                                        onClick={() => deleteCountdown(selectedCountdown.id)}
                                        className="px-6 py-2 text-red-500 w-32"
                                    >Delete Date</button>
                                    )}
                                </div>
                            </div>
                            
                            {/* Individual Font Settings for Days, Hours, Minutes, Seconds */}
                            <div className="flex flex-col gap-6">
                                {["days", "hours", "minutes", "seconds"].map((unit) => (
                                    <div
                                    key={unit}
                                    className="flex flex-col bg-gray-900 rounded-xl p-2 gap-4"
                                    >
                                    <p className="font-bold text-sm capitalize w-20">{unit}</p>

                                    <div className="flex flex-wrap gap-4 flex-1">
                                        <div className="flex flex-row gap-20">
                                        <FontSizePicker
                                        fontSize={selectedCountdown.styles[unit].fontSize}
                                        setFontSize={(size) =>
                                            updateCountdown(selectedCountdown.id, {
                                            styles: {
                                                ...selectedCountdown.styles,
                                                [unit]: {
                                                ...selectedCountdown.styles[unit],
                                                fontSize: Number(size),
                                                },
                                            },
                                            })
                                        }
                                        />

                                        <FontColorPicker
                                        fontColor={selectedCountdown.styles[unit].fontColor}
                                        setFontColor={(color) =>
                                            updateCountdown(selectedCountdown.id, {
                                            styles: {
                                                ...selectedCountdown.styles,
                                                [unit]: {
                                                ...selectedCountdown.styles[unit],
                                                fontColor: color,
                                                },
                                            },
                                            })
                                        }
                                        />
                                        </div>

                                        <FontPicker
                                        font={selectedCountdown.styles[unit].font}
                                        setFont={(font) =>
                                            updateCountdown(selectedCountdown.id, {
                                            styles: {
                                                ...selectedCountdown.styles,
                                                [unit]: {
                                                ...selectedCountdown.styles[unit],
                                                font,
                                                },
                                            },
                                            })
                                        }
                                        fonts={fonts}
                                        />
                                    </div>
                                </div>
                                ))}
                            </div>

                            <BackgroundPicker 
                            background={background} 
                            setBackground={setBackground} 
                            />

                            <FontUploader fonts={fonts} setFonts={setFonts} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Settings;