import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, pathname, title, overrideTitle }) {
  const { site, socialImage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            twitterAuthor
            siteUrl
            siteDomain
          }
        }
        socialImage: file(relativePath: { eq: "teaser.jpg" }) {
          childImageSharp {
            fixed(width: 1023) {
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
      titleTemplate={overrideTitle ? `%s` : `%s | ${site.siteMetadata.title}`}
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
        {
          property: `og:image`,
          content: `${site.siteMetadata.siteDomain}${socialImage.childImageSharp.fixed.src}`,
        },
        {
          property: `og:image:width`,
          content: socialImage.childImageSharp.fixed.width,
        },
        {
          property: `og:image:height`,
          content: socialImage.childImageSharp.fixed.height,
        },
        {
          property: `og:image:alt`,
          content: `Open Gov Report Card logo`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
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
        {
          name: `twitter:image:src`,
          content: `${site.siteMetadata.siteDomain}${socialImage.childImageSharp.fixed.src}`,
        },
        {
          property: `twitter:image:alt`,
          content: `Open Gov Report Card logo`,
        },
      ].concat(meta)}
    >
      <link rel="canonical" href={`${site.siteMetadata.siteUrl}${pathname}`} />
      <link rel="stylesheet" href="https://use.typekit.net/pbz7tnn.css" />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  pathname: ``,
  overrideTitle: false,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  overrideTitle: PropTypes.bool,
}

export default SEO
