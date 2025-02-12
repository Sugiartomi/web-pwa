import React from "react";
import { useRecoilState } from "recoil";
import { getTheme } from "../../recoil/theme.State";

export default function Layout({ title, children }) {
  const [ darkMode, setDarkMode] = useRecoilState(getTheme)
  return (
    <div className={ darkMode ? "k-line-chart-container bg-dark-mode2" : "k-line-chart-container"}>
      {/* <div className="k-line-chart-container"> */}
      {/* <h3 className="k-line-chart-title">{title}</h3> */}
      {children}
    </div>
  );
}
