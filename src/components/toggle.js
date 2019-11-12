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
        <svg className="info-toggle" viewBox="0 0 19 19">
          <path
            fill="currentColor"
            fill-rule="nonzero"
            d="M9.5 0C4.254 0 0 4.255 0 9.5A9.5 9.5 0 0 0 9.5 19 9.5 9.5 0 0 0 19 9.5C19 4.255 14.746 0 9.5 0zm0 4.214a1.609 1.609 0 1 1 0 3.217 1.609 1.609 0 0 1 0-3.217zm2.145 9.73a.46.46 0 0 1-.46.46h-3.37a.46.46 0 0 1-.46-.46v-.92a.46.46 0 0 1 .46-.46h.46v-2.451h-.46a.46.46 0 0 1-.46-.46v-.92a.46.46 0 0 1 .46-.459h2.451a.46.46 0 0 1 .46.46v3.83h.46a.46.46 0 0 1 .46.46v.92z"
          />
        </svg>
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
