import React from "react";
import CanvasCircle from "../../components/CanvasCircle";
import "./index.css";

export default function PieDemo() {
  const config = {
    r: 60,
    angle: (5 * Math.PI) / 3,
    fillColor: "#67c23a",
  };
  console.log();
  return (
    <div className="pieDemoWrap">
      <div
        style={{
          transform: "rotateZ(-90deg)",
        }}
      >
        <CanvasCircle id="pieDemo" {...config} />
      </div>
      <div className="pieDemoText">{Math.ceil((5 / 6) * 100)}%</div>
    </div>
  );
}
