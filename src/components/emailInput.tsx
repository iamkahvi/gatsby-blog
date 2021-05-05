import React, { useState } from "react";

export default function EmailInput(props) {
  const [value, updateValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    document.querySelector("#email-input").blur();
    if (value === "") {
      alert("You can't submit a blank email");
      return;
    }
    props.handleInput(value, setLoading);
    updateValue("");
  };

  const handleChange = e => {
    updateValue(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="email"
            placeholder="email"
            value={value}
            onChange={handleChange}
            className="roboto mb3 f4 normal ba br3 pa2"
            id="email-input"
          ></input>
          {isLoading ? (
            <h3 className="mv0 w4 h2">loading...</h3>
          ) : (
            <button
              className="w4 h2 roboto mb3 f4 normal ba br3 pa2"
              type="submit"
            >
              subscribe
            </button>
          )}
        </div>
      </form>
    </>
  );
}
