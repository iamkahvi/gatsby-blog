require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `kahvi's blog`,
    author: `Kahvi Patel`,
    description: `I create here sometimes. And rarely capitalize.`,
    siteUrl: `https://kahvipatel.com/`,
    social: {
      twitter: `iamkahvi`,
      instagram: `iamkahvi`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {
                    frontmatter: { layout: { eq: "post" }, published: { ne: false } }
                  }
                  sort: { fields: [frontmatter___date], order: DESC }
                ) {
                  edges {
                    previous {
                      frontmatter {
                        year: date(formatString: "YYYY")
                      }
                    }
                    node {
                      excerpt
                      fields {
                        slug
                      }
                      frontmatter {
                        year: date(formatString: "YYYY")
                        displayDate: date(formatString: "MMMM Do")
                        displayDateSmall: date(formatString: "MMM D")
                        title
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
          },
        ],
      },
    },

    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-90569204-1",
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `rbthbhshshw9`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: `master`,
      },
    },
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: `https://admin.kahvipatel.com`,
        contentApiKey: process.env.GHOST_CONTENT_KEY,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/highlights`,
        name: `highlights`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/book-list`,
        name: `book-list`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/about`,
        name: `about`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
      },
    },
  ],
};
