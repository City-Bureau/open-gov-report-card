import PropTypes from "prop-types"
import React from "react"
import Score from "./score"
import Tag from "./tag"
import Toggle from "./toggle"
import Chevron from "./chevron"
import REPORT_CARD_SECTIONS from "../constants"

const ReportCard = data => (
  <div className="report-card pym-child">
    <div className="report-card-header">
      <h2>{data.ID}</h2>
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
          <p>{section.description}</p>
          {section.items.map((item, itemIdx) => (
            <Toggle key={itemIdx} index={itemIdx}>
              <div className="report-card-grade-label">
                <span
                  className={`report-card-grade ${
                    item.checked ? "positive" : "negative"
                  }`}
                >
                  {/* {item.checked ? "👍" : "👎"} */}
                  <Chevron />
                </span>
                <span>{item.title}</span>
              </div>
              <p>{item.detail}</p>
            </Toggle>
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
