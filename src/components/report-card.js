import PropTypes from "prop-types"
import React from "react"
import Grade from "./grade"
import Tag from "./tag"
import Toggle from "./toggle"
import Chevron from "./chevron"
import Chicago from "./chicago"
import Cook from "./cook"
import { REPORT_CARD_SECTIONS, gradeQuestion } from "../grading"

const ReportCardToggle = ({ id, title, detail, flags, idx }) => (
  <Toggle index={idx}>
    <div className="report-card-grade-label">
      <span
        className={`report-card-grade ${
          { 1: `positive`, 0: `na`, [-1]: `negative` }[gradeQuestion(id, flags)]
        }`}
      >
        <Chevron />
      </span>
      <span>{title}</span>
    </div>
    <p>{detail}</p>
  </Toggle>
)

// TODO: Get location map in context
const ReportCardSection = ({ title, description, flags, items }) => (
  <div className="report-card-section">
    <h3>{title}</h3>
    <p>{description}</p>
    {items.map((item, itemIdx) => (
      <ReportCardToggle key={itemIdx} {...{ ...item, flags, idx: itemIdx }} />
    ))}
  </div>
)

const ReportCard = ({ name, tags, score, description, flags }) => (
  <div className="report-card pym-child">
    <div className="report-card-header">
      <h2>{name}</h2>
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
      <Chicago style={{ height: 50, width: 50, color: "purple" }} />
      <Cook style={{ height: 50, width: 50 }} />
    </div>
    <div className="report-card-body">
      {REPORT_CARD_SECTIONS.map(({ title, description, items }, idx) => (
        <ReportCardSection
          title={title}
          description={description}
          items={items}
          flags={flags}
          key={idx}
          idx={idx}
        />
      ))}
    </div>
  </div>
)

ReportCard.propTypes = {
  name: PropTypes.string,
  tags: PropTypes.array,
  score: PropTypes.number.isRequired,
  description: PropTypes.string,
  flags: PropTypes.array,
}

ReportCard.defaultProps = {
  name: ``,
  tags: [],
  description: ``,
  flags: [],
}

export default ReportCard
