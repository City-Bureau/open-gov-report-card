const path = require(`path`)
const slugify = require(`slugify`)
const { gradeReportCard, getGrade } = require(`./src/grading`)

const SLUGOPTS = {
  lower: true,
  remove: /[^\-a-zA-Z0-9\s]/g,
}

const calculateScore = ({ OMA_Flags, Website_Flags, Report_Card_Flags }) =>
  gradeReportCard([
    ...(OMA_Flags || []),
    ...(Website_Flags || []),
    ...(Report_Card_Flags || []),
  ])

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
              reportCardFlags: Report_Card_Flags
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
