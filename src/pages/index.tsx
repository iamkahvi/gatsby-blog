import React, { useState, useEffect } from "react";
import { Link, graphql, navigate } from "gatsby";

import { Layout, SearchBar, SEO, BookListLogo } from "../components";

import { IndexProps, PostEdge } from "../types/types";
import { CURR_YEAR_STRING } from "../utilities";

const BlogIndex = ({ data, location }: IndexProps) => {
  const [search, setSearch] = useState("");

  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  const description = data.site.siteMetadata.description;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.toLowerCase() === "mama") {
      navigate("/mothersday", { state: { isAuth: true } });
    }
  };

  const renderPost = ({ node, previous }: PostEdge) => {
    const prevYear = previous?.frontmatter?.year ?? null;

    const title = node.frontmatter.title || node.fields.slug;

    const { year } = node.frontmatter;

    const slug = node.frontmatter.title
      .replace(/[!'’.()*]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

    const color = year === CURR_YEAR_STRING ? "c-main" : "c-second";

    return (
      <div key={slug}>
        {prevYear !== year && (
          <h1 className={`roboto f5 ${color} tc mb3`}>{year}</h1>
        )}
        <div
          className="pv3 bt b--c-third flex items-center justify-between"
          key={`/${slug}`}
        >
          <h3 className="mv0 w-two-thirds">
            <Link
              style={{ boxShadow: `none` }}
              className="f4 mb2 roboto c-main"
              to={`/${slug}`}
            >
              {title}
            </Link>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
              className="f6 fw4 roboto c-second"
            />
          </h3>
          <small className="post-date f5 roboto c-second fr tr w-third">
            {node.frontmatter.displayDate}
          </small>
          <small className="post-date-small f5 roboto c-second fr tr w-third">
            {node.frontmatter.displayDateSmall}
          </small>
        </div>
      </div>
    );
  };

  const newsletterEmbed = (
    <div className="mb4" style={{ height: "11rem" }}>
      <iframe
        src="https://www.newsletter.kahvipatel.com/embed"
        className="w-100 br3 h-100 bn"
      ></iframe>
    </div>
  );

  return (
    <Layout location={location} title={siteTitle} description={description}>
      <BookListLogo />
      {newsletterEmbed}
      <SearchBar
        handleSearch={handleSearch}
        placeholderText="search posts..."
        searchVal={search}
        isSticky={false}
      />
      <SEO title={siteTitle} />
      {posts
        .filter(
          (edge) =>
            (
              edge.node.frontmatter.title +
              edge.node.frontmatter.displayDate +
              edge.node.frontmatter.description
            )
              .toLowerCase()
              .includes(search.toLowerCase()) || search === ""
        )
        .map(
          (edge, ind, arr) =>
            ({
              ...edge,
              previous: arr[ind - 1]?.node ?? null,
            } as PostEdge)
        )
        .map(renderPost)}
    </Layout>
  );
};

export default BlogIndex;

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
