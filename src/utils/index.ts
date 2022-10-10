import { CSSProperties } from "react";

export const setDomStyle = (target: HTMLDivElement, style: CSSProperties) => {
  const styleList = Object.entries(style);
  for (let [key, value] of styleList) {
    target.style[key] = value;
  }
};
