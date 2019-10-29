import React, { useEffect } from "react"
import { Link } from "gatsby"
import * as pym from "pym.js"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ReportCard from "../components/report-card"
import Chevron from "../components/chevron"

const ReportCardTemplate = ({
  pageContext: {
    name,
    tags,
    score,
    description,
    points,
    times,
    websiteFlags,
    omaFlags,
    publicCommentFlags,
    reportCardFlags,
  },
}) => {
  useEffect(() => {
    const pymChild = new pym.Child()
    pymChild.sendHeight()
  })

  return (
    <Layout>
      <SEO title={name} />
      <div className="breadcrumb">
        <Link to="/list/">
          <Chevron
            style={{ transform: "rotate(180deg)", width: 18, height: 18 }}
          />
          {" Back to list"}
        </Link>
      </div>
      <ReportCard
        name={name}
        tags={tags}
        score={score}
        description={description}
        points={points}
        times={times}
        flags={[
          ...(websiteFlags || []),
          ...(omaFlags || []),
          ...(publicCommentFlags || []),
          ...(reportCardFlags || []),
        ]}
      />
    </Layout>
  )
}

export default ReportCardTemplate
