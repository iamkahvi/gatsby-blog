import React from "react";
import { Link } from "gatsby";

const otherLink = (
  <Link
    to="/book-shelf/"
    className="booklist f2 baskerville tc c-second tm mb4"
  >
    📚 →
  </Link>
);

export default function BookListLogo() {
  return (
    <div>
      <Link
        className="mb4 w-100 br3 gradient flex items-center justify-center"
        to="/book-shelf/"
      >
        <p className="b helvetica tc">Book Shelf</p>
      </Link>
    </div>
  );
}
