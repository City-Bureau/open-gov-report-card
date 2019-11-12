import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import { FacebookIcon, TwitterIcon } from "./social-icons"
import "../styles/style.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div className="site">
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <footer>
          <div>
            <div className="footer-powered-by">
              Powered by{" "}
              <a
                href="https://www.citybureau.org/"
                target="_blank"
                rel="noopener"
              >
                City Bureau
              </a>
            </div>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/citybureau"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon style={{ width: 24, height: 24 }} />
              </a>
              <a
                href="https://twitter.com/city_bureau"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon style={{ width: 24, height: 24 }} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
