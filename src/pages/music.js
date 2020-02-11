import React from "react"
import Layout from "../components/layout"

export default function MusicPage({ location, data }) {
  const songs = data.allFile.edges

  return (
    <Layout location={location} title={"Music Page"}>
      {console.log(songs)}
      {songs.map(({ node }) => (
        <div key={node.id}>
          <h3 className="mb3 mt4">{node.relativePath}</h3>
          <audio controls>
            <source
              src={`/songs/${node.relativePath}`}
              type="audio/mpeg"
            ></source>
            Your browser does not support the audio element.
          </audio>
          <br></br>
        </div>
      ))}
      <h3 className="mb3 mt4">side b - 02/2020</h3>
      <audio controls>
        <source src="/songs/asap_yes.mp3" type="audio/mpeg"></source>
        Your browser does not support the audio element.
      </audio>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "songs" } }) {
      edges {
        node {
          relativePath
        }
      }
    }
  }
`
