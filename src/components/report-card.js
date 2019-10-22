import PropTypes from "prop-types"
import React from "react"
import Grade from "./grade"
import Tag from "./tag"
import Toggle from "./toggle"
import Chevron from "./chevron"
import { REPORT_CARD_SECTIONS } from "../constants"

const ReportCard = ({ ID, Tags, Description }) => (
  <div className="report-card pym-child">
    <div className="report-card-header">
      <h2>{ID}</h2>
      {(Tags || []).map((topic, idx) => (
        <Tag topic={topic} key={idx} />
      ))}
    </div>
    <div className="report-card-score-container">
      <Grade score={Math.floor(Math.random() * 5)} isLarge />
      <p>X of X categories. This is better/worse than X% of agencies</p>
    </div>
    <div className="report-card-description">
      {(Description || "").split("\n").map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
    <div className="report-card-body">
      {REPORT_CARD_SECTIONS.map(({ title, description, items }, idx) => (
        <div className="report-card-section" key={idx}>
          <h3>{title}</h3>
          <p>{description}</p>
          {items.map((item, itemIdx) => (
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
