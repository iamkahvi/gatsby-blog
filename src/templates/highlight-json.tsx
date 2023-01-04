import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

export interface HighlightJsonProps {
  pageContext: {
    highlightData: any;
    siteInfo: any;
  };
}

class HighlightJson extends React.Component<HighlightJsonProps, {}> {
  render() {
    const siteTitle = this.props.pageContext.siteInfo.siteMetadata.title;
    const highlights = this.props.pageContext.highlightData;
    const { book: bookTitle, author, dateAdded: epochSeconds } = highlights[0];
    const title = `${bookTitle} by ${author}`;

    console.log(this.props.pageContext.highlightData);

    const dateAdded = new Date(0); // The 0 there is the key, which sets the date to the epoch
    dateAdded.setUTCSeconds(epochSeconds);

    // displayDate: date(formatString: "MMMM Do, YYYY")
    // displayDateSmall: date(formatString: "MMM D")

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={title} />
        <header className="flex justify-between items-center pb3 mb4 bb b--c-third">
          <h1 className="f3 c-second ma0 pb0 fw4 roboto w-70">{title}</h1>
          <p className="post-date-small f5 fw4 roboto pa0 ma0 c-second w-30 tr">
            {dateAdded.toLocaleDateString("eng-US")}
          </p>
          <p className="post-date f5 fw4 roboto pa0 ma0 c-second w-30 tr">
            {dateAdded.toLocaleDateString("eng-US")}
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
              </>
            );
          })}
        </div>
      </Layout>
    );
  }
}

export default HighlightJson;
