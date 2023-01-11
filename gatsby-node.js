const path = require(`path`);
const fs = require(`fs`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async function ({ graphql, actions }) {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);
  const highlightsTemplate = path.resolve(`./src/templates/highlights.tsx`);
  const highlightsJsonTemplate = path.resolve(
    `./src/templates/highlight-json.tsx`
  );

  const result = await graphql(
    `
      {
        siteInfo: site {
          siteMetadata {
            title
            author
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
        highlightsJson: allFile(
          filter: {
            sourceInstanceName: { eq: "json-highlights" }
            extension: { eq: "json" }
          }
        ) {
          nodes {
            absolutePath
            name
          }
        }
      }
    `
  );

  // fs.writeFileSync("./utils/in.json", bookShelfText, "utf-8");
  // fs.writeFileSync(
  //   "./utils/in_posts.json",
  //   JSON.stringify(result.data.blogPostsContent)
  // );

  const siteInfo = result.data.siteInfo;

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
        siteInfo,
        previous,
        next,
      },
    });
  });

  // Create highlight pages
  const highlights = result.data.highlights.edges;

  highlights.forEach((post) => {
    const slug = `highlights/${post.node.frontmatter.slug
      .replace(/\s+/g, "-")
      .toLowerCase()}`;

    console.log("SLUG: ", slug);

    createPage({
      path: slug,
      component: highlightsTemplate,
      context: {
        slug: post.node.fields.slug,
        siteInfo,
      },
    });
  });

  const highlightsJson = result.data.highlightsJson.nodes;

  highlightsJson.forEach((node) => {
    const slug = `highlights/${node.name
      .replace(/[\s_]+/g, "-")
      .toLowerCase()}`;

    const data = fs.readFileSync(node.absolutePath);

    console.log("SLUG: ", slug);

    createPage({
      path: slug,
      component: highlightsJsonTemplate,
      context: {
        highlightData: JSON.parse(data),
        siteInfo,
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
