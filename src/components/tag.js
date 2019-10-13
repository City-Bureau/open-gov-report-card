import PropTypes from "prop-types"
import React from "react"

const TOPIC_BACKGROUND_MAP = {
  Education: `rgba(0,0,0,0)`,
}

const TOPIC_COLOR_MAP = {
  Education: `black`,
}

const Tag = ({ topic }) => (
  <div
    className="topic-tag"
    style={{
      color: topic in TOPIC_COLOR_MAP ? TOPIC_COLOR_MAP[topic] : `black`,
      backgroundColor:
        topic in TOPIC_BACKGROUND_MAP
          ? TOPIC_BACKGROUND_MAP[topic]
          : `lightgray`,
    }}
  >
    {topic}
  </div>
)

Tag.propTypes = {
  topic: PropTypes.string.isRequired,
}

export default Tag
