/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { BookListProps } from "../types/types"

function BookList(props: BookListProps) {
  const { data, location } = props
  const { html, title } = data.allGhostPage.nodes[0]

  const Body = styled.div`
    font-family: "Roboto";
    margin-bottom: 3rem;
    line-height: 1.5;
    color: #297373;
  `

  return (
    <Layout
      location={location}
      title="book list"
      description="Somewhere for my books"
    >
      <SEO title="book list" />
      <h1 className="mt0">{title}</h1>
      <Body className="textBody" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default BookList

export const pageQuery = graphql`
  query {
    allGhostPage(filter: { title: { eq: "My Book List" } }) {
      nodes {
        html
        title
      }
    }
  }
`
