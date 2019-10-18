import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import Score from "./score"
import Tag from "./tag"

const ReportCardThumb = ({ ID, Tags, slug }) => (
  <div className="report-card-thumb">
    <div>
      <Score score={Math.floor(Math.random() * 4) + 1} />
      <Link className="report-card-thumb-heading" to={`/${slug}`}>
        {ID}
      </Link>
    </div>
    <div>
      {(Tags || []).map((topic, idx) => (
        <Tag topic={topic} key={idx} />
      ))}
    </div>
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
