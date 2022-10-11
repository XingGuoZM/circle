import React, { useCallback, useState, useEffect } from "react";
import SvgCircle from "../../components/SvgCircle";
import "./index.css";

export default function SvgCircleDemo() {
  const duration = 20000;
  const speed = 1000 / 60 / duration;
  // 最少是0.01展示，否则有点丑
  const [percent, setPercent] = useState(1);
  const completeHandler = useCallback(() => {
    console.log("complete");
  }, []);
  useEffect(() => {
    let id;
    const step = () => {
      setPercent((v) => {
        let _v = v + speed * 100;
        if (_v >= 100) {
          _v = 0;
          completeHandler();
        }
        id = requestAnimationFrame(step);
        return _v;
      });
    };
    id = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(id);
    };
  }, [speed, completeHandler]);

  return (
    <div className="svgCircleDemo">
      <div
        style={{
          width: "100px",
          height: "100px",
          transform: "rotateZ(-90deg)",
        }}
      >
        <SvgCircle percent={percent} />
      </div>
      <div>自动增加（Svg Circle）</div>
    </div>
  );
}
