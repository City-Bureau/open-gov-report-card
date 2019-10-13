import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import Tag from "./tag"

const ReportCardThumb = ({ ID, Tags, slug }) => (
  <div className="report-card-thumb">
    <Link to={slug}>
      <p>{ID}</p>
    </Link>
    {/* TODO: Include succinct, discrete visual for ranking */}
    {(Tags || []).map((topic, idx) => (
      <Tag topic={topic} key={idx} />
    ))}
  </div>
)

ReportCardThumb.propTypes = {
  ID: PropTypes.string,
  Tags: PropTypes.array,
  slug: PropTypes.string.isRequired,
}

ReportCardThumb.defaultProps = {
  ID: ``,
  Tags: [],
}

export default ReportCardThumb
