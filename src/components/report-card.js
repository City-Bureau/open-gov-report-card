import PropTypes from "prop-types"
import React, { Fragment, useState } from "react"
import Score from "./score"
import Tag from "./tag"
import REPORT_CARD_SECTIONS from "../constants"

const CardItem = ({ title, checked, detail, index }) => {
  const [setActive, setActiveState] = useState("")
  const toggleActive = () => setActiveState(setActive === "" ? "active" : "")

  // TODO: Include a sense of how common something is
  return (
    <Fragment>
      <div className="toggle">
        <p key={index}>
          {title} - {checked ? "Yes" : "No"}
        </p>
        <button className="info-toggle" onClick={toggleActive}>
          ?
        </button>
      </div>
      <div
        className="toggle-content"
        style={{ display: setActive ? `inherit` : `none` }}
      >
        <p>{detail}</p>
      </div>
    </Fragment>
  )
}

const ReportCard = data => (
  <div className="report-card pym-child">
    <div className="report-card-header">
      <h2>{data.ID}</h2>
      {/* TODO: Include succinct, discrete visual for ranking */}
      <Score score={2} />
      {(data.Tags || []).map((topic, idx) => (
        <Tag topic={topic} key={idx} />
      ))}
    </div>
    <div className="report-card-description">
      {(data.Description || "").split("\n").map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
    <div className="report-card-body">
      {REPORT_CARD_SECTIONS.map((section, idx) => (
        <div className="report-card-section" key={idx}>
          <h3>{section.title}</h3>
          {section.items.map((item, itemIdx) => (
            <CardItem
              key={`${idx}-${itemIdx}`}
              {...{ ...item, index: `${idx}-${itemIdx}` }}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
)

ReportCard.propTypes = {
  ID: PropTypes.string,
  Tags: PropTypes.array,
  Description: PropTypes.string,
}

ReportCard.defaultProps = {
  ID: ``,
  Tags: [],
  Description: ``,
}

export default ReportCard
