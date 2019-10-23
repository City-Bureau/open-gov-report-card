import React, { useEffect, useRef, useState } from "react"
import { graphql } from "gatsby"
import * as pym from "pym.js"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ReportCardThumb from "../components/report-card-thumb"
import Multiselect from "../components/multiselect"
import Chevron from "../components/chevron"
import SearchIcon from "../components/search-icon"
import { debounce } from "../utils"
import { TOPICS } from "../constants"

const applyFilters = ({ search, topics }, data) =>
  data
    .filter(
      ({
        node: {
          data: { id },
        },
      }) => !search || id.toLowerCase().includes(search)
    )
    .filter(
      ({
        node: {
          data: { tags },
        },
      }) => topics.length === 0 || topics.some(t => (tags || []).includes(t))
    )
// .sort(({ node }) => true)

const ListPage = ({
  data: {
    allAirtable: { edges },
  },
}) => {
  const [filters, setFilters] = useState({
    search: ``,
    topics: [],
    sort: `desc`,
  })
  const [results, setResults] = useState(edges)

  const [edgesActive, setEdgesActive] = useState([false, false])
  const [leftActive, rightActive] = edgesActive
  const scrollEl = useRef(null)

  const onScroll = () => {
    const target = scrollEl.current
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
    const pymChild = new pym.Child()
    pymChild.sendHeight()
    if (scrollEl.current) onScroll()
  })

  useEffect(() => {
    setResults(applyFilters(filters, edges))
  }, [filters.search, filters.topics, filters.sort])

  return (
    <Layout>
      <SEO title="Report Cards" />
      <h1>Report Cards</h1>
      <div className="filter-controls-container">
        <div className="search-container">
          <input
            placeholder="Search"
            aria-label="Search"
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
          <label htmlFor="sort-by">Sort by</label>
          <select id="sort-by" name="sort-by">
            <option value=""></option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>{results.length} results</div>
      </div>
      <div className="filter-container">
        <div className={`filter-edge left ${leftActive ? "is-active" : ""}`}>
          <Chevron style={{ transform: "rotate(180deg)" }} />
        </div>
        <div
          className="filter-scroll"
          ref={scrollEl}
          onScroll={debouncedOnScroll}
        >
          {results.map(
            ({
              node: {
                fields: { slug, score },
                data: { id, tags },
              },
            }) => (
              <ReportCardThumb
                key={slug}
                slug={slug}
                score={score}
                id={id}
                tags={tags}
              />
            )
          )}
        </div>
        <div className={`filter-edge right ${rightActive ? "is-active" : ""}`}>
          <Chevron />
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
            id: ID
            agency: Agency
            subAgency: Sub_Agency
            jurisdiction: Jurisdiction
            description: Description
            tags: Tags
            website: Website
            omagFlags: OMA_Flags
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

export default ListPage
