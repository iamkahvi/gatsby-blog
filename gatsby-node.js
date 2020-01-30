const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const highlightsTemplate = path.resolve(`./src/templates/highlights.js`)

  return graphql(
    `
      {
        blogPosts: allMarkdownRemark(
          filter: { frontmatter: { layout: { eq: "post" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        highlights: allMarkdownRemark(
          filter: { frontmatter: { layout: { eq: "highlight" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.blogPosts.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      const slug = post.node.frontmatter.title
        .replace(/[!'’.()*]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase()

      console.log("SLUG: ", slug)

      createPage({
        path: slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Create highlight pages
    const highlights = result.data.highlights.edges

    highlights.forEach((post, index) => {
      const slug = `highlights/${post.node.frontmatter.slug
        .replace(/\s+/g, "-")
        .toLowerCase()}`

      createPage({
        path: slug,
        component: highlightsTemplate,
        context: {
          slug: post.node.fields.slug,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
