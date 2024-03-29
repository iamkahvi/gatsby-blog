import React, { useRef, useEffect } from "react";
import { LayoutProps } from "../types/types";
import { useTheme } from "../hooks/themeHook";

function Layout(props: LayoutProps) {
  const { location, title, children, description } = props;

  const { currTheme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(currTheme);
  }, []);

  const audio = useRef(null);

  const navStyle = "roboto c-main";
  const descriptionStyle = "f6 roboto pt1 mt2 c-second";

  const audioIcon = (
    <svg
      onClick={() => audio.current.play()}
      className="ml3"
      width="660"
      height="660"
      viewBox="0 0 660 660"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M330 660C512.254 660 660 512.254 660 330C660 147.746 512.254 0 330 0C147.746 0 0 147.746 0 330C0 512.254 147.746 660 330 660ZM499.936 156.859C502.834 155.102 506.392 153.465 507.843 153.222C512.194 152.493 519.189 153.619 523.282 155.707C527.765 157.994 536.062 166.36 546.435 179.053C572.855 211.382 590.278 250.848 597.644 295.053C600.261 310.753 600.258 351.376 597.64 367.053C589.394 416.435 567.309 461.367 534.54 495.432C525.25 505.09 520.899 507.5 512.698 507.531C505.819 507.557 500.691 505.612 496.142 501.252C489.274 494.669 486.829 486.024 489.366 477.297C490.609 473.021 492.622 470.097 499.544 462.51C504.29 457.309 510.873 449.453 514.172 445.053C569.265 371.583 563.529 267.036 500.721 199.875C491.061 189.546 488.646 184.971 488.623 176.964C488.598 168.45 492.627 161.289 499.936 156.859ZM277.98 177.544C297.694 159.36 299.469 157.949 305.672 155.525C312.768 152.752 323.115 152.929 329.48 155.93C335.535 158.786 338.158 161.506 341.181 168.065L343.48 173.053V329.053C343.48 458.88 343.248 485.852 342.097 489.813C340.574 495.057 334.415 502.759 329.865 505.113C321.69 509.34 309.209 508.678 300.376 503.547C297.683 501.983 287.83 493.63 278.48 484.986C244.686 453.744 228.517 441.042 212.48 433.14C207.53 430.701 201.095 428.221 198.181 427.629C194.797 426.942 173.902 426.553 140.381 426.553C96.2417 426.553 87.4297 426.32 85.0487 425.089C75.9097 420.363 68.1887 402.421 63.3007 374.553C60.1617 356.654 59.0237 322.726 60.9307 303.925C63.9727 273.952 71.0567 250.368 80.1207 240.045C81.2745 238.731 82.1114 237.683 83.1234 236.846C87.3152 233.381 94.5116 233.551 139.68 233.533C168.189 233.522 193.552 233.073 197.48 232.511C202.403 231.806 207.448 230.056 214.48 226.616C230.803 218.63 247.045 206.078 277.98 177.544ZM408.98 235.809C408.98 226.469 414.126 218.329 422.48 214.453C428.391 211.71 436.86 211.952 442.946 215.036C452.124 219.687 470.318 243.433 479.385 262.596C500.265 306.723 499.945 356.662 478.507 400.053C468.684 419.934 451.971 441.385 442.709 446.001C433.05 450.814 421.927 448.813 415.096 441.033C410.614 435.928 408.975 431.707 409.002 425.335C409.031 418.307 411.393 413.603 419.4 404.622C440.009 381.507 449.013 356.223 447.698 325.158C446.597 299.161 437.694 277.073 420.324 257.239C411.315 246.952 408.98 242.541 408.98 235.809Z"
      />
    </svg>
  );

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
        {audioIcon}
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
        {location.pathname === "/" && (
          <>
            {bigTitle}
            <audio ref={audio} src="/assets/pronounce4.m4a" />
          </>
        )}
      </header>
      <main className="pa3">{children}</main>
    </div>
  );
}

export default Layout;
