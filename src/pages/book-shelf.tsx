import React, { useState } from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { graphql } from "gatsby";
import { Layout, SEO, SearchBar } from "../components";
import { BookShelfProps, BookEdge } from "../types/types";

const yearKey = {
  2021: "this year",
  2020: "2020",
  2019: "2019",
  2018: "2018",
  2017: "possibly in 2017",
  2016: "probably before 2017",
};

const anchorIcon = (
  <svg
    aria-hidden="true"
    height="16"
    version="1.1"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      fillRule="evenodd"
      d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
    ></path>
  </svg>
);

function BookList(props: BookShelfProps) {
  const [search, setSearch] = useState("");

  const { data, location } = props;
  const books = data.books.edges;
  const { intro, title } = data.bookShelf?.nodes[0];

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const renderBook = ({ node, previous }: BookEdge) => {
    const prevYear = previous ? previous.year : null;
    const idLink = node.bookTitle
      .replace(/[!'’.()*]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    return (
      <>
        {prevYear !== node.year && (
          <h2 className="underline">{yearKey[node.year]}</h2>
        )}
        <li id={idLink} className="book mb4">
          {/* <a className="book anchor c-second b" href={`#${idLink}`}>
            {anchorIcon}
          </a> */}
          <div className="mb2">
            <span className="fw5">{node.bookTitle}</span> by {node.bookAuthor}
            {parseInt(node.year) > 2018 && <em> - {node.dateFinished} </em>}
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(
                JSON.parse(node.bookDescription.raw)
              ),
            }}
          />
        </li>
      </>
    );
  };

  return (
    <Layout
      location={location}
      title="book shelf"
      description="Somewhere for my books"
    >
      <SEO title="book shelf" />
      <h1 className="mt0">{title}</h1>
      <div className="textBody">
        <div
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(JSON.parse(intro.raw)),
          }}
        />
        <SearchBar
          handleSearch={handleSearch}
          placeholderText="search books..."
          searchVal={search}
          isSticky={false}
        />
        <ul className="ml0">
          {books
            .filter(
              (edge) =>
                `${edge.node.bookTitle} by ${edge.node.bookAuthor} - ${edge.node.dateFinished}`
                  .toLowerCase()
                  .includes(search.toLowerCase()) || search === ""
            )
            .map(renderBook)}
        </ul>
      </div>
    </Layout>
  );
}

export default BookList;

export const pageQuery = graphql`
  query {
    books: allContentfulBookListItem(
      sort: { fields: dateFinished, order: DESC }
      filter: { book_shelf: { elemMatch: { title: { eq: "My Book Shelf" } } } }
    ) {
      edges {
        node {
          bookTitle
          bookAuthor
          bookDescription {
            raw
          }
          dateFinished(formatString: "DD/MM/YYYY")
          year: dateFinished(formatString: "YYYY")
        }
        previous {
          year: dateFinished(formatString: "YYYY")
        }
      }
    }
    bookShelf: allContentfulBookShelf(
      filter: { title: { eq: "My Book Shelf" } }
    ) {
      nodes {
        intro {
          raw
        }
        title
      }
    }
  }
`;
