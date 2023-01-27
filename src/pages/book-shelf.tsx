import React, { useState } from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { INLINES } from "@contentful/rich-text-types";
import { graphql } from "gatsby";
import { Layout, SEO, SearchBar } from "../components";
import { BookShelfProps, BookEdge } from "../types/types";
import { yearMap } from "../utilities";

const attributeValue = (value: string) => `"${value.replace(/"/g, "&quot;")}"`;

const HOSTNAME = "kahvipatel.com";

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, next) => {
      const href = typeof node.data.uri === "string" ? node.data.uri : "";
      const url = new URL(href);

      if (url.hostname === HOSTNAME) {
        return `<a href=${attributeValue(url.href)}>${next(node.content)}</a>`;
      }
      return `<a href=${attributeValue(url.href)} target="_blank">${next(
        node.content
      )}</a>`;
    },
  },
};

function BookList(props: BookShelfProps) {
  const [search, setSearch] = useState("");

  const { data, location } = props;
  const books = data.books.edges;
  const { intro, title } = data.bookShelf?.nodes[0];

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const renderBook = ({ node, previous }: BookEdge) => {
    const prevYear = previous?.year ?? null;

    const idLink = node.bookTitle
      .replace(/[!'’.()*:]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

    return (
      <div key={idLink}>
        {prevYear !== node.year && (
          <h2 className="f4 underline">{yearMap(node.year)}</h2>
        )}
        <li id={idLink} className="book mb4">
          <div className="mb2">
            <a
              className="book anchor c-second b"
              href={`/book-shelf#${idLink}`}
            >
              <span className="fw5">{node.bookTitle}</span>
            </a>
            by {node.bookAuthor}
            {parseInt(node.year) > 2018 && <em> - {node.dateFinished} </em>}
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(
                JSON.parse(node.bookDescription.raw),
                options
              ),
            }}
          />
        </li>
      </div>
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
            .map(
              (edge, ind, arr) =>
                ({
                  ...edge,
                  previous: arr[ind - 1]?.node ?? null,
                } as BookEdge)
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
