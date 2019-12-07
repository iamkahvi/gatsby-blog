import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import marked from "marked"
import kramed from "kramed"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
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
          dangerouslySetInnerHTML={{ __html: marked(post.rawMarkdownBody) }}
        />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      rawMarkdownBody
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
