/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { BookShelfProps, BookEdge } from "../types/types";

function BookList(props: BookShelfProps) {
  const [search, setSearch] = useState("");

  const { data, location } = props;
  const books = data.books.edges;
  const { intro, title } = data.bookShelf?.nodes[0];

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const renderBook = ({ node, previous }: BookEdge) => {
    return (
      <>
        {previous === null ? (
          <h2>this year</h2>
        ) : (
          previous.year !== node.year && <h2>{node.year}</h2>
        )}
        <li>
          <strong>{node.bookTitle}</strong> by {node.bookAuthor}
          {parseInt(node.year) > 2018 && <em> - {node.dateFinished}</em>}
          <br></br>
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
        <input
          onChange={handleSearch}
          placeholder="search..."
          value={search}
          data-default=""
          id="home"
          className="roboto mb4"
        />
        {books
          .filter(
            edge =>
              `${edge.node.bookTitle} by ${edge.node.bookAuthor} - ${edge.node.dateFinished}`
                .toLowerCase()
                .includes(search.toLowerCase()) || search === ""
          )
          .map(renderBook)}
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
