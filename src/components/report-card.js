import PropTypes from "prop-types"
import React from "react"
import Grade from "./grade"
import GradeSymbol from "./grade-symbol"
import Tag from "./tag"
import Toggle from "./toggle"
import Chicago from "./chicago"
import Cook from "./cook"
import Week from "./week"
import { REPORT_CARD_SECTIONS, gradeQuestion } from "../grading"

const ReportCardToggle = ({ id, title, detail, flags, idx }) => (
  <Toggle index={idx}>
    <div className="report-card-grade-label">
      <GradeSymbol value={gradeQuestion(id, flags)} />
      <span>{title}</span>
    </div>
    <p>{detail}</p>
  </Toggle>
)

const ReportCardSection = ({
  title,
  description,
  flags,
  items,
  website,
  publicCommentPolicy,
}) => {
  let details = null
  if (title === `Public Comment`) {
    details = (
      <p>
        {publicCommentPolicy ? (
          <a
            href={publicCommentPolicy}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the public comment policy
          </a>
        ) : (
          <span className="unavailable">
            No public comment policy available
          </span>
        )}
      </p>
    )
  } else if (title === `Information`) {
    details = (
      <p>
        {website ? (
          <a href={website} target="_blank" rel="noopener noreferrer">
            See agency website
          </a>
        ) : (
          <span className="unavailable">
            This agency does not have a website
          </span>
        )}
      </p>
    )
  }
  return (
    <div className="report-card-section">
      <h3>{title}</h3>
      <p>{description}</p>
      {details}
      {items.map((item, itemIdx) => (
        <ReportCardToggle
          key={`${title.replace(" ", "_")}-${itemIdx}`}
          {...{
            ...item,
            flags,
            toggleId: `${title.replace(" ", "_")}-${itemIdx}`,
          }}
        />
      ))}
    </div>
  )
}

const ReportCard = ({
  name,
  tags,
  score,
  correct,
  questions,
  description,
  context,
  website,
  publicCommentPolicy,
  points,
  times,
  jurisdiction,
  flags,
}) => (
  <div className="report-card pym-child">
    <div className="report-card-header">
      <h2>{name}</h2>
      {(tags || []).map(topic => (
        <Tag topic={topic} key={topic} />
      ))}
    </div>
    <div className="report-card-score-container">
      <Grade score={score} isLarge />
      <p>
        This agency passes {correct} of the {questions} categories where we have
        information for a score of {+(score * 100).toFixed(2)}%.
      </p>
    </div>
    <div className="report-card-description">
      {(description || "").split("\n").map((line, idx) => (
        <p key={`desc-${idx}`}>{line}</p>
      ))}
      {(context || "").split("\n").map((line, idx) => (
        <p key={`context-${idx}`}>{line}</p>
      ))}
    </div>
    <div className="report-card-body">
      {REPORT_CARD_SECTIONS.map(({ title, description, items }) => (
        <ReportCardSection
          title={title}
          description={description}
          items={items}
          flags={flags}
          website={website}
          publicCommentPolicy={publicCommentPolicy}
          key={title}
        />
      ))}
      <div className="report-card-row">
        <div className="report-card-section">
          <h4>Meeting Times</h4>
          <Week times={times} />
        </div>
        <div className="report-card-section">
          <h4>Meeting Locations</h4>
          {(jurisdiction || []).includes("Chicago") ? (
            <Chicago style={{ height: 175, width: 175 }} points={points} />
          ) : (
            <Cook style={{ height: 175, width: 175 }} points={points} />
          )}
        </div>
      </div>
    </div>
  </div>
)

ReportCard.propTypes = {
  name: PropTypes.string,
  tags: PropTypes.array,
  score: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
  questions: PropTypes.number.isRequired,
  description: PropTypes.string,
  context: PropTypes.string,
  website: PropTypes.string,
  publicCommentPolicy: PropTypes.string,
  agencyId: PropTypes.array,
  points: PropTypes.array,
  times: PropTypes.array,
  jurisdiction: PropTypes.array,
  flags: PropTypes.array,
}

ReportCard.defaultProps = {
  name: ``,
  tags: [],
  description: ``,
  context: ``,
  website: ``,
  publicCommentPolicy: ``,
  agencyId: [],
  points: [],
  times: [],
  jurisdiction: [],
  flags: [],
}

export default ReportCard
