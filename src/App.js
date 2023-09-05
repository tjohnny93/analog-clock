import React from "react";
import { RecoilRoot } from "recoil";
import Clock from "./Components/Clock";
import TimeTooltip from "./Components/TimeTooltip";
import "./App.css";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Clock />
        <TimeTooltip />
      </div>
    </RecoilRoot>
  );
}

export default App;
