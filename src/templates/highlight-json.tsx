import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
// const fs = require("fs");
// import { BlogProps } from "../types/types";

export interface HighlightJsonProps {
  pageContext: {
    highlightData: any;
    siteInfo: any;
  };
}

class HighlightJson extends React.Component<HighlightJsonProps, {}> {
  render() {
    const siteTitle = this.props.pageContext.siteInfo.siteMetadata.title;
    const {
      book: bookTitle,
      author,
      dateAdded,
    } = this.props.pageContext.highlightData[0];
    const title = `${bookTitle} by ${author}`;

    console.log(this.props.pageContext.highlightData);

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={title} />
        <header className="flex justify-between items-center pb3 mb4 bb b--c-third">
          <h1 className="f3 c-second ma0 pb0 fw4 roboto w-70">{title}</h1>
          <p className="post-date-small f5 fw4 roboto pa0 ma0 c-second w-30 tr">
            {dateAdded}
          </p>
          <p className="post-date f5 fw4 roboto pa0 ma0 c-second w-30 tr">
            {dateAdded}
          </p>
        </header>
      </Layout>
    );
  }
}

export default HighlightJson;
