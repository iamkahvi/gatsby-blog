import React, { useState } from "react";
import { themeMap } from "./colorThemes.mjs";

export enum Themes {
  Classic = "classic",
  Bubblegum = "bubblegum",
  Pastel = "pastel",
  Artic = "artic",
  Forest = "forest",
  Purple = "purple",
}

interface Return {
  currTheme: Themes;
  setTheme: (t?: Themes) => boolean;
}

export const useTheme = (): Return => {
  const [currTheme, setCurrTheme] = useState(Themes.Classic);

  const randTheme = (): Themes => {
    const theme = Object.entries(themeMap)[
      Math.floor(Math.random() * Object.values(themeMap).length)
    ][0] as Themes;

    return theme !== currTheme ? theme : randTheme();
  };

  const setTheme = (theme?: Themes): boolean => {
    if (!theme) {
      const t = randTheme();
      setCurrTheme(t);
      setRootStyles(t);
      return;
    }
    setCurrTheme(theme);
    setRootStyles(theme);
    return true;
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
