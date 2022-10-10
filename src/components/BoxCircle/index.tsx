import React, { useRef } from "react";
import useBorderCircle from "./useBorderCircle";
import { IBoxCircle } from "./types";
import "./index.css";

export default function BoxCircle(props: IBoxCircle) {
  const circleRef = useRef<HTMLDivElement>(null);
  useBorderCircle({ ...props, circleRef });
  return (
    <div ref={circleRef} className="circle-wrap">
      <div className="circle" />
      <div className="circle" />
    </div>
  );
}
