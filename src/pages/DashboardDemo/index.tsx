import React from "react";
import SvgCircle from "../../components/SvgCircle";
import "./index.css";

const DashbordConfig = {
  strokeWidth: 10,
  x: 77, // y + r
  y: 42, // taskProgressInfoWrapper的width/2
  r: 35, // taskProgressInfoWrapper的width/2 + strokeWidth
  radian: 270,
  clockwise: 1,
  strokeColor: { "100%": "rgb(245, 108, 108)" },
  trailColor: { "100%": "#ebeef5" },
};

export default function SvgCircleDemo() {
  const percent = 10;
  return (
    <div className="dashboardDemo">
      <div
        style={{
          width: "100px",
          height: "100px",
          transform: "rotateZ(135deg)",
        }}
      >
        <SvgCircle
          id="dashboardDemo"
          percent={percent}
          config={DashbordConfig}
        />
      </div>
      <div style={{ position: "absolute", top: "40px" }}>{percent}%</div>
      <div>仪表盘（Svg Circle）</div>
    </div>
  );
}
