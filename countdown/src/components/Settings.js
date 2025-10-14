
import { useState, useEffect } from 'react';
import './Settings.css';

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

function DateTimePicker({ date, time, setDate, setTime }) {
    // Helper to get today's date in yyyy-mm-dd
    const getToday = () => {
        const d = new Date();
        return d.toISOString().slice(0, 10);
    };
    // Helper to get default time
    const getDefaultTime = () => '00:00';

    // Display selected date and time
    const displayDate = date || getToday();
    const displayTime = time || getDefaultTime();

    // Handle changes with defaults
    const handleDateChange = (e) => {
        setDate(e.target.value);
        if (!time) setTime(getDefaultTime());
    };
    const handleTimeChange = (e) => {
        setTime(e.target.value);
        if (!date) setDate(getToday());
    };

    return (
        <div className="flex flex-col px-4 mt-0 w-64">
            <p className="font-bold mb-2">Set Date</p>
            <div className="mb-2 text-sm text-gray-300"><span className="font-mono text-lg text-white">{displayDate} {displayTime}</span></div>
            <input 
                type="date" 
                id="date-picker"
                name="date"
                className="p-2 font-mono rounded mb-2 bg-black text-white border border-gray-700" 
                value={date}
                onChange={handleDateChange}
            />
            <input 
                type="time" 
                id="time-picker"
                name="time"
                className="p-2 font-mono rounded bg-black text-white border border-gray-700" 
                value={time}
                onChange={handleTimeChange}
            />
        </div>
    );
}

function FontSizePicker({ fontSize, setFontSize }) {
    return (
        <div className="flex flex-col px-4 mt-0w-32">
            <p className="font-bold mb-2">Font Size</p>
            <div className="flex gap-3 items-center mb-2">
                <input 
                    type="number"
                    id="font-size-number"
                    name="fontSize"
                    min="8"
                    max="200"
                    value={fontSize}
                    onChange={e => setFontSize(e.target.value)}
                    className="w-20 px-3 py-2 rounded bg-black text-white border border-gray-600 text-center focus:outline-none focus:border-gray-400"
                />
                <input 
                    type="range"
                    id="font-size-range"
                    name="fontSizeRange"
                    min="8"
                    max="200"
                    value={fontSize}
                    onChange={e => setFontSize(e.target.value)}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                />
            </div>
        </div>
    );
}

function FontColorPicker({ fontColor, setFontColor}) {
    return (
        <div className="flex flex-col px-4 mt-0 w-32">
            <p className="font-bold mb-2">Font Color</p>
            <input 
                type="color"
                id="font-color-picker"
                name="fontColor"
                value={fontColor}
                onChange={e => setFontColor(e.target.value)}
                className="w-10 h-10 p-0 border-0 bg-transparent cursor-pointer"
            />
        </div>
    );
}

function BackgroundPicker({ background, setBackground }) {
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            const type = file.type.startsWith('video/') ? 'video' : 'image';
            setBackground({ type, value: fileUrl });
        }
    };

    const handleColor = (e) => {
        setBackground({ type: 'color', value: e.target.value });
    };

    const clearBackground = () => {
        if (background.type !== 'color') {
            URL.revokeObjectURL(background.value);
        }
        setBackground({ type: 'color', value: '#ffffff' });
    };

    const isFile = background.type !== 'color';

    return (
        <div className="flex flex-col px-4 mt-0 w-64">
            <p className="font-bold mb-2">Background</p>
            <div className="flex flex-col gap-2 mb-3">
                <input 
                    type="color"
                    value={isFile ? '#ffffff' : background.value}
                    onChange={handleColor}
                    disabled={isFile}
                    className={`w-10 h-10 p-0 border-0 bg-transparent cursor-pointer ${isFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="Color Background"
                />
                </div>
                <div className="flex">
                    <label className="px-4 py-2 bg-black border border-gray-600 rounded text-white cursor-pointer hover:bg-gray-700 text-sm w-24 text-center">
                        Upload
                        <input 
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFile}
                            className="hidden"
                        />
                    </label>
                    {isFile && (
                    <div className="flex justify-between text-sm bg-black px-3 py-2 rounded">
                        <button 
                            onClick={clearBackground}
                            className="text-red-400 hover:text-red-300 text-xs"
                        >
                            Remove
                        </button>
                </div>
            )}
        </div>
        </div>
    );
}

function Settings({ isSettingsOpen, setIsSettingsOpen, targetDate, setTargetDate, fontSize, setFontSize, fontColor, setFontColor, background, setBackground }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    // Helper to get today's date in yyyy-mm-dd
    const getToday = () => {
        const d = new Date();
        return d.toISOString().slice(0, 10);
    };
    // Helper to get current time in hh:mm
    const getNow = () => {
        const d = new Date();
        return d.toTimeString().slice(0, 5);
    };
    // Helper to get default time
    const getDefaultTime = () => '00:00';

    useEffect(() => {
        // Case 1: nothing picked
        if (!date && !time) {
            setTargetDate(`${getToday()}T${getNow()}`);
        }
        // Case 2: date picked, no time
        else if (date && !time) {
            setTargetDate(`${date}T${getDefaultTime()}`);
        }
        // Case 3: time picked, no date
        else if (!date && time) {
            setTargetDate(`${getToday()}T${time}`);
        }
        // Case 4: both picked
        else if (date && time) {
            setTargetDate(`${date}T${time}`);
        }
    }, [date, time, setTargetDate]);

    return (
        <>
            <SettingsButton isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />
            <div 
                className="fixed bottom-0 left-0 right-0 bg-black transition-transform duration-500 z-40"
                style={{ 
                    transform: isSettingsOpen ? 'translateY(0)' : 'translateY(100%)',
                    height: '40%'
                }}
            >

                <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="absolute top-4 left-4 text-white text-3xl hover:text-gray-300 transition-colors"
                    title="Close Settings"
                >⌵</button>
            
                <div className="p-8 text-white">
                    <div className="flex flex-row gap-4 mt-8">
                        <DateTimePicker date={date} time={time} setDate={setDate} setTime={setTime} />
                        <FontSizePicker fontSize={fontSize} setFontSize={setFontSize} />
                        <FontColorPicker fontColor={fontColor} setFontColor={setFontColor} />
                        <BackgroundPicker background={background} setBackground={setBackground} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;