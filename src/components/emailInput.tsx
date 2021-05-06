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
            className="roboto f4 normal mr3 ba br3 pa2"
            id="email-input"
          ></input>
          <button
            className="roboto w4 f4 normal ba br3 pa2 flex items-center justify-center"
            type="submit"
          >
            {isLoading ? <div id="loading"></div> : "subscribe"}
          </button>
        </div>
      </form>
    </>
  );
}
