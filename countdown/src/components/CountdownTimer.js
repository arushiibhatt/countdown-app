import { useRef, useState, useEffect } from 'react';
import Draggable from "react-draggable";

function CountdownTimer({ isSettingsOpen, targetDate, fontSize }) {
    const nodeRef = useRef(null);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const target = targetDate ? new Date(targetDate) : new Date();

    //update every second
    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const difference = target - now;
            if (difference <= 0) {
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
        };
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [target]);

    return (
        <div 
            className="text-black mx-auto transition-transform duration-1000 flex flex-col justify-center items-center"
            style={{ transform: isSettingsOpen ? 'translateY(-40%)' : 'translateY(0)' }}
        >
            <div className="text-center mb-12">
                <h1 className="text-3xl">Countdown Title</h1>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div className="text-center p-6 min-w-20">
                    <p className="font-bold"
                    style={{ fontSize: `${fontSize * 2}px` }}>{days}</p>
                    <p className="text-lg text-gray-600">Days</p>
                </div>
                <div className="text-center p-6 min-w-20">
                    <p className="font-bold"
                    style={{ fontSize: `${fontSize * 2}px` }}>{hours}</p>
                    <p className="text-lg text-gray-600">Hours</p>
                </div>
                <div className="text-center p-6 min-w-20">
                    <p className="font-bold"
                    style={{ fontSize: `${fontSize * 2}px` }}>{minutes}</p>
                    <p className="text-lg text-gray-600">Minutes</p>
                </div>
                <div className="text-center p-6 min-w-20">
                    <p className="font-bold"
                    style={{ fontSize: `${fontSize * 2}px` }}>{seconds}</p>
                    <p className="text-lg text-gray-600">Seconds</p>
                </div>
            </div>
        </div>
    )
}

export default CountdownTimer;