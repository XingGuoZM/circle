
import React, { useCallback } from "react";
import SvgCircle from "../../components/SvgCircle";
import "./index.css";

export default function SvgCircleDemo() {
  const completeHandler = useCallback(() => {
    console.log("complete");
  }, []);
  return (
    <div className="svgCircleDemo">
      <div
        style={{
          width: "100px",
          height: "100px",
          transform: "rotateZ(-90deg)"
        }}
      >
        <SvgCircle duration={20000} onDuration={completeHandler} />
      </div>
      <div>自动增加（Svg Circle）</div>
    </div>
  );
}
