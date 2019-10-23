const path = require(`path`)
const slugify = require(`slugify`)

const SLUGOPTS = {
  lower: true,
  remove: /[^\-a-zA-Z0-9\s]/g,
}

const calculateScore = ({ id, omaFlags }) => Math.floor(Math.random() * 5)

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Airtable`) {
    const slug = slugify(node.data.ID, SLUGOPTS)
    createNodeField({
      node,
      name: `slug`,
      value: `${slug}`,
    })

    const score = calculateScore(node.data)
    createNodeField({
      node,
      name: `score`,
      value: score,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allAirtable(filter: { table: { eq: "Agencies" } }) {
        edges {
          node {
            data {
              id: ID
              agency: Agency
              subAgency: Sub_Agency
              jurisdiction: Jurisdiction
              description: Description
              tags: Tags
              website: Website
              omagFlags: OMA_Flags
            }
            fields {
              slug
              score
            }
          }
        }
      }
    }
  `)
  result.data.allAirtable.edges.forEach(({ node: { data, fields } }) => {
    createPage({
      path: fields.slug,
      component: path.resolve(`./src/templates/report-card-template.js`),
      context: { ...data, ...fields },
    })
  })
}

// Handle pym.js requiring the window/location to be defined
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /pym.js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
