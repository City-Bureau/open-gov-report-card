import PropTypes from "prop-types"
import React from "react"
import Grade from "./grade"
import Tag from "./tag"
import Toggle from "./toggle"
import Chevron from "./chevron"
import Chicago from "./chicago"
import Cook from "./cook"
import Week from "./week"
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

const ReportCardSection = ({ title, description, flags, items }) => (
  <div className="report-card-section">
    <h3>{title}</h3>
    <p>{description}</p>
    {items.map((item, itemIdx) => (
      <ReportCardToggle key={itemIdx} {...{ ...item, flags, idx: itemIdx }} />
    ))}
  </div>
)

const ReportCard = ({
  name,
  tags,
  score,
  description,
  points,
  times,
  flags,
}) => (
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
      <div className="report-card-section">
        <h3>Meeting Times</h3>
        {times.length > 0 ? (
          <Week times={times} />
        ) : (
          <p>We don't have meeting times for this agency</p>
        )}
      </div>
      <div className="report-card-section">
        <h3>Meeting Locations</h3>
        {name.includes("Chicago") ? (
          <Chicago style={{ height: 150, width: 150 }} points={points} />
        ) : (
          <Cook style={{ height: 150, width: 150 }} points={points} />
        )}
      </div>
    </div>
  </div>
)

ReportCard.propTypes = {
  name: PropTypes.string,
  tags: PropTypes.array,
  score: PropTypes.number.isRequired,
  description: PropTypes.string,
  points: PropTypes.array,
  times: PropTypes.array,
  flags: PropTypes.array,
}

ReportCard.defaultProps = {
  name: ``,
  tags: [],
  description: ``,
  points: [],
  times: [],
  flags: [],
}

export default ReportCard
