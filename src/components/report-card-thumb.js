import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import Grade from "./grade"
import Tag from "./tag"

const ReportCardThumb = ({ name, tags, score, slug }) => (
  <div className="report-card-thumb">
    <div>
      <Grade score={score} />
      <Link className="report-card-thumb-heading" to={`/${slug}`}>
        {name}
      </Link>
    </div>
    <div className="topic-row">
      {(tags || []).map(topic => (
        <Tag topic={topic} ignoreColor key={topic} />
      ))}
    </div>
  </div>
)

ReportCardThumb.propTypes = {
  name: PropTypes.string,
  tags: PropTypes.array,
  score: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
}

ReportCardThumb.defaultProps = {
  name: ``,
  tags: [],
}

export default ReportCardThumb
