const path = require(`path`)
const slugify = require(`slugify`)

const SLUGOPTS = {
  lower: true,
  remove: /[^\-a-zA-Z0-9\s]/g,
}

// const calculateScore = ({ id, omaFlags }) => Math.floor(Math.random() * 5)
const calculateScore = ({ OMA_Flags, Website_Flags }) => {
  const oma = OMA_Flags || []
  const web = Website_Flags || []
  let score = 0
  let denom = 0

  if (!web.includes("No direct website")) {
    score += 1
  }
  denom += 1
  if (!oma.includes("No information online")) {
    score += 1
  }
  denom += 1
  if (
    !oma.includes("Agendas not posted") &&
    !oma.includes("No information online")
  ) {
    score += 1
  }
  denom += 1
  if (
    !oma.includes("Minutes not posted") &&
    !oma.includes("No information online")
  ) {
    score += 1
  }
  denom += 1
  if (!oma.includes("Pre-registration for public comment")) {
    score += 1
  }
  denom += 1
  if (!oma.includes("Public comment related to agenda")) {
    score += 1
  }
  denom += 1
  if (!oma.includes("Limit overall public comment time")) {
    score += 1
  }
  denom += 1
  return Math.round((score / denom) * 4)
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Airtable`) {
    const slug = slugify(node.data.Display_Name, SLUGOPTS)
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
              name: Display_Name
              agency: Agency
              subAgency: Sub_Agency
              jurisdiction: Jurisdiction
              description: Description
              tags: Tags
              website: Website
              websiteFlags: Website_Flags
              omaFlags: OMA_Flags
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
