import React, { useState, useEffect } from "react";
import { Link, graphql, navigate } from "gatsby";
import axios from "axios";

import {
  Layout,
  SearchBar,
  SEO,
  EmailInput,
  BookListLogo,
} from "../components";
import { IndexProps, PostEdge } from "../types/types";

const BlogIndex = ({ data, location }: IndexProps) => {
  const [search, setSearch] = useState("");
  const [showEmail, setShowEmail] = useState(false);

  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  const description = data.site.siteMetadata.description;

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !window.localStorage.getItem("isSubscribed")
    ) {
      setShowEmail(true);
    }
  }, []);

  const addEmail = async (value, setLoading) => {
    setLoading(true);

    const emailAPIURL = process.env.GATSBY_EMAIL_SERVICE_URL;
    const body = { email: value };
    const config = {
      timeout: 2500,
      headers: { "Access-Control-Allow-Origin": "*" },
    };

    try {
      const res = await axios.post(emailAPIURL, body, config);
      setLoading(false);

      // Assuming two people don't subscribe on the same device
      typeof window !== "undefined" &&
        window.localStorage.setItem("isSubscribed", "true");
      setShowEmail(false);
      alert(res.data.title);
    } catch (error) {
      setLoading(false);
      const { title = null, detail = null } = error?.response?.data;
      if (detail) {
        alert(`${title}\n${detail}`);
      } else {
        alert(`${title}`);
      }
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.toLowerCase() === "mama") {
      navigate("/mothersday", { state: { isAuth: true } });
    }
  };

  const renderPost = ({ node, previous }: PostEdge) => {
    const title = node.frontmatter.title || node.fields.slug;

    const { year } = node.frontmatter;
    const prevYear = previous ? previous.frontmatter.year : null;

    const slug = node.frontmatter.title
      .replace(/[!'’.()*]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

    return (
      <>
        {prevYear !== year && (
          <h1 className="roboto f4 fw4 tc c-second mb4">{year}</h1>
        )}
        <div
          className="pv3 bt b--c-third flex items-center justify-between"
          key={`/${slug}`}
        >
          <h3 className="mv0 w-two-thirds">
            <Link
              style={{ boxShadow: `none` }}
              className="mb2 roboto c-main"
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
      </>
    );
  };

  const hideEmail = () => {
    setShowEmail(false);
    typeof window !== "undefined" &&
      window.localStorage.setItem("isSubscribed", "false");
  };

  return (
    <Layout location={location} title={siteTitle} description={description}>
      <BookListLogo />
      {showEmail && (
        <div className="ba-ns pa3-ns mb4 mw6 br3">
          <div className="flex justify-between mb3">
            <h3 className="mb2 ">subscribe to blog updates here:</h3>
            <button
              className="roboto ba br3 f5 normal flex items-center justify-center"
              type="submit"
              onClick={hideEmail}
            >
              ❌
            </button>
          </div>
          <EmailInput
            handleInput={addEmail}
            show={showEmail}
            setShow={hideEmail}
          />
        </div>
      )}
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
            (edge.node.frontmatter.title + edge.node.frontmatter.displayDate)
              .toLowerCase()
              .includes(search.toLowerCase()) || search === ""
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
