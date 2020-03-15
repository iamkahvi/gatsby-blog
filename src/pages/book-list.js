/* eslint-disable react/jsx-filename-extension */
import React from "react"
import InputEmail from "../components/emailInput"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

function BookList(props) {
  const { data, location } = props
  const { html, title } = data.allGhostPage.nodes[0]

  const addEmail = async (value, setLoading) => {
    setLoading(true)

    const emailAPIURL = "http://localhost:3000/email"
    const emailAPIBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: value,
      }),
    }

    const res = await fetch(emailAPIURL, emailAPIBody)
    const data = await res.json()

    setLoading(false)

    if (res.status === 200) {
      // Assuming two people don't subscribing on the same device
      localStorage.setItem("isSubscribed", "true")
    }
    alert(data.title)
    console.log(data)
  }

  return (
    <Layout
      location={location}
      title="book list"
      description="Somewhere for my books"
    >
      <SEO title="book list" />
      <h1 className="mt0">{title}</h1>
      {/* {!localStorage.getItem("isSubscribed") && ( */}
      <div className="ba-ns pa3-ns mb3 mw6">
        <h3 className="mb2">subscribe to booklist updates here:</h3>
        <InputEmail handleInput={addEmail} />
      </div>
      {/* )} */}
      <div className="textBody" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default BookList

export const pageQuery = graphql`
  query {
    allGhostPage(filter: { title: { eq: "My Book List" } }) {
      nodes {
        html
        title
      }
    }
  }
`
