import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import Chevron from "./chevron"

const setupOptions = options =>
  options.map(option =>
    typeof option === "string"
      ? { label: option, value: option, checked: false }
      : { ...option, checked: false }
  )

// TODO: Click outside to close
const Multiselect = ({ label, options, onChange }) => {
  const [active, setActive] = useState("")
  const [inputOptions, setInputOptions] = useState(setupOptions(options))

  const toggleActive = () => setActive(active === "" ? "active" : "")
  const onKeyPress = event => {
    if (event.key === "Enter") {
      toggleActive()
    }
  }

  const onInputChange = event =>
    setInputOptions(
      inputOptions.map(option =>
        option.value === event.target.value
          ? { ...option, checked: !option.checked }
          : option
      )
    )

  const onInputKeyPress = event => {
    if (event.key === "Enter") {
      onInputChange(event)
    }
  }

  useEffect(() => {
    onChange(inputOptions.filter(({ checked }) => checked))
  }, inputOptions.map(({ checked }) => checked))

  const selectedOptions = inputOptions.filter(({ checked }) => checked)

  return (
    <div className="multiselect">
      <div
        className="multiselect-control"
        role="button"
        tabIndex="0"
        onClick={toggleActive}
        onKeyPress={onKeyPress}
        aria-controls={`toggle-${label}`}
        aria-expanded={!!active.toString()}
      >
        <span className="multiselect-label">
          {selectedOptions.length
            ? selectedOptions.map(({ label }) => label).join(", ")
            : label}
        </span>
        <Chevron />
      </div>
      <div
        id={`toggle-${label}`}
        aria-hidden={!active.toString()}
        style={{ display: active ? `` : `none` }}
        className="multiselect-content"
      >
        {inputOptions.map(({ label, value, checked, className }) => (
          <label key={value}>
            <input
              type="checkbox"
              value={value}
              checked={checked}
              onChange={onInputChange}
              onKeyPress={onInputKeyPress}
            />
            <span tabIndex="-1" className={className || ``}>
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

Multiselect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Multiselect
