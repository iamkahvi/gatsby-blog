import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { BlogProps } from "../types/types";

class Highlights extends React.Component<BlogProps, {}> {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const post = this.props.data.markdownRemark;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} />
        <header className="flex justify-between items-center pb3 mb4 bb b--faded-c-second">
          <h1 className="f3 c-second ma0 pb0 fw4 roboto w-70">
            {post.frontmatter.title}
          </h1>
          <p className="post-date-small f5 fw4 roboto pa0 ma0 c-second w-30 tr">
            {post.frontmatter.displayDateSmall}
          </p>
          <p className="post-date f5 fw4 roboto pa0 ma0 c-second w-30 tr">
            {post.frontmatter.displayDate}
          </p>
        </header>
        <div
          className="textBody"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Layout>
    );
  }
}

export default Highlights;

export const pageQuery = graphql`
  query highlights($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      rawMarkdownBody
      frontmatter {
        title
        displayDate: date(formatString: "MMMM Do, 2019")
        displayDateSmall: date(formatString: "MMM D")
        description
      }
    }
  }
`;
