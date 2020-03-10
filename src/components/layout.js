/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import styles from "../styles/style.scss"
import { Colors } from "../styles/colors"

function Layout(props) {
  const { location, title, children, description } = props

  const [backgroundColor, setBackgroundColor] = useState("white")

  useEffect(() => {
    const backgroundColor = Colors[Math.floor(Math.random() * Colors.length)]
    console.log(backgroundColor)
    setBackgroundColor(backgroundColor)
  })

  const navStyle = "alink roboto faded-orange"
  const titleStyle = "f1 helvetica b underline faded-orange"
  const descriptionStyle = "f6 roboto pt1 mt2 faded-blue"

  const BackgroundContainer = styled.div`
    background: ${backgroundColor};
  `

  const nav = (
    <p>
      <Link to="/" className={navStyle.concat(" mr2")}>
        Home
      </Link>
      /
      <Link to="/book-list" className={navStyle.concat(" mh2")}>
        Book List
      </Link>
      /
      <Link to="/about" className={navStyle.concat(" ml2")}>
        About
      </Link>
    </p>
  )

  const bigTitle = (
    <div>
      <h1 className="mt4 mb0 b helvetica underline f1">{title}</h1>
      <p className={descriptionStyle}>{description}</p>
    </div>
  )

  let header

  if (location.pathname === "/") {
    header = (
      <div>
        {nav}
        {bigTitle}
      </div>
    )
  } else {
    header = <div>{nav}</div>
  }

  return (
    <BackgroundContainer>
      <div className="w-90 mw7 center">
        <header className="pt4">{header}</header>
        <main className="mt4 pa2">{children}</main>
      </div>
    </BackgroundContainer>
  )
}

export default Layout
