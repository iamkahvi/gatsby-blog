import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { format } from "date-fns";
import { HighlightJsonProps } from "../types/types";

class HighlightJson extends React.Component<HighlightJsonProps, {}> {
  render() {
    const siteTitle = this.props.pageContext.siteInfo.siteMetadata.title;
    const highlights = this.props.pageContext.highlightData;

    const { book: bookTitle, author, dateAdded: epochSeconds } = highlights[0];
    const title = `${bookTitle} by ${author}`;

    const dateAdded = new Date(0);
    dateAdded.setUTCSeconds(epochSeconds);

    const displayDate = format(dateAdded, "MMMM do, yyyy");
    const displayDateSmall = format(dateAdded, "MMM d");

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={title} />
        <header className="flex justify-between items-center pb3 mb4 bb b--c-third">
          <h1 className="f3 c-second ma0 pb0 fw4 roboto w-70">{title}</h1>
          <p className="post-date-small f5 fw4 roboto pa0 ma0 c-second w-30 tr">
            {displayDateSmall}
          </p>
          <p className="post-date f5 fw4 roboto pa0 ma0 c-second w-30 tr">
            {displayDate}
          </p>
        </header>
        <div className="textBody">
          {highlights.map((highlight: any) => {
            const {
              quote,
              location: { start, end },
            } = highlight;

            return (
              <>
                <blockquote>
                  <p>{quote}</p>
                </blockquote>
                <p className="mb4">
                  loc. {start}-{end}
                </p>
                <hr></hr>
              </>
            );
          })}
        </div>
      </Layout>
    );
  }
}

export default HighlightJson;
