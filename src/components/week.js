import PropTypes from "prop-types"
import React from "react"
import { scaleThreshold } from "d3-scale"

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

const COLORS = ["#d8d8d8", "#deebf7", "#9ecae1", "#3182bd"]

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

const Week = ({ times }) => {
  const color = scaleThreshold()
    .domain([2, Math.max(...times.map(d => d[2]))])
    .range(COLORS.slice(1))
  return (
    <div className="week">
      <div className="week-row">
        <div className="weekday-labels">
          <div className="weekday-label">&nbsp;</div>
          {DAYS.map(day => (
            <div key={day} className="weekday-label">
              <span>{getDayAbbrev(day)}</span>
            </div>
          ))}
        </div>
        <div className="week-grid">
          <div className="weekday">
            {HOURS.map((hour, idx) => (
              <div key={hour} className="hour-label">
                {idx % 2 === 0 ? getTime(hour) : ``}
              </div>
            ))}
          </div>
          {DAYS.map(day => (
            <div key={day} className="weekday">
              {HOURS.map(hour => {
                const timeData = times.find(
                  ([timeDay, timeHour, _]) =>
                    timeDay === day && +timeHour.split(":")[0] === hour
                )
                return (
                  <div
                    key={hour}
                    className="hour"
                    style={{
                      backgroundColor: timeData ? color(timeData[2]) : "",
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="week-legend">
        <div>Less</div>
        {COLORS.map(color => (
          <div
            key={color}
            className="color"
            style={{ backgroundColor: color }}
          />
        ))}
        <div>More</div>
      </div>
    </div>
  )
}

Week.propTypes = {
  times: PropTypes.array,
}

Week.defaultProps = {
  times: [],
}

export default Week
