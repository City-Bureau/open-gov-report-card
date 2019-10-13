require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Open Meetings Report Card`,
    description: `Report card for open meetings in Chicagoland`,
    author: `@city_bureau`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
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
