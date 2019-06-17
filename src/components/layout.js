import React from "react"
import { Link } from "gatsby"

class Layout extends React.Component {
  render() {
    const { location, title, children, description } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header
    
    if (location.pathname === rootPath) {
      header = (
        <div className="pt3">
          <p>
            <Link to={'/'} style={{ boxShadow: "none" }} className="alink helvetica faded-orange mh2">Home</Link> / 
            <Link to={'/book-list'} style={{ boxShadow: "none" }} className="alink helvetica faded-orange mh2">Book List</Link> / 
            <Link to={'/about'} style={{ boxShadow: "none" }} className="alink helvetica faded-orange mh2">About</Link>
          </p>
          <h1
            className="mt3 mb0"
          >
            <Link
              style={{
                boxShadow:`none`,
              }}
              className="f1 helvetica underline faded-orange"
              to={`/`}
            > {title} </Link>
          </h1>
          <p
            className="f6 roboto pt1 mt2 faded-blue"
          > {description} </p>
        </div>
      )
    } else {
      header = (
        <div className="pt3">
          <p>
            <Link to={'/'} style={{ boxShadow: "none" }} className="alink helvetica faded-orange mh2">Home</Link> /
            <Link to={'/book-list'} style={{ boxShadow: "none" }} className="alink helvetica faded-orange mh2">Book List</Link> /
            <Link to={'/about'} style={{ boxShadow: "none" }} className="alink helvetica faded-orange mh2">About</Link>
          </p>
          </div>
      )
    }
    return (
      <div className="w-90 mw7 center">
        <header className="pa2 pt3">{header}</header>
        <main className="pa2">{children}</main>
      </div>
    )
  }
}

export default Layout
