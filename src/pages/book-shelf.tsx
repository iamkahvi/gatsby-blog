/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { BookListProps } from "../types/types";

function BookList(props: BookListProps) {
  const { data, location } = props;
  const { html, title } = data.allGhostPage?.nodes[0];
  const { html: introHtml } = data.markdownRemark;

  return (
    <Layout
      location={location}
      title="book shelf"
      description="Somewhere for my books"
    >
      <SEO title="book shelf" />
      <h1 className="mt0">{title}</h1>
      <div className="textBody">
        <div dangerouslySetInnerHTML={{ __html: introHtml }} />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
}

export default BookList;

export const pageQuery = graphql`
  query {
    allGhostPage(filter: { title: { eq: "A Test Shelf" } }) {
      nodes {
        html
        title
      }
    }
    markdownRemark(frontmatter: { title: { eq: "Book Shelf Intro" } }) {
      html
      rawMarkdownBody
      frontmatter {
        title
      }
    }
  }
`;
