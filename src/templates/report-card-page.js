import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ReportCardPage = ({ pageContext }) => (
  <Layout>
    <SEO title={pageContext.ID} />
    <h1>{pageContext.ID}</h1>
  </Layout>
)

export default ReportCardPage
