import { themeMap } from "./src/colorThemes.mjs";
import React from "react";

const MagicScriptTag = () => {
  const codeToRunOnClient = `
    (function () {
      const themeMap = ${JSON.stringify(themeMap)};
      function getInitialColorMode() {
        const persistedColorPreference = window.localStorage.getItem("color-theme");
        const hasPersistedPreference = typeof persistedColorPreference === "string";

        if (hasPersistedPreference) {
          return persistedColorPreference;
        }

        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        const hasMediaQueryPreference = typeof mql.matches === "boolean";

        if (hasMediaQueryPreference && mql.matches) {
          return "dark";
        }

        return "classic";
      }
      function setRootStyles(theme) {
        const root = document.documentElement;
        Object.entries(themeMap[theme]).forEach((val) => {
          const [k, v] = val;
          root.style.setProperty(k, v);

          // Ugly fix for selection color
          if (k == "--c-main") {
            root.style.setProperty("--c-main-selection", v + "50");
          }
        });
      }
      const colorMode = getInitialColorMode();
      setRootStyles(colorMode);
    })();`;

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag />);
};
