import React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {

  // toggleYear() {
    //   if (this.pro)
    // }
  render() {
    const { data } = this.props
    console.log(typeof(data))
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const description = data.site.siteMetadata.description

    // This works!
    console.log(posts[0].next.frontmatter.date)
    console.log(posts[0].node.frontmatter.date)

    return (
      <Layout location={this.props.location} title={siteTitle} description={description}>
      <SEO title="All posts" />

      {/* This doesn't work?? */}

      {/* {posts.map(({ next }) => {
        return (
          <h3>{next.frontmatter.date}</h3>
        )
      })} */}
      
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
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
