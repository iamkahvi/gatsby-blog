import React from "react";
import SEO from "../components/seo";
import { Link, graphql, navigate } from "gatsby";
import { IndexProps, PostEdge } from "../types/types";

export default function thatNewNewShit({ data, location }: IndexProps) {
  console.log(data);

  return (
    <>
      <SEO title="newnew" />
      <div className="newnew">
        <div className="container">
          <h1 id="hello">new blog YEAH BABY</h1>
          <h2>i'm gonna write all my shit like this from now on</h2>
          {data.allMarkdownRemark.edges.map(({ node }) => {
            const slug = node.frontmatter.title
              .replace(/[!'’.()*]/g, "")
              .replace(/\s+/g, "-")
              .toLowerCase();
            const title = node.frontmatter.title || node.fields.slug;
            
            return (
              <p>
                <a href={slug}>{title}</a>
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
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
`;
