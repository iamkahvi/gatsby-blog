import React from "react";

export interface PostNode {
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    year: string;
    displayDate: string;
    displayDateSmall: string;
    title: string;
    description: string;
  };
}

export interface PostEdge {
  node: PostNode;
  previous: PostNode;
}

interface PageProps {
  location: Location;
  pageContext: any;
}

export interface IndexProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
      };
    };
    allMarkdownRemark: {
      edges: PostEdge[];
    };
  };
}

export interface BlogProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        author: string;
      };
    };
    markdownRemark: {
      id: number;
      excerpt: string;
      html: string;
      rawMarkdownBody: string;
      frontmatter: {
        title: string;
        displayDate: string;
        displayDateSmall: string;
        description: string;
      };
    };
  };
}

type Highlight = {
  book: string;
  author: string;
  quote: string;
  page: number | null;
  location: {
    start: number;
    end: number;
  };
  dateAdded: number;
};

export interface HighlightJsonProps extends PageProps {
  pageContext: {
    highlightData: Highlight[];
    siteInfo: any;
  };
}

export interface BookNode {
  bookTitle: string;
  bookAuthor: string;
  bookDescription: {
    raw: string;
  };
  dateFinished: string;
  year: string;
}
export interface BookEdge {
  node: BookNode;
  previous?: BookNode | undefined;
}

export interface BookShelfProps {
  data: {
    books: {
      edges: BookEdge[];
    };
    bookShelf: {
      nodes: [
        {
          intro: {
            raw: string;
          };
          title: string;
        }
      ];
    };
  };
  location: Location;
}

export interface AboutProps {
  data: {
    markdownRemark: {
      html: string;
      rawMarkdownBody: string;
      frontmatter: {
        title: string;
      };
    };
  };
  location: Location;
}

export interface Location {
  key: string;
  pathname: string;
  search: string;
  hash: string;
  state: { isAuth?: boolean };
}

export interface LayoutProps {
  description?: string;
  title: string;
  children: React.ReactNode;
  location: Location;
}

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  lang?: string;
  meta?: any;
}
