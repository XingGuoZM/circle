import { useEffect } from "react";
import { setDomStyle } from "../../utils";

const transition = "transform 0.5s linear";
// const DefaultTrailColor = "#ebeef5";
// const DefaultStrokeColor = "#409EFF";

export default function useBorderCircle({
  width,
  circleRef,
  percent,
  trailColor,
  strokeColor,
  strokeWidth,
  onComplete
}) {
  // console.log(percent);
  useEffect(() => {
    const circle = circleRef.current;

    const [left, right] = circle.children;
    setDomStyle(circle, {
      width,
      height: width,
      boxShadow: `0 0 0 ${strokeWidth} ${strokeColor} inset`
    });
    setDomStyle(left, {
      height: `calc(${width} - 2*${strokeWidth})`,
      transformOrigin: "100% 50%",
      borderRadius: `calc(${width} - ${width}/2) 0 0 calc(${width} - ${width}/2)`,
      borderWidth: strokeWidth,
      borderColor: `${trailColor} transparent ${trailColor} ${trailColor}`
    });
    setDomStyle(right, {
      height: `calc(${width} - 2*${strokeWidth})`,
      transformOrigin: "0 50%",
      borderRadius: `0 calc(${width} - ${width}/2) calc(${width} - ${width}/2) 0`,
      borderWidth: strokeWidth,
      borderColor: `${trailColor} ${trailColor} ${trailColor} transparent`
    });
  }, [width, strokeWidth, trailColor, strokeColor, circleRef]);

  useEffect(() => {
    const handleTransitionEnd = () =>
      percent >= 100 && onComplete && onComplete();

    const circle = circleRef.current;
    const [left, right] = circle.children;
    if (left && right && percent <= 100) {
      if (percent <= 0) {
        setDomStyle(left, { transform: "rotateZ(0deg)", transition: "none" });
        setDomStyle(right, {
          transform: "rotateZ(0deg)",
          transition: "transform 0s linear",
          borderColor: `${trailColor} ${trailColor} ${trailColor} transparent`
        });
      } else if (percent <= 50) {
        setDomStyle(left, { transition });
        setDomStyle(right, {
          transition,
          transform: `rotateZ(${(percent * 180 * 2) / 100}deg)`
        });
      } else {
        setDomStyle(right, {
          transform: "rotateZ(0deg)",
          transition: "transform 0s linear",
          borderColor: `${strokeColor} ${strokeColor} ${strokeColor} transparent`
        });
        setDomStyle(left, {
          transition,
          transform: `rotateZ(${((percent - 50) * 180 * 2) / 100}deg)`
        });
      }
    }
    circle.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      circle.removeEventListener("transitionend", handleTransitionEnd);
  }, [percent, onComplete, circleRef, trailColor, strokeColor]);
}
