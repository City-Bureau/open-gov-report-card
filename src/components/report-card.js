import PropTypes from "prop-types"
import React from "react"
import remark from "remark"
import html from "remark-html"
import remarkAttr from "remark-attr"
import recommended from "remark-preset-lint-recommended"
import ExternalLinkIcon from "./external-link-icon"
import Grade from "./grade"
import GradeSymbol from "./grade-symbol"
import Tag from "./tag"
import Toggle from "./toggle"
import Chicago from "./chicago"
import Cook from "./cook"
import Week from "./week"
import {
  REPORT_CARD_SECTIONS,
  TOTAL_REPORT_CARD_QUESTIONS,
  getGrade,
  gradeQuestion,
} from "../grading"

const processor = remark()
  .use(recommended)
  .use(remarkAttr)
  .use(html)

const ReportCardToggle = ({ toggleId, id, title, detail, flags }) => (
  <Toggle toggleId={toggleId}>
    <div className="report-card-grade-label">
      <GradeSymbol value={gradeQuestion(id, flags)} />
      <span>{title}</span>
    </div>
    <div dangerouslySetInnerHTML={{ __html: processor.processSync(detail) }} />
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
            className="report-card-detail-link"
          >
            <span>Read the public comment policy</span>
            <ExternalLinkIcon />
          </a>
        ) : (
          <span className="report-card-missing-info">
            No public comment policy available
          </span>
        )}
      </p>
    )
  } else if (title === `Information`) {
    details = (
      <p>
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="report-card-detail-link"
          >
            <span>See agency website</span>
            <ExternalLinkIcon />
          </a>
        ) : (
          <div className="report-card-missing-info">
            This agency does not have a website
          </div>
        )}
      </p>
    )
  }
  return (
    <div className="report-card-section">
      <h3>{title}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: processor.processSync(description) }}
      />
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
    <div className="report-card-score-container">
      <Grade score={score} isLarge />
      <div className={`report-card-score-description ${getGrade(score)}`}>
        This agency passes{" "}
        <span className="highlight">
          {correct} of the {questions}
        </span>{" "}
        categories for a score of{" "}
        <span className="highlight">{+(score * 100).toFixed(2)}%</span>.
        {TOTAL_REPORT_CARD_QUESTIONS - questions > 0
          ? ` Information was not available for ${TOTAL_REPORT_CARD_QUESTIONS -
              questions} categories`
          : ``}
      </div>
    </div>
    <div className="report-card-header">
      <h2>{name}</h2>
      {(tags || []).map(topic => (
        <Tag topic={topic} ignoreColor key={topic} />
      ))}
    </div>
    <div className="report-card-description">
      <div
        dangerouslySetInnerHTML={{
          __html: processor.processSync(description || ""),
        }}
      />
      {context || "" ? (
        <div
          dangerouslySetInnerHTML={{ __html: processor.processSync(context) }}
        />
      ) : (
        ``
      )}
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
      {times.length > 0 || points.length > 0 ? (
        ``
      ) : (
        <div className="report-card-row">
          <span className="report-card-missing-info">
            Detailed meeting information not available
          </span>
        </div>
      )}
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
