import React from "react";
import "./controller.css";

export default function Controller(props) {
  return (
    <div className="containerControl">
      <div className="temp">
      <label className="Clabel">Size</label>
        <input
          type="range"
          min={1}
          max={100}
          default={100}
          onChange={props.sizeChanger}
        />
      </div>

      <div className="temp">
      <label className="Clabel">Speed</label>
        <input
          type="range"
          min={10}
          max={50}
          onChange={props.speedChanger}
        />
      </div>
      
    </div>
  );
}
