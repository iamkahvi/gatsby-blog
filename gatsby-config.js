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
        path: `${__dirname}/content/highlights/json`,
        name: `json-highlights`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/highlights/markdown`,
        name: `markdown-highlights`,
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
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: "markdown-anchor",
            },
          },
          `gatsby-md-link-new-tab`,
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
};
