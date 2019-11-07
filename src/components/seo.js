import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

// TODO: Update this based on report cards
function SEO({ description, lang, meta, pathname, title }) {
  const { site, ogImage, twitterImage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            twitterAuthor
            siteUrl
          }
        }
        ogImage: file(relativePath: { eq: "cb-icon.png" }) {
          childImageSharp {
            fixed(width: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        twitterImage: file(relativePath: { eq: "cb-icon.png" }) {
          childImageSharp {
            fixed(width: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `author`,
          content: site.siteMetadata.author,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:url`,
          content: `${site.siteMetadata.siteUrl}${pathname}`,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        // {
        //   property: `og:image`,
        //   content: `${site.siteMetadata.siteUrl}${ogImage.childImageSharp.fixed.src}`,
        // },
        // {
        //   property: `og:image:width`,
        //   content: 2400,
        // },
        // {
        //   property: `og:image:width`,
        //   content: 1260,
        // },
        // {
        //   property: `og:image:alt`,
        //   content: ``,
        // },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.twitterAuthor,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        // {
        //   name: `twitter:image:src`,
        //   content: `${site.siteMetadata.siteUrl}${twitterImage.childImageSharp.fixed.src}`,
        // },
        // {
        //   property: `twitter:image:alt`,
        //   content: ``,
        // },
      ].concat(meta)}
    >
      <link rel="stylesheet" href="https://use.typekit.net/pbz7tnn.css" />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  pathname: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string,
}

export default SEO
