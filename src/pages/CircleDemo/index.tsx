import React, { useCallback, useEffect, useState } from "react";
import BoxCircle from "../../components/BoxCircle";
import "./index.css";
const duration = 12000; //12s
const speed = 1000 / 60 / duration;

export default function CircleDemo() {
  const [percent, setPercent] = useState(0);
  const handleComplete = useCallback(() => {
    console.log("completed");
  }, []);
  useEffect(() => {
    let id;
    const step = () => {
      setPercent((v) => (v + speed * 100 >= 100 ? 100 : v + speed * 100));
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(id);
    };
  }, [speed]);

  return (
    <div className="circleDemo">
      <BoxCircle
        width="100px"
        strokeWidth="5px"
        strokeColor="#409EFF"
        trailColor="#ebeef5"
        r="50px"
        percent={percent}
        onComplete={handleComplete}
      />
      <div>自动增加(Box Circle)</div>
    </div>
  );
}
