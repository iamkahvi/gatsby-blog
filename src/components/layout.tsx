import React, { useEffect } from "react";
import { LayoutProps } from "../types/types";
import { useTheme } from "../hooks/themeHook";
import Pronouncer from "./Pronouncer";

function Layout(props: LayoutProps) {
  const { location, title, children, description } = props;

  const { currTheme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(currTheme);
  }, []);

  const navStyle = "roboto c-main";
  const descriptionStyle = "f6 roboto pt1 mt2 c-second";

  const nav = (
    <p className="c-third">
      <a href="/" className={navStyle.concat(" mr2")}>
        Home
      </a>
      /
      <a href="/book-shelf" className={navStyle.concat(" mh2")}>
        Book Shelf
      </a>
      /
      <a href="/about" className={navStyle.concat(" ml2")}>
        About
      </a>
    </p>
  );

  const bigTitle = (
    <div className="mt4">
      <h1 className="mb0 b helvetica underline f1">
        {title}
        <Pronouncer url="/assets/pronounce4.m4a" />
      </h1>

      <p className={descriptionStyle}>{description}</p>
    </div>
  );

  const themeToggle = (
    <button onClick={() => setTheme()} className="bn br3 f4">
      🌚
    </button>
  );

  return (
    <div className="w-90-ns mw7 mv4 center c-background">
      <header className="pa3">
        <div className="flex items-center justify-between">
          {nav}
          {themeToggle}
        </div>
        {location.pathname === "/" && bigTitle}
      </header>
      <main className="pa3">{children}</main>
    </div>
  );
}

export default Layout;
