import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello world</h1>
    <Link to="/report-cards/">Report Cards</Link>
  </Layout>
)

export default IndexPage
