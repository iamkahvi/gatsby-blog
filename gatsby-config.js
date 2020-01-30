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
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: `https://admin.kahvipatel.com`,
        contentApiKey: `77acc8ba83d22a06939707075b`,
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
}
