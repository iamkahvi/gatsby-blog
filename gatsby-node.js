const path = require(`path`);
const fs = require(`fs`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async function({ graphql, actions }) {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);
  const highlightsTemplate = path.resolve(`./src/templates/highlights.tsx`);

  const result = await graphql(
    `
      {
        bookShelf: allGhostPage(filter: { title: { eq: "A Test Shelf" } }) {
          nodes {
            title
            plaintext
          }
        }
        blogPosts: allMarkdownRemark(
          filter: {
            frontmatter: { layout: { eq: "post" }, published: { ne: false } }
          }
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
  );

  const bookShelfText = result.data.bookShelf.nodes[0].plaintext;

  fs.writeFileSync("./utils/in.json", bookShelfText, "utf-8");

  // Create blog posts pages.
  const posts = result.data.blogPosts.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    const slug = post.node.frontmatter.title
      .replace(/[!'’.()*]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

    console.log("SLUG: ", slug);

    createPage({
      path: slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  // Create highlight pages
  const highlights = result.data.highlights.edges;

  highlights.forEach((post, index) => {
    const slug = `highlights/${post.node.frontmatter.slug
      .replace(/\s+/g, "-")
      .toLowerCase()}`;

    createPage({
      path: slug,
      component: highlightsTemplate,
      context: {
        slug: post.node.fields.slug,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
