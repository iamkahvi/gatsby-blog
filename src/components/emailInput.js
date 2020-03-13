import React, { useState } from "react"
import variables from "../styles/style.scss"

export default function EmailInput(props) {
  const [value, updateValue] = useState("")
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (value === "") {
      alert("You can't submit a blank email")
      return
    }
    console.log(value)

    props.handleInput(value, setLoading)

    updateValue("")
  }

  const handleChange = e => {
    updateValue(e.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="email"
            placeholder="email"
            value={value}
            onChange={handleChange}
            className="mr2"
          ></input>
          {isLoading ? (
            <h3 className="mv0 w4 h2">loading...</h3>
          ) : (
            <button className="w4 h2" type="submit">
              subscribe
            </button>
          )}
        </div>
      </form>
    </>
  )
}
