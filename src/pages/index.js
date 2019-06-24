/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'tachyons-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import BookListLogo from '../../static/booklist2.png';

function BlogIndex(props) {
  const { data, location } = props;
  const { title, description } = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges;

  const YearHead = styled('h1')`
    roboto f4 fw4 tc faded-blue mv4
  `;

  const PostTitle = styled('h3')`
    mt0 mb2 pt3 bt b--light-gray
  `;

  const PostDescription = styled('p')`
    f6 roboto faded-blue
  `;

  return (
    <Layout location={location} title={title} description={description}>
      <SEO title={title} />

      <Link className="booklist alink mt2 mb4" to="/book-list">
        <img src={BookListLogo} alt="Book List Logo" />
      </Link>

      {posts.map((edge) => {
        const { node, previous } = edge;
        const postTitle = node.frontmatter.title || node.fields.slug;
        const previousPost = previous || node;
        const currYear = node.frontmatter.date.split(' ').pop();
        const previousYear = previousPost.frontmatter.date.split(' ').pop();
        const yearHeader = currYear !== previousYear;
        const postDate = node.frontmatter.date.split(',')[0];

        return (
          <div key={node.fields.slug}>
            {yearHeader && <YearHead>{currYear}</YearHead>}
            <PostTitle>
              <Link className="alink roboto b faded-orange" to={node.fields.slug}>
                {postTitle}
              </Link>
            </PostTitle>
            <small className="f5 roboto faded-blue fr">{postDate}</small>
            <PostDescription
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        );
      })}
    </Layout>
  );
}

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
        filter: { frontmatter: { layout: {eq: "post"} } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
      edges {
        previous {
          frontmatter {
            date(formatString: "MMM DD, YYYY")
          }
        }
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
