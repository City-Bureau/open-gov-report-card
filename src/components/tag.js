import PropTypes from "prop-types"
import React from "react"

import { TOPICS } from "../constants"

const TOPIC_COLOR_MAP = {
  "Criminal Justice": `blue`,
  Development: `brown`,
  Education: `red`,
  Elections: `red`,
  Environment: `green`,
  Finance: `yellow`,
  Health: `green`,
  Housing: `brown`,
  Labor: `yellow`,
  Libraries: `red`,
  Parks: `green`,
  Politics: `red`,
  Transportation: `brown`,
  "Urban Animals": `blue`,
  Utilities: `blue`,
}

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
