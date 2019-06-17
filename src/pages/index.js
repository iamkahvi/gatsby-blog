import React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const description = data.site.siteMetadata.description

    return (
      <Layout location={this.props.location} title={siteTitle} description={description}>
      <SEO title={siteTitle} />
      
      {posts.map(edge => {
        const { node, previous } = edge
        const title = node.frontmatter.title || node.fields.slug
        const previousPost = previous ? previous : node
        const currYear = node.frontmatter.date.split(" ").pop()
        const previousYear = previousPost.frontmatter.date.split(" ").pop()
        const yearHeader = currYear !== previousYear ? true : false

        return (
          <div key={node.fields.slug}>
            {yearHeader && <h1 className="roboto f4 fw4 tc faded-blue mb4">{currYear}</h1>}
            <h3 className="mt0 mb2 pt3 bt b--light-gray">
              <Link style={{ boxShadow: `none` }} className="alink roboto b faded-orange" to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small className="f5 roboto faded-blue fr">{node.frontmatter.date.split(',')[0]}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
              className="f6 roboto faded-blue"
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
        previous {
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
            date(formatString: "MMMM D, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
