require("dotenv").config()

// TODO: Canonical URLs
module.exports = {
  pathPrefix: `/report-cards-stg`,
  siteMetadata: {
    title: `Chi Gov Report Card`,
    description: `Report card for open meetings in Chicago`,
    author: `@city_bureau`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `open-meetings-report-card`,
        short_name: `omareportcard`,
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
