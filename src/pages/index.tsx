import React, { useState, useEffect } from "react"
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
      <Link to="/book-shelf/" className="booklist baskerville tc faded-blue tm">
        My Book Shelf
      </Link>
      <input
        onChange={handleSearch}
        placeholder="search..."
        value={search}
        data-default=""
        id="home"
        className="roboto mb3"
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
                    className="mb2 roboto faded-orange"
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
      filter: {
        frontmatter: { layout: { eq: "post" }, published: { ne: false } }
      }
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