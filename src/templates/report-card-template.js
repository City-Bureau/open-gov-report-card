import React, { useEffect } from "react"
import * as pym from "pym.js"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ReportCard from "../components/report-card"

const ReportCardTemplate = ({ pageContext }) => {
  // Placeholder
  useEffect(() => {
    const pymChild = new pym.Child()
    pymChild.sendHeight()
  }, [])

  return (
    <Layout>
      <SEO title={pageContext.ID} />
      <ReportCard {...pageContext} />
    </Layout>
  )
}

export default ReportCardTemplate
