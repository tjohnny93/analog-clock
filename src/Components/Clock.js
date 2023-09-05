import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  clockState,
  tooltipVisibilityState,
  positionState,
} from "../Providers/recoilAtoms";
import "../Styles/Clock.css";

const Clock = () => {
  const [time, setTime] = useRecoilState(clockState);
  const [ , setTooltipPosition] = useRecoilState(positionState);
  const [ , setShowTooltip] = useRecoilState(tooltipVisibilityState);

  const calculateHandDegrees = () => {
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDeg = (seconds / 60) * 360 + 90;
    const minuteDeg = ((minutes + seconds / 60) / 60) * 360 + 90;
    const hourDeg = (((hours % 12) + minuteDeg / 360) / 12) * 360 + 90;

    return { secondDeg, minuteDeg, hourDeg };
  };

  const { secondDeg, minuteDeg, hourDeg } = calculateHandDegrees();

  const debounce = (func, delay) => {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseMove = (e) => {
    debounce(setTooltipPosition({ x: e.clientX, y: e.clientY }), 1000);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setTime]);

  return (
    <div className="clock-wrapper">
      <div className="title">
        <p>아날로그 시계 과제</p>
      </div>
      <div
        className="clock"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {[...Array(12)].map((x, i) => (
          <span key={i} style={{ "--i": i + 1 }}>
            <b>{i + 1}</b>
          </span>
        ))}
        <div className="center-dot"></div>
        <div
          className="hand hour-hand"
          style={{ transform: `rotate(${hourDeg}deg)` }}
        ></div>
        <div
          className="hand minute-hand"
          style={{ transform: `rotate(${minuteDeg}deg)` }}
        ></div>
        <div
          className="hand second-hand"
          style={{ transform: `rotate(${secondDeg}deg)` }}
        ></div>
      </div>
    </div>
  );
};

export default Clock;