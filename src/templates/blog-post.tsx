import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { BlogProps } from "../types/types"

class BlogPostTemplate extends React.Component<BlogProps> {
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
          <h1 className="f3 faded-blue ma0 pb0 fw4 roboto w-70">
            {post.frontmatter.title}
          </h1>
          <p className="post-date-small f5 fw4 roboto pa0 ma0 faded-blue w-30 tr">
            {post.frontmatter.displayDateSmall}
          </p>
          <p className="post-date f5 fw4 roboto pa0 ma0 faded-blue w-30 tr">
            {post.frontmatter.displayDate}
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
        displayDate: date(formatString: "MMMM Do, YYYY")
        displayDateSmall: date(formatString: "MMM D")
        description
      }
    }
  }
`
