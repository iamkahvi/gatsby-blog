import React, { useState } from "react"
import { Link, graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { IndexProps } from "../types/types"

const BlogIndex = ({ data, location }: IndexProps) => {
  const [search, setSearch] = useState("")

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const description = data.site.siteMetadata.description

  const handleSearch = e => {
    setSearch(e.target.value)
    if (e.target.value.toLowerCase() === "mama") {
      navigate("/mothersday", { state: { isAuth: true } })
    }
  }

  return (
    <Layout location={location} title={siteTitle} description={description}>
      <div className="mb4 flex justify-start">
        <Link to="/covid/" className="covid-link">
          covid-19 blog is here
        </Link>
      </div>
      <Link to="/book-list/" className="booklist">
        <img src="./assets/booklist.png" alt="booklist image" />
      </Link>
      <input
        onChange={handleSearch}
        placeholder="search..."
        value={search}
        data-default=""
        id="home"
      />
      <SEO title={siteTitle} />

      {posts
        .filter(
          edge =>
            edge.node.frontmatter.title
              .toLowerCase()
              .includes(search.toLowerCase()) || search === ""
        )
        .map((edge, i) => {
          const { node, previous } = edge
          const title = node.frontmatter.title || node.fields.slug
          const previousPost = previous ? previous : node
          const currYear = node.frontmatter.date.split(" ").pop()
          const previousYear = previousPost.frontmatter.date.split(" ").pop()
          const yearHeader = i == 0 || currYear !== previousYear ? true : false
          const slug = node.frontmatter.title
            .replace(/[!'’.()*]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase()

          return (
            <>
              {yearHeader && (
                <h1 className="roboto f4 fw4 tc faded-blue mb4">{currYear}</h1>
              )}
              <div
                className="pv3 bt b--light-gray flex items-center justify-between"
                key={`/${slug}`}
              >
                <h3 className="mv0 w-two-thirds">
                  <Link
                    style={{ boxShadow: `none` }}
                    className="alink roboto b faded-orange"
                    to={`/${slug}`}
                  >
                    {title}
                  </Link>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                    className="f6 fw4 roboto faded-blue"
                  />
                </h3>
                <small className="post-date f5 roboto faded-blue fr tr w-third">
                  {node.frontmatter.displayDate}
                </small>
                <small className="post-date-small f5 roboto faded-blue fr tr w-third">
                  {node.frontmatter.displayDateSmall}
                </small>
              </div>
            </>
          )
        })}
    </Layout>
  )
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
    allMarkdownRemark(
      filter: { frontmatter: { layout: { eq: "post" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
            date(formatString: "MMM D, YYYY")
            displayDate: date(formatString: "MMMM Do")
            displayDateSmall: date(formatString: "MMM D")
            title
            description
          }
        }
      }
    }
  }
`
