const path = require(`path`)
const slugify = require(`slugify`)

const SLUGOPTS = {
  lower: true,
  remove: /[^\-a-zA-Z0-9\s]/g,
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Airtable`) {
    const slug = slugify(node.data.ID, SLUGOPTS)
    createNodeField({
      node,
      name: `slug`,
      value: `${slug}`,
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
              ID
              Agency
              Sub_Agency
              Jurisdiction
              Description
              Tags
              Website
              OMA_Flags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allAirtable.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/report-card-template.js`),
      context: Object.assign(node.data, {
        slug: node.fields.slug,
      }),
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
