import { useState, useEffect } from "react";

// x,y圆弧起始点，在3点钟方向，r圆弧的半径，clockwise顺时针
const defaultConfig = {
  strokeWidth: 5,
  x: 77, // y + r
  y: 42, // taskProgressInfoWrapper的width/2
  r: 35, // taskProgressInfoWrapper的width/2 + strokeWidth
  clockwise: 1,
  barList: { "0%": "#FFF165", "100%": "#FFB03E" },
  bgList: { "100%": "#ebeef5" },
};

export default (props) => {
  const { duration, config, onDuration } = props;
  const speed = 1000 / 60 / duration;

  const {
    strokeWidth,
    x,
    y,
    r,
    clockwise, // x,y圆心位置  r圆弧的半径  clockwise顺时针
    barList,
    bgList,
  } = Object.assign({}, config, defaultConfig);

  // 最少是0.01展示，否则有点丑
  const [percent, setPercent] = useState(0.01);

  const drawArcByRadiusDeg = (startX, startY, dr, deg, clockwiseType) => {
    const cw = typeof clockwiseType !== "undefined" ? clockwiseType : 1;
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

  useEffect(() => {
    let id;
    const step = () => {
      setPercent((v) => {
        let _v = v + speed;
        if (_v >= 1) {
          _v = 0;
          onDuration && onDuration();
        }
        id = requestAnimationFrame(step);
        return _v;
      });
    };
    id = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(id);
    };
  }, [onDuration, speed]);
  if (!Object.entries) {
    Object.entries = function (obj) {
      const ownProps = Object.keys(obj);
      let i = ownProps.length;
      const resArray = new Array(i);
      while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
      return resArray;
    };
  }
  const bar = Object.entries(barList);
  const bg = Object.entries(bgList);
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgLine" x1="0" y1="0" x2="1" y2="0">
          {bg.map((item) => (
            <stop key={item[0]} offset={item[0]} stopColor={item[1]} />
          ))}
        </linearGradient>
        <linearGradient id="progressLine" x1="0" y1="0" x2="0" y2="1">
          {bar.map((item) => (
            <stop key={item[0]} offset={item[0]} stopColor={item[1]} />
          ))}
        </linearGradient>
      </defs>
      <path
        d={drawArcByRadiusDeg(x, y, r, 359.9999, clockwise).path}
        stroke="url(#bgLine)"
        fillOpacity="0"
        strokeWidth={strokeWidth}
      />
      <path
        d={drawArcByRadiusDeg(x, y, r, percent * 359.9999, clockwise).path}
        stroke="url(#progressLine)"
        fillOpacity="0"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};
