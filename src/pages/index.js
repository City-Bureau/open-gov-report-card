import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>About</h1>
    <p>Lorem ipsum</p>
    <Link to="/list/">Report Cards</Link>
  </Layout>
)

export default IndexPage
