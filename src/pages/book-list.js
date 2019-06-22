/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

function BookList(props) {
  const { data, location } = props;
  const { html } = data.markdownRemark;
  const { title } = data.markdownRemark.frontmatter;

  const Body = styled.div`
    font-family: 'Roboto';
    margin-bottom: 3rem;
    line-height: 1.5;
    color: #297373;
  `;

  return (
    <Layout location={location} title="book list" description="Somewhere for my books">
      <SEO title="book list" />
      <h1>{title}</h1>
      <Body
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  );
}

export default BookList;

export const pageQuery = graphql`
  query {
    markdownRemark(
      frontmatter: {layout: {eq: "book-list"}}
    ) {
      html
      frontmatter {
        title
      }
    }
  }
`;
