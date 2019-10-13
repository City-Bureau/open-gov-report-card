import React, { Component } from "react"
import { graphql } from "gatsby"
import * as pym from "pym.js"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ReportCardThumb from "../components/report-card-thumb"

export default class ReportCardsPage extends Component {
  state = {
    data: [],
    results: [],
  }

  componentDidMount() {
    const { data } = this.props

    // Placeholder
    const pymChild = new pym.Child()
    pymChild.sendHeight()

    this.setState({
      data,
      results: data,
    })
  }

  render() {
    const { data } = this.props

    return (
      <Layout>
        <SEO title="Report Cards" />
        <h1>Report Cards</h1>
        <div class="filter-controls-container">
          <div>Search</div>
          <div>Topics</div>
          <div>Sort By</div>
        </div>
        <div className="filter-container">
          <div className="filter-edge left">
            <button>{"<"}</button>
          </div>
          <div className="filter-scroll">
            {data.allAirtable.edges.map(({ node }) => (
              <ReportCardThumb
                key={node.slug}
                {...{ ...node.data, ...node.fields }}
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
