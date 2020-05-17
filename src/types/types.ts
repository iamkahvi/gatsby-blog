import React from "react"

export interface IndexProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
      }
    }
    allMarkdownRemark: {
      edges: [
        {
          previous: {
            frontmatter: {
              date: string
            }
          }
          node: {
            excerpt: string
            fields: {
              slug: string
            }
            frontmatter: {
              date: string
              displayDate: string
              displayDateSmall: string
              title: string
              description: string
            }
          }
        }
      ]
    }
  }
  location: Location
}

export interface BlogProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        author: string
      }
    }
    markdownRemark: {
      id: number
      excerpt: string
      html: string
      rawMarkdownBody: string
      frontmatter: {
        title: string
        displayDate: string
        displayDateSmall: string
        description: string
      }
    }
  }
  location: Location
}

export interface BookListProps {
  data: {
    allGhostPage: {
      nodes: [
        {
          html: string
          title: string
        }
      ]
    }
  }
  location: Location
}

export interface AboutProps {
  data: {
    markdownRemark: {
      html: string
      rawMarkdownBody: string
      frontmatter: {
        title: string
      }
    }
  }
  location: Location
}

export interface Location {
  key: string
  pathname: string
  search: string
  hash: string
  state: { isAuth?: boolean }
}

export interface LayoutProps {
  description?: string
  title: string
  children: React.ReactNode
  location: Location
}

export interface SEOProps {
  title?: string
  description?: string
  image?: string
  article?: boolean
  lang?: string
  meta?: any
}
