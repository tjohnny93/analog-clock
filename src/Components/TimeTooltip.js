import React from "react";
import { useRecoilState } from "recoil";
import { clockState, tooltipVisibilityState, positionState } from "../Providers/recoilAtoms";
import "../Styles/TimeTooltip.css";

const TimeTooltip = () => {
  const [time] = useRecoilState(clockState);
  const [tooltipPosition] = useRecoilState(positionState);
  const [showTooltip] = useRecoilState(tooltipVisibilityState);

  const timeTooltipStyle = {
    left: tooltipPosition.x + 15 ,
    top: tooltipPosition.y - 55,
  };

  return (
    <div>
      {
        showTooltip && 
        <div className="time-tooltip" style={timeTooltipStyle}>
          {time.toLocaleTimeString()}
        </div>
      }
    </div>
  );
};

export default TimeTooltip;
