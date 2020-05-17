import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Covid(props) {
  const { data, location } = props
  const { html, title } = data.allGhostPage.nodes[0]

  const Body = styled.div`
    font-family: "Roboto";
    margin-bottom: 3rem;
    line-height: 1.5;
    color: #297373;
  `

  return (
    <Layout
      location={location}
      title="COVID-19"
      description="Somewhere to write about this"
    >
      <SEO title="COVID-19" />
      <h1 className="mt0">{title}</h1>
      <Body className="textBody" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allGhostPage(filter: { title: { eq: "COVID-19" } }) {
      nodes {
        html
        title
      }
    }
  }
`
