import React from "react"
import { Link } from "gatsby"

class Layout extends React.Component {
  render() {
    const { location, title, children, description } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <div className="pt3">
          <p>
            <Link to={'/home'} style={{ boxShadow: "none" }} className="alink helvetica faded-orange ph2">Home</Link> / 
            <Link to={'/book-list'} style={{ boxShadow: "none" }} className="alink helvetica faded-orange ph2">Book List</Link> / 
            <Link to={'/about'} style={{ boxShadow: "none" }} className="alink helvetica faded-orange ph2">About</Link>
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
            className="f6 helvetica pt0 mt2 faded-blue"
          > {description} </p>
        </div>
      )
    } else {
      header = (
        <h3
          className="f3 helvetica faded-orange"
        >
          <Link
            style={{
              boxShadow: `none`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div className="w-70 center">
        <header className="fl pa2 pt3">{header}</header>
        <main className="fl pa2">{children}</main>
      </div>
    )
  }
}

export default Layout
