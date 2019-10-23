import PropTypes from "prop-types"
import React from "react"
import Grade from "./grade"
import Tag from "./tag"
import Toggle from "./toggle"
import Chevron from "./chevron"
import { REPORT_CARD_SECTIONS } from "../constants"

const ReportCard = ({ id, tags, score, description }) => (
  <div className="report-card pym-child">
    <div className="report-card-header">
      <h2>{id}</h2>
      {(tags || []).map((topic, idx) => (
        <Tag topic={topic} key={idx} />
      ))}
    </div>
    <div className="report-card-score-container">
      <Grade score={score} isLarge />
      <p>X of X categories. This is better/worse than X% of agencies</p>
    </div>
    <div className="report-card-description">
      {(description || "").split("\n").map((line, idx) => (
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
  id: PropTypes.string,
  tags: PropTypes.array,
  score: PropTypes.number.isRequired,
  description: PropTypes.string,
}

ReportCard.defaultProps = {
  id: ``,
  tags: [],
  description: ``,
}

export default ReportCard
