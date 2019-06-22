/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

function BlogPostTemplate(props) {
  const { data, location, pageContext } = props;

  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  const Body = styled.div`
    font-family: 'Roboto';
    margin-bottom: 3rem;
    line-height: 1.5;
    color: #297373;
  `;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <h1 className="f1 roboto">{post.frontmatter.title}</h1>
      <p className="f5 roboto pt0">
        {post.frontmatter.date}
      </p>
      <Body
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <ul
        style={{
          display: 'flex',
          flexWrap: '-moz-initialwrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ←
              {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title}
               →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
