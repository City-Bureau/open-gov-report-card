import React, { useEffect, useRef, useState } from "react"
import { graphql } from "gatsby"
import * as pym from "pym.js"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ReportCardThumb from "../components/report-card-thumb"
import Multiselect from "../components/multiselect"
import ScrollButton from "../components/scroll-button"
import Chevron from "../components/chevron"
import SearchIcon from "../components/search-icon"
import { debounce } from "../utils"
import { TOPICS } from "../constants"

const applyFilters = ({ search, topics, sort }, data) =>
  data
    .filter(
      ({
        node: {
          data: { name },
        },
      }) => !search || name.toLowerCase().includes(search.toLowerCase().trim())
    )
    .filter(
      ({
        node: {
          data: { tags },
        },
      }) => topics.length === 0 || topics.some(t => (tags || []).includes(t))
    )
    .sort((a, b) => {
      if (sort === `alpha`) {
        if (a.node.data.name === b.node.data.name) return 0
        return a.node.data.name > b.node.data.name ? 1 : -1
      }
      return sort === `asc`
        ? a.node.fields.score - b.node.fields.score
        : b.node.fields.score - a.node.fields.score
    })

const IndexPage = ({
  data: {
    allAirtable: { edges },
  },
}) => {
  const [filters, setFilters] = useState({
    search: ``,
    topics: [],
    sort: `alpha`,
  })
  const [results, setResults] = useState(applyFilters(filters, edges))

  const [edgesActive, setEdgesActive] = useState([false, false])
  const [leftActive, rightActive] = edgesActive
  const scrollEl = useRef(null)

  // Handle horizontal overscroll on desktop Safari only
  useEffect(() => {
    if (
      !(
        scrollEl &&
        window.innerWidth > 600 &&
        navigator.userAgent.indexOf("Safari") > -1
      )
    ) {
      return
    }
    scrollEl.current.addEventListener("wheel", event => {
      if (
        (event.deltaX < 0 && scrollEl.current.scrollLeft <= 0) ||
        (event.deltaX > 0 &&
          scrollEl.current.scrollLeft >=
            scrollEl.current.scrollWidth - scrollEl.current.clientWidth)
      ) {
        event.preventDefault()
        return false
      }
      return true
    })
  }, [scrollEl])

  const onScroll = () => {
    const target = scrollEl.current
    if (!target) return
    const scrollLeftMax = target.scrollWidth - target.clientWidth
    const isLeftActive = target.scrollLeft >= 10
    const isRightActive = scrollLeftMax - target.scrollLeft >= 10
    if (isLeftActive !== leftActive || isRightActive !== rightActive) {
      setEdgesActive([isLeftActive, isRightActive])
    }
  }
  const debouncedOnScroll = debounce(onScroll, 250)
  const debouncedOnSearch = debounce(
    search => setFilters({ ...filters, search: (search || ``).trim() }),
    250
  )

  useEffect(() => {
    const pymChild = new pym.Child({ polling: 500 })
    pymChild.sendHeight()
    if (scrollEl.current) onScroll()
  }, [])

  useEffect(() => {
    setResults(applyFilters(filters, edges))
  }, [filters.search, filters.topics, filters.sort])

  return (
    <Layout>
      <SEO
        title="Open Gov Report Card | City Bureau | Grading Public Meetings Access in Chicago"
        overrideTitle
        pathname="/"
      />
      <div className="list-description">
        How open is your government? City Bureau analyzed data from over 100
        government agencies serving the Chicago area about how they conduct
        public meetings. Browse the report cards below or see our reporting{" "}
        <a
          href="https://www.citybureau.org/newswire/2019/11/12/how-open-is-your-government-one-third-of-local-agencies-get-failing-grade-for-transparency"
          target="_blank"
          rel="noopener"
        >
          here
        </a>
        .
      </div>
      <div className="filter-controls-container">
        <div className="search-container">
          <input
            placeholder="Search agencies by name"
            aria-label="Search agencies by name"
            type="search"
            onInput={e => debouncedOnSearch(e.target.value)}
          />
          <SearchIcon style={{ width: 18, height: 18 }} />
        </div>
        <div className="topics-container">
          <Multiselect
            label="Topics"
            options={TOPICS}
            onChange={values =>
              setFilters({
                ...filters,
                topics: values.map(({ value }) => value),
              })
            }
          />
        </div>
        <div className="sort-container">
          <div className="select-container">
            <select
              id="sort-by"
              name="sort-by"
              aria-label="Sort"
              value={filters.sort}
              onChange={e => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="alpha">Sort A to Z</option>
              <option value="desc">Sort grades A to F</option>
              <option value="asc">Sort grades F to A</option>
            </select>
            <Chevron />
          </div>
        </div>
        <div className="count-container">{results.length} results</div>
      </div>
      <div className="filter-container">
        <div className={`filter-edge left ${leftActive ? "is-active" : ""}`}>
          <ScrollButton isLeft scrollEl={scrollEl} />
        </div>
        <div
          className="filter-scroll"
          ref={scrollEl}
          onScroll={debouncedOnScroll}
        >
          {results.length > 0 ? (
            results.map(
              ({
                node: {
                  fields: { slug, score },
                  data: { name, tags },
                },
              }) => (
                <ReportCardThumb
                  key={slug}
                  slug={slug}
                  score={score}
                  name={name}
                  tags={tags}
                />
              )
            )
          ) : (
            <div className="no-results">
              <span>No results</span>
            </div>
          )}
        </div>
        <div className={`filter-edge right ${rightActive ? "is-active" : ""}`}>
          <ScrollButton scrollEl={scrollEl} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allAirtable(filter: { table: { eq: "Agencies" } }) {
      edges {
        node {
          data {
            name: Display_Name
            tags: Tags
          }
          fields {
            slug
            score
          }
        }
      }
    }
  }
`

export default IndexPage
