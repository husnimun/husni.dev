import React from "react"

export const onRenderBody = ({ setPostBodyComponents, setBodyAttributes  }) => {
  setPostBodyComponents([
    <script
      data-goatcounter="https://husni.goatcounter.com/count"
      async
      src="//gc.zgo.at/count.js"
    ></script>,
  ])

  setBodyAttributes({
    className: "my-body-class",
  })
}
