import React from "react"
import { Link } from "gatsby"

class Layout extends React.Component {
  render() {
    const { location, title, children, description } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

    const nav = (
      <p>
        <Link to={'/'} style={{ boxShadow: "none" }} className="alink roboto faded-orange mr2">Home</Link> /
        <Link to={'/book-list'} style={{ boxShadow: "none" }} className="alink roboto faded-orange mh2">Book List</Link> /
        <Link to={'/about'} style={{ boxShadow: "none" }} className="alink roboto faded-orange ml2">About</Link>
      </p>
    )

    let header
    
    if (location.pathname === rootPath) {
      header = (
        <div>
          {nav}
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
        <div>
          {nav}
        </div>
      )
    }
    return (
      <div className="w-90 mw7 center">
        <header className="pa2 pt5">{header}</header>
        <main className="pa2">{children}</main>
      </div>
    )
  }
}

export default Layout
