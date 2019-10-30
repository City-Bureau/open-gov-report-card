import PropTypes from "prop-types"
import React from "react"

import { TOPICS, TOPIC_COLOR_MAP } from "../constants"

const Tag = ({ topic }) =>
  TOPICS.includes(topic) ? (
    <div
      className={`topic-tag ${
        topic in TOPIC_COLOR_MAP ? TOPIC_COLOR_MAP[topic] : ``
      }`}
    >
      {topic}
    </div>
  ) : (
    ""
  )

Tag.propTypes = {
  topic: PropTypes.string.isRequired,
}

export default Tag
