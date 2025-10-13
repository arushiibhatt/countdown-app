
import React, { useState, useEffect } from 'react';
import './Settings.css';
import settingsIcon from '../assets/settings.png';

function SettingsButton({ isSettingsOpen, setIsSettingsOpen }) {
    return (
        <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="fixed left-8 text-gray-800 p-4 z-50 transition-transform duration-1000"
            style={{
                bottom: '2rem',
                transform: isSettingsOpen ? 'translateY(-28vh)' : 'translateY(0)',
            }}
        >
            {!isSettingsOpen ? (
                <div className="flex gap-2 items-center">
                    <img src={settingsIcon} alt="Settings-Icon" className="w-5 h-5"/>
                    <p className="text-black">Settings</p>
                </div>
            ) : (
                <span className="text-white text-3xl" title="Close Settings">⌵</span>
            )}
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
        <div className="flex flex-col p-4 w-64">
            <p className="font-bold mb-2">Set Date</p>
            <div className="mb-2 text-sm text-gray-300"><span className="font-mono text-lg text-white">{displayDate} {displayTime}</span></div>
            <input 
                type="date" 
                className="p-2 font-mono rounded mb-2 bg-black text-white border border-gray-700" 
                value={date}
                onChange={handleDateChange}
            />
            <input 
                type="time" 
                className="p-2 font-mono rounded bg-black text-white border border-gray-700" 
                value={time}
                onChange={handleTimeChange}
            />
        </div>
    );
}

function FontSizePicker({ fontSize, setFontSize }) {
    const commonSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72, 96, 144, 200];

    return (
        <div className="flex flex-col p-4 w-32">
            <p className="font-bold mb-2">Font Size</p>
            <div className="flex gap-3 items-center mb-2">
                <input 
                    type="number"
                    min="8"
                    max="200"
                    value={fontSize}
                    onChange={e => setFontSize(e.target.value)}
                    className="w-20 px-3 py-2 rounded bg-black text-white border border-gray-600 text-center focus:outline-none focus:border-gray-400"
                />
                <input 
                    type="range"
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

function Settings({ isSettingsOpen, setIsSettingsOpen, targetDate, setTargetDate, fontSize, setFontSize }) {
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
                className="fixed bottom-0 left-0 right-0 bg-black transition-transform duration-1000 z-40"
                style={{ 
                    transform: isSettingsOpen ? 'translateY(0)' : 'translateY(100%)',
                    height: '40%'
                }}
            >
                <div className="p-8 text-white">
                    <div className="flex flex-row gap-4 mt-8">
                        <DateTimePicker date={date} time={time} setDate={setDate} setTime={setTime} />
                        <FontSizePicker fontSize={fontSize} setFontSize={setFontSize} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;