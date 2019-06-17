import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function BookList(props) {
  return (
    <Layout location={props.location} title='book list' description="Somewhere for my books">
      <SEO title='book list' />
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>Book List</h1>
          </div>
      </div>
    </Layout>
  )
}