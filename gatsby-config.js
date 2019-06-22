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
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/book-list`,
        name: `book-list`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
  ],
}
