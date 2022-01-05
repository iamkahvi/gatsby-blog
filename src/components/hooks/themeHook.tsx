import React, { useState } from "react";
import { themeMap } from "./colorThemes.mjs";

export enum Themes {
  Classic = "classic",
  Bubblegum = "bubblegum",
  Pastel = "pastel",
  Artic = "artic",
  Forest = "forest",
  Purple = "purple",
  Blue = "blue",
  Dark = "dark",
}

interface Return {
  currTheme: Themes;
  setTheme: (t?: Themes) => void;
}

export const useTheme = (): Return => {
  const colorPref =
    typeof window !== "undefined" &&
    (window.localStorage.getItem("color-theme") as Themes);
  const hasPref = typeof colorPref === "string";

  const [currTheme, setCurrTheme] = useState(() =>
    hasPref ? colorPref : Themes.Classic
  );

  const setTheme = (theme?: Themes) => {
    const t = theme ?? randTheme(currTheme);
    window.localStorage.setItem("color-theme", t);
    setCurrTheme(t);
    setRootStyles(t);
  };

  return { currTheme, setTheme };
};

const setRootStyles = (theme: Themes) => {
  const root = document.documentElement;
  Object.entries(themeMap[theme]).forEach((val) => {
    const [k, v] = val;
    root.style.setProperty(k, v);

    // Ugly fix for selection color
    if (k == "--c-main") {
      root.style.setProperty("--c-main-selection", v + "50");
    }
  });
};

const randTheme = (currTheme: Themes): Themes => {
  const theme = Object.entries(themeMap)[
    Math.floor(Math.random() * Object.values(themeMap).length)
  ][0] as Themes;

  return theme !== currTheme ? theme : randTheme(currTheme);
};
