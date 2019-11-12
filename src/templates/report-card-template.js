import React, { useEffect } from "react"
import { Link } from "gatsby"
import * as pym from "pym.js"
import { getGrade } from "../grading"

import Layout from "../components/layout"
import SEO from "../components/seo"
import InfoFooter from "../components/info-footer"
import ReportCard from "../components/report-card"
import Chevron from "../components/chevron"

const ReportCardTemplate = ({
  pageContext: {
    name,
    tags,
    score,
    correct,
    questions,
    description,
    context,
    points,
    times,
    jurisdiction,
    website,
    publicCommentPolicy,
    agencyId,
    websiteFlags,
    omaFlags,
    publicCommentFlags,
    reportCardFlags,
    slug,
  },
}) => {
  useEffect(() => {
    const pymChild = new pym.Child({ polling: 500 })
    pymChild.sendHeight()
  }, [])

  return (
    <Layout>
      <SEO
        title={`${name} Gets a ${getGrade(score)} on Government Transparency`}
        overrideTitle
        pathname={slug}
      />
      <div className="breadcrumb">
        <Link to="/">
          <Chevron
            style={{
              transform: "rotate(180deg)",
              width: 24,
              height: 24,
            }}
          />
          <span>Back to List</span>
        </Link>
      </div>
      <ReportCard
        name={name}
        tags={tags}
        score={score}
        correct={correct}
        questions={questions}
        description={description}
        context={context}
        points={points}
        website={website}
        agencyId={agencyId}
        publicCommentPolicy={publicCommentPolicy}
        times={times}
        jurisdiction={jurisdiction}
        flags={[
          ...(websiteFlags || []),
          ...(omaFlags || []),
          ...(publicCommentFlags || []),
          ...(reportCardFlags || []),
        ]}
      />
      <InfoFooter />
    </Layout>
  )
}

export default ReportCardTemplate
