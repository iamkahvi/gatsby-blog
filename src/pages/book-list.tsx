import React from "react"
import { navigate } from "gatsby"

export default class BookListOld extends React.Component {
  componentDidMount() {
    navigate("/book-shelf/")
  }

  render() {
    return <></>
  }
}
