import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import * as pym from "pym.js"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ReportCardThumb from "../components/report-card-thumb"

const ListPage = ({ data }) => {
  // eslint-disable-next-line
  const [cards, setCards] = useState(data.allAirtable.edges)
  // eslint-disable-next-line
  const [results, setResults] = useState(data.allAirtable.edges)

  useEffect(() => {
    const pymChild = new pym.Child()
    pymChild.sendHeight()
  })

  return (
    <Layout>
      <SEO title="Report Cards" />
      <h1>Report Cards</h1>
      <div class="filter-controls-container">
        <div>Search</div>
        <div>Topics</div>
        <div>Sort By</div>
        <div>{results.length} results</div>
      </div>
      <div className="filter-container">
        <div className="filter-edge left">
          <button>{"<"}</button>
        </div>
        <div className="filter-scroll">
          {results.map(({ node }) => (
            <ReportCardThumb
              key={node.slug}
              {...{
                ...node.data,
                ...node.fields,
              }}
            />
          ))}
        </div>
        <div className="filter-edge right">
          <button>{">"}</button>
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
            ID
            Agency
            Sub_Agency
            Jurisdiction
            Description
            Tags
            Website
            OMA_Flags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default ListPage
