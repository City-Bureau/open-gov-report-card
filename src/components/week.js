import PropTypes from "prop-types"
import React from "react"

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const getDayAbbrev = day => {
  if (day === "Sunday") {
    return "Su"
  } else if (day === "Thursday") {
    return "Th"
  }
  return day[0]
}

const getTime = hour => {
  if (hour < 12) {
    return `${hour}am`
  } else if (hour === 12) {
    return `${hour}pm`
  } else {
    return `${hour - 12}pm`
  }
}

const Week = ({ times }) => (
  <div className="week">
    <div className="weekday-labels">
      <div className="weekday-label">&nbsp;</div>
      {DAYS.map(day => (
        <div key={day} className="weekday-label">
          <span className="is-desktop">{day}</span>
          <span className="is-mobile">{getDayAbbrev(day)}</span>
        </div>
      ))}
    </div>
    <div className="week-grid">
      <div className="weekday">
        {HOURS.map(hour => (
          <div key={hour} className="hour-label">
            {getTime(hour)}
          </div>
        ))}
      </div>
      {DAYS.map(day => (
        <div key={day} className="weekday">
          {HOURS.map(hour => (
            <div
              key={hour}
              className={`hour ${
                times.filter(
                  ([timeDay, timeHour]) =>
                    timeDay === day && +timeHour.split(":")[0] === hour
                ).length
                  ? "active"
                  : ""
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
)

Week.propTypes = {
  times: PropTypes.array,
}

Week.defaultProps = {
  times: [],
}

export default Week
