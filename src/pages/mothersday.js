import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import SEO from "../components/seo"

export default function MDPage(props) {
  const { location } = props
  const [isAuth, setAuth] = useState(false)

  useEffect(() => {
    if (location?.state?.isAuth) {
      setAuth(true)
    } else {
      navigate("/")
    }
  }, [])

  return (
    <>
      {isAuth && (
        <>
          <SEO title="Mother's Day " />
          <div className="animation-color-pulse"></div>
          <div className=" full flex justify-center items-center">
            <div className="mb4">
              <h1 className="shadow mv4 ph3">Happy Mother's Day!</h1>
              <div className="paragraph ml5 mt4 pv3">
                Dear Mama, <br />
                <br />I hope you have a wonderful day. You are the most
                naturally loving, caring person that exists in my life. The more
                I grow up the more I am thankful for your support and love.
                &#128155;
              </div>
              <img
                src="./assets/mama.jpg"
                alt="mama image"
                className="ml5 mt4"
              />

              <div className="layered-shadow ml5 mt4">- kahvi</div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
