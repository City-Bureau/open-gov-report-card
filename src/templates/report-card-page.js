import React from "react"
import * as pym from "pym.js"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ReportCard from "../components/report-card"

const ReportCardPage = ({ pageContext }) => {
  // Placeholder
  const pymChild = new pym.Child()
  pymChild.sendHeight()

  return (
    <Layout>
      <SEO title={pageContext.ID} />
      <ReportCard ID={pageContext.ID} Tags={pageContext.Tags} />
    </Layout>
  )
}

export default ReportCardPage
