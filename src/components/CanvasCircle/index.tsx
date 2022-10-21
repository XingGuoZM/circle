import React from "react";
import useCanvasCircle from "./useCanvasCircle";

interface IProps {
  id: string;
  r: number;
  angle: number;
  fillColor: string;
}

export default function CanvasCircle(props: IProps) {
  const { r, id } = props;
  useCanvasCircle(props);
  return <canvas id={id} width={2 * r} height={2 * r} />;
}
