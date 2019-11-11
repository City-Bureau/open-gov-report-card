require("dotenv").config()

module.exports = {
  pathPrefix: `/report-cards-stg`,
  siteMetadata: {
    title: `Chi Gov Report Card`,
    description: `Chicago and Cook County government agencies, ranked by commitment to transparency`,
    author: `City Bureau`,
    twitterAuthor: `@city_bureau`,
    siteUrl: `https://projects.citybureau.org/report-cards-stg`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/markdown`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`UA-68381272-6`],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chi Gov Report Card`,
        short_name: `Chi Gov Report Card`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/cb-icon.png`,
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: `Agencies`,
            tableView: `Report Card`,
            queryName: `reportCard`,
          },
        ],
      },
    },
  ],
}
