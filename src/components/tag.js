import PropTypes from "prop-types"
import React from "react"

import { TOPICS, TOPIC_COLOR_MAP } from "../constants"

const Tag = ({ topic, ignoreColor }) =>
  TOPICS.includes(topic) ? (
    <div
      className={`topic-tag ${
        topic in TOPIC_COLOR_MAP && !ignoreColor ? TOPIC_COLOR_MAP[topic] : ``
      }`}
    >
      {topic}
    </div>
  ) : (
    ""
  )

Tag.propTypes = {
  topic: PropTypes.string.isRequired,
  ignoreColor: PropTypes.bool,
}

Tag.defaultProps = {
  ignoreColor: false,
}

export default Tag
