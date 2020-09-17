/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { BookListProps } from "../types/types"

function BookList(props: BookListProps) {
  const { data, location } = props
  const { html, title } = data.allGhostPage?.nodes[0]

  return (
    <Layout
      location={location}
      title="book shelf"
      description="Somewhere for my books"
    >
      <SEO title="book shelf" />
      <h1 className="mt0">{title}</h1>
      <div className="textBody" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default BookList

export const pageQuery = graphql`
  query {
    allGhostPage(filter: { title: { eq: "My Book Shelf" } }) {
      nodes {
        html
        title
      }
    }
  }
`
