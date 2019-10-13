import PropTypes from "prop-types"
import React, { Fragment } from "react"
import Tag from "./tag"
import REPORT_CARD_SECTIONS from "../constants"

const ReportCard = data => (
  <div className="report-card pym-child">
    <div className="report-card-header">
      <h2>{data.ID}</h2>
      {/* TODO: Include succinct, discrete visual for ranking */}
      {(data.Tags || []).map((topic, idx) => (
        <Tag topic={topic} key={idx} />
      ))}
    </div>
    <div className="report-card-body">
      {REPORT_CARD_SECTIONS.map((section, idx) => (
        <Fragment key={idx}>
          <h3>{section.title}</h3>
          {section.items.map((item, itemIdx) => (
            <p key={`${idx}-${itemIdx}`}>{item.title}</p>
          ))}
        </Fragment>
      ))}
    </div>
  </div>
)

ReportCard.propTypes = {
  ID: PropTypes.string,
  Tags: PropTypes.array,
}

ReportCard.defaultProps = {
  ID: ``,
  Tags: [],
}

export default ReportCard
