import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

class Highlights extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const post = this.props.data.markdownRemark

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} />
        <header className="flex justify-between items-center pb3 mb4 bb b--faded-faded-blue">
          <h1 className="f3 faded-blue ma0 pb0 fw4 roboto">
            {post.frontmatter.title}
          </h1>
          <p className="f5 fw4 roboto pa0 ma0 faded-blue">
            {post.frontmatter.date}
          </p>
        </header>
        <div
          className="textBody"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Layout>
    )
  }
}

export default Highlights

export const pageQuery = graphql`
  query highlights($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      rawMarkdownBody
      frontmatter {
        title
        date(formatString: "MMM DD, YYYY")
        description
      }
    }
  }
`
