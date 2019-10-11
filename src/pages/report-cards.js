import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ReportCardsPage = ({ data }) => (
  <Layout>
    <SEO title="Report Cards" />
    <h1>Report Cards</h1>
    {data.allAirtable.edges.map(({ node }, index) => (
      <p key={index}>
        <Link to={node.fields.slug}>{node.data.ID}</Link>
      </p>
    ))}
  </Layout>
)

export default ReportCardsPage

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
