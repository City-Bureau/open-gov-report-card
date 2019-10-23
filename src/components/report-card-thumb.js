import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import Grade from "./grade"
import Tag from "./tag"

const ReportCardThumb = ({ id, tags, score, slug }) => (
  <div className="report-card-thumb">
    <div>
      <Grade score={score} />
      <Link className="report-card-thumb-heading" to={`/${slug}`}>
        {id}
      </Link>
    </div>
    <div>
      {(tags || []).map((topic, idx) => (
        <Tag topic={topic} key={idx} />
      ))}
    </div>
  </div>
)

ReportCardThumb.propTypes = {
  id: PropTypes.string,
  tags: PropTypes.array,
  score: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
}

ReportCardThumb.defaultProps = {
  id: ``,
  tags: [],
}

export default ReportCardThumb
