import React from "react";

// x,y圆弧起始点，在3点钟方向，r圆弧的半径，clockwise顺时针
const defaultConfig = {
  id: 0,
  strokeWidth: 5,
  x: 77, // y + r
  y: 42, // taskProgressInfoWrapper的width/2
  r: 35, // taskProgressInfoWrapper的width/2 + strokeWidth
  radian: 359.9999,
  clockwise: 1,
  strokeColor: { "0%": "#FFF165", "100%": "#FFB03E" },
  trailColor: { "100%": "#ebeef5" },
};

export default (props) => {
  const { percent, config } = props;

  const {
    strokeWidth,
    id,
    x,
    y,
    r,
    radian,
    clockwise, // x,y圆心位置  r圆弧的半径  clockwise顺时针
    strokeColor,
    trailColor,
  } = config || defaultConfig;

  const drawArcByRadiusDeg = (startX, startY, dr, deg, clockwiseType) => {
    const cw = clockwiseType || 1;
    const dx = startX - dr + dr * Math.cos((deg * Math.PI) / 180);
    const dy =
      startY + (cw === 1 ? 1 : -1) * dr * Math.sin((deg * Math.PI) / 180);
    const bigOrSmall = deg > 180 ? 1 : 0;
    return {
      x: dx,
      y: dy,
      path: `M ${startX} ${startY} A ${dr} ${dr} 0 ${bigOrSmall} ${cw} ${dx} ${dy}`,
    };
  };
  // polyfill Object.entries
  if (!Object.entries) {
    Object.entries = function (obj) {
      const ownProps = Object.keys(obj);
      let i = ownProps.length;
      const resArray = new Array(i);
      while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
      return resArray;
    };
  }
  const stroke = Object.entries(strokeColor);
  const trail = Object.entries(trailColor);

  return (
    <svg
      width="100%"
      viewBox="0 0 85 85"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`stroke_${id}`} x1="0" y1="0" x2="1" y2="0">
          {trail.map((item) => (
            <stop key={item[0]} offset={item[0]} stopColor={item[1]} />
          ))}
        </linearGradient>
        <linearGradient id={`trail_${id}`} x1="0" y1="0" x2="0" y2="1">
          {stroke.map((item) => (
            <stop key={item[0]} offset={item[0]} stopColor={item[1]} />
          ))}
        </linearGradient>
      </defs>
      <path
        d={drawArcByRadiusDeg(x, y, r, radian, clockwise).path}
        stroke={`url(#stroke_${id})`}
        fillOpacity="0"
        strokeWidth={strokeWidth}
      />
      <path
        d={
          drawArcByRadiusDeg(x, y, r, (percent / 100) * radian, clockwise).path
        }
        stroke={`url(#trail_${id})`}
        strokeLinecap="round"
        fillOpacity="0"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};
