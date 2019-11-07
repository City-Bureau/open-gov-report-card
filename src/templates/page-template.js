import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const PageTemplate = ({
  data: {
    markdownRemark: {
      frontmatter: { title, path },
      html,
    },
  },
}) => (
  <Layout>
    <SEO title={title} pathname={path} />
    <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
  </Layout>
)

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`

export default PageTemplate
