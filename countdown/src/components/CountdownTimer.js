import { useState, useEffect, useRef } from 'react';
import Draggable from "react-draggable";  

function CountdownTimer({ countdown, onSelect }) {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const countdownRef = useRef(null);

    //update every second
    useEffect(() => {
        const target = countdown.targetDate ? new Date(countdown.targetDate) : new Date();

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
    });

    return (
            <div className="text-black mx-auto transition-all duration-500 flex flex-col justify-center 
            items-center cursor-pointer p-8 rounded-lg"
            >

                {/* countdown display */}
                <Draggable nodeRef={countdownRef} onMouseDown={onSelect}>
                <div ref={countdownRef} className="flex flex-col sm:flex-row justify-center gap-4">
                    <div className="text-center p-6 min-w-20"
                    style={{ color: countdown.styles.days.fontColor, fontFamily: countdown.styles.days.font }}>
                        <p className="font-bold"
                        style={{ fontSize: `${countdown.styles.days.fontSize * 2}px`}}>{days}</p>
                        <p className="text-lg text-black-600"
                        style={{ fontSize: `${countdown.styles.days.fontSize/2}px`}}>Days</p>
                    </div>
                    <div className="text-center p-6 min-w-20"
                    style={{ color: countdown.styles.hours.fontColor, fontFamily: countdown.styles.hours.font }}>
                        <p className="font-bold"
                        style={{ fontSize: `${countdown.styles.hours.fontSize * 2}px` }}>{hours}</p>
                        <p className="text-lg text-black-600"
                        style={{ fontSize: `${countdown.styles.hours.fontSize/2}px`}}>Hours</p>
                    </div>
                    <div className="text-center p-6 min-w-20"
                    style={{ color: countdown.styles.minutes.fontColor, fontFamily: countdown.styles.minutes.font }}>
                        <p className="font-bold"
                        style={{ fontSize: `${countdown.styles.minutes.fontSize * 2}px` }}>{minutes}</p>
                        <p className="text-lg text-black-600"
                        style={{ fontSize: `${countdown.styles.minutes.fontSize/2}px`}}>Minutes</p>
                    </div>
                    <div className="text-center p-6 min-w-20"
                    style={{ color: countdown.styles.seconds.fontColor, fontFamily: countdown.styles.seconds.font }}>
                        <p className="font-bold"
                        style={{ fontSize: `${countdown.styles.seconds.fontSize * 2}px` }}>{seconds}</p>
                        <p className="text-lg text-black-600"
                        style={{ fontSize: `${countdown.styles.seconds.fontSize/2}px`}}>Seconds</p>
                    </div>
                </div>
                </Draggable>
            </div>
    )
}

export default CountdownTimer;