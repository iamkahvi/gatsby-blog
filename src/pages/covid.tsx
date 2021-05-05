import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { PageProps } from "gatsby";

export default function Covid(props: PageProps) {
  const { data, location } = props;
  const { html, title } = data.allGhostPage.nodes[0];

  return (
    <Layout
      location={location}
      title="COVID-19"
      description="Somewhere to write about this"
    >
      <SEO title="COVID-19" />
      <h1 className="mt0">{title}</h1>
      <div className="textBody" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allGhostPage(filter: { title: { eq: "COVID-19" } }) {
      nodes {
        html
        title
      }
    }
  }
`;
