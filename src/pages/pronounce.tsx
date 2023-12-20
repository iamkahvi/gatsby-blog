import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import kramed from "kramed";
import { AboutProps } from "../types/types";

function BlogPronounce(props: AboutProps) {
  const { data, location } = props;
  const { rawMarkdownBody } = data.markdownRemark;
  const { title } = data.markdownRemark.frontmatter;

  return (
    <Layout location={location} title={title}>
      <SEO title="pronounce" />
        <div
          className="textBody"
          dangerouslySetInnerHTML={{ __html: kramed(rawMarkdownBody) }}
        />
    </Layout>
  );
}

export default BlogPronounce;

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { permalink: { eq: "/pronounce/" } }) {
      html
      rawMarkdownBody
      frontmatter {
        title
      }
    }
  }
`;
