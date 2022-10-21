import React from "react";
import CircleDemo from "./pages/CircleDemo";
import SvgCircleDemo from "./pages/SvgCircleDemo";
import DashboardDemo from "./pages/DashboardDemo";
import PieDemo from "./pages/PieDemo";

export default function App() {
  return (
    <div>
      <CircleDemo />
      <SvgCircleDemo />
      <DashboardDemo />
      <PieDemo />
    </div>
  );
}
