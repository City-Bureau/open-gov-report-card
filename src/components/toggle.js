import React, { useState } from "react"

const Toggle = ({ toggleId, children }) => {
  const [toggleLabel, toggleContent] = children
  const [active, setActive] = useState("")
  const toggleActive = () => setActive(active === "" ? "active" : "")
  const onKeyPress = event => {
    if (event.key === "Enter") {
      toggleActive()
    }
  }

  return (
    <>
      <div
        className="toggle"
        role="button"
        tabIndex="0"
        onClick={toggleActive}
        onKeyPress={onKeyPress}
        aria-controls={`toggle-${toggleId}`}
        aria-expanded={!!active.toString()}
      >
        {toggleLabel}
        <span className="info-toggle">?</span>
      </div>
      <div
        id={`toggle-${toggleId}`}
        className="toggle-content"
        style={{ display: active ? `` : `none` }}
        aria-hidden={!active.toString()}
      >
        {toggleContent}
      </div>
    </>
  )
}

export default Toggle
