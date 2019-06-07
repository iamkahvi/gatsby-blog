import React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const description = data.site.siteMetadata.description
    var num = 0

    return (
      <Layout location={this.props.location} title={siteTitle} description={description}>
      <SEO title={siteTitle} />
      
      {posts.map(edge => {
        const { node, next } = edge
        const title = node.frontmatter.title || node.fields.slug
        const nextPost = next ? next : node
        const currYear = node.frontmatter.date.split(" ").pop()
        const nextYear = nextPost.frontmatter.date.split(" ").pop()
        const year = currYear !== nextYear ? currYear : " "
        num += 1

        return (
          <div>
                <h1>{num}</h1>
              <div key={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                  >
                  <Link style={{ boxShadow: `none` }} className="alink helvetica faded-orange" to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small className="f6 helvetica faded-blue">{node.frontmatter.date}</small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                  className="f6 helvetica faded-blue"
                  />
              </div>
            </div>
        )
      })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        next {
          frontmatter {
            date(formatString: "MMM DD, YYYY")
          }
        }
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
