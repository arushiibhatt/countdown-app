import { useRef, useState, useEffect } from 'react';
import Draggable from "react-draggable";

function CountdownTimer({ isSettingsOpen }) {
    const nodeRef = useRef(null);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const targetDate = new Date('2026-12-31T23:59:59'); 

    //update every second
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;
            if (difference <= 0) {
                clearInterval(interval);
                setDays(0);
                setHours(0);
                setMinutes(0);
                setSeconds(0);
            } else {
                setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
                setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
                setMinutes(Math.floor((difference / (1000 * 60)) % 60));
                setSeconds(Math.floor((difference / 1000) % 60));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div 
            className="bg-white rounded-3xl p-12 text-black mx-auto transition-transform duration-500 flex flex-col justify-center items-center w-[90vh] h-[60vh]"
            style={{ transform: isSettingsOpen ? 'translateY(-40%)' : 'translateY(0)' }}
        >
            <div className="text-center mb-12">
                <h1 className="text-3xl">Countdown Title</h1>
            </div>
            <div className="flex justify-center gap-4">
                <div className="text-center p-6 min-w-20">
                    <p className="text-6xl font-bold mb-2">{days}</p>
                    <p className="text-lg text-gray-600">Days</p>
                </div>
                <div className="text-center p-6 min-w-20">
                    <p className="text-6xl font-bold mb-2">{hours}</p>
                    <p className="text-lg text-gray-600">Hours</p>
                </div>
                <div className="text-center p-6 min-w-20">
                    <p className="text-6xl font-bold mb-2">{minutes}</p>
                    <p className="text-lg text-gray-600">Minutes</p>
                </div>
                <div className="text-center p-6 min-w-20">
                    <p className="text-6xl font-bold mb-2">{seconds}</p>
                    <p className="text-lg text-gray-600">Seconds</p>
                </div>
            </div>
        </div>
    )
}

export default CountdownTimer;