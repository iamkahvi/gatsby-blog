import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from 'styled-components'

 class BookList extends React.Component {
  render () {
      const { html } = this.props.data.markdownRemark
      const { title } = this.props.data.markdownRemark.frontmatter

      const Body = styled.div`
        font-family: 'Roboto';
        margin-bottom: 3rem;
        line-height: 1.5;
        color: #297373;
      `

      return (
        <Layout location={this.props.location} title='book list' description="Somewhere for my books">
          <SEO title='book list' />
          <h1>{title}</h1>
          <Body 
            dangerouslySetInnerHTML={{ __html: html }} 
          />
        </Layout>
      )
    }
  }

export default BookList

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
`
