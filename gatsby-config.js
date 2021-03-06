require("dotenv").config()

module.exports = {
  pathPrefix: `/open-gov-report-card`,
  siteMetadata: {
    title: `Open Gov Report Card`,
    description: `How open is your government? 148 Chicago and Cook County agencies, ranked by transparency of public meetings`,
    author: `City Bureau`,
    twitterAuthor: `@city_bureau`,
    siteDomain: `https://projects.citybureau.org`,
    siteUrl: `https://projects.citybureau.org/open-gov-report-card`,
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
        name: `Open Gov Report Card`,
        short_name: `Open Gov Report Card`,
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
