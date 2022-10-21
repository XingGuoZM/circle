import { useEffect } from "react";

export default function useCanvasCircle({ id, r, angle, fillColor }) {
  useEffect(() => {
    const getCanvas = () => {
      const canvas = document.getElementById(id) as HTMLCanvasElement;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      return { canvas, ctx };
    };
    const drawCircle = () => {
      const { ctx } = getCanvas();
      ctx.beginPath();
      ctx.moveTo(r, r);
      ctx.arc(r, r, r, 0, angle);
      ctx.fillStyle = fillColor;
      ctx.fill();
    };
    const init = () => {
      const { canvas, ctx } = getCanvas();
      let width = canvas.width,
        height = canvas.height;
      if (window.devicePixelRatio) {
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.height = height * window.devicePixelRatio;
        canvas.width = width * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };

    init();
    drawCircle();
  }, [id]);
}
