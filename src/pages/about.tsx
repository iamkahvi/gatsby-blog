/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import kramed from "kramed"
import { AboutProps } from "../types/types"

function BlogAbout(props: AboutProps) {
  const { data, location } = props
  const { rawMarkdownBody } = data.markdownRemark
  const { title } = data.markdownRemark.frontmatter

  return (
    <Layout location={location} title={title}>
      <SEO title="about" />
      <h1 className="mt0">{title}</h1>
      <div>
        <img
          className="profile"
          src="/assets/profile.jpg"
          alt="Headshot Photo"
        ></img>
        <div
          className="textBody"
          dangerouslySetInnerHTML={{ __html: kramed(rawMarkdownBody) }}
        />
      </div>
    </Layout>
  )
}

export default BlogAbout

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { permalink: { eq: "/about/" } }) {
      html
      rawMarkdownBody
      frontmatter {
        title
      }
    }
  }
`
