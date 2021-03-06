import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Header = ({ siteTitle }) => {
  const imageData = useStaticQuery(graphql`
    query {
      file: file(relativePath: { eq: "cb-icon.png" }) {
        childImageSharp {
          fixed(width: 54) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <header>
      <div className="header-container">
        <div>
          <h1>
            <Link to="/">
              <Img fixed={imageData.file.childImageSharp.fixed} />
              <div className="heading">{siteTitle}</div>
            </Link>
          </h1>
        </div>
        <Link to="/about">About</Link>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
