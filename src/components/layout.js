/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'gatsby';

function Layout(props) {
  const {
    location,
    title,
    children,
    description,
  } = props;

  const navStyle = 'alink roboto faded-orange';
  const titleStyle = 'f1 helvetica underline faded-orange';
  const descriptionStyle = 'f6 roboto pt1 mt2 faded-blue';

  const nav = (
    <p>
      <Link to="/" className={navStyle.concat(' mr2')}>Home</Link>
      /
      <Link to="/book-list" className={navStyle.concat(' mh2')}>Book List</Link>
      /
      <Link to="/about" className={navStyle.concat(' ml2')}>About</Link>
    </p>
  );

  const bigTitle = (
    <div>
      <h1 className="mt4 mb0">
        <Link to="/" className={titleStyle}>
          {title}
        </Link>
      </h1>
      <p className={descriptionStyle}>
        {description}
      </p>
    </div>
  );

  let header;

  if (location.pathname === '/') {
    header = (
      <div>
        {nav}
        {bigTitle}
      </div>
    );
  } else {
    header = (
      <div>
        {nav}
      </div>
    );
  }

  return (
    <div className="w-90 mw7 center">
      <header className="pa2 mt4">{header}</header>
      <main className="pa2">{children}</main>
    </div>
  );
}

export default Layout;
