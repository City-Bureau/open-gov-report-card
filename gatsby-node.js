const path = require(`path`)
const slugify = require(`slugify`)
const { gradeReportCard } = require(`./src/grading`)

const SLUGOPTS = {
  lower: true,
  remove: /[^\-a-zA-Z0-9\s]/g,
}

const calculateScore = ({
  OMA_Flags,
  Website_Flags,
  Public_Comment_Flags,
  Report_Card_Flags,
}) =>
  gradeReportCard([
    ...(OMA_Flags || []),
    ...(Website_Flags || []),
    ...(Public_Comment_Flags || []),
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

    const { correct, questions, score } = calculateScore(node.data)
    createNodeField({
      node,
      name: `correct`,
      value: correct,
    })
    createNodeField({
      node,
      name: `questions`,
      value: questions,
    })
    createNodeField({
      node,
      name: `score`,
      value: score,
    })
  }
}
// TODO: Process markdown https://stackoverflow.com/questions/55998067/convert-markdown-to-html-from-within-a-rich-text-component-with-gatsby
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
              agencyId: Agency_ID
              subAgency: Sub_Agency
              jurisdiction: Jurisdiction
              description: Description
              context: Report_Card_Context
              tags: Tags
              website: Website
              publicCommentPolicy: Public_Comment_Policy
              websiteFlags: Website_Flags
              omaFlags: OMA_Flags
              publicCommentFlags: Public_Comment_Flags
              reportCardFlags: Report_Card_Flags
            }
            fields {
              slug
              correct
              questions
              score
            }
          }
        }
      }
      allMeetingsCsv {
        edges {
          node {
            id
            agency
            start_day
            start_time
            lon
            lat
          }
        }
      }
    }
  `)

  result.data.allAirtable.edges.forEach(({ node: { data, fields } }) => {
    const meetings = result.data.allMeetingsCsv.edges.filter(
      ({ node: { agency } }) => data.name === agency
    )
    const times = [
      ...new Set(
        meetings.map(
          ({ node: { start_day, start_time } }) => `${start_day} ${start_time}`
        )
      ),
    ]
      .map(t => t.split(" "))
      .map(([start_day, start_time]) => [
        start_day,
        start_time,
        meetings.filter(
          ({ node }) =>
            start_day === node.start_day && start_time === node.start_time
        ).length,
      ])
    const points = Object.keys(
      meetings.reduce(
        (obj, { node: { lon, lat } }) =>
          lon && lat
            ? {
                ...obj,
                [`${lon},${lat}`]: true,
              }
            : obj,
        {}
      )
    ).map(coords => coords.split(",").map(c => +c))
    // TODO: Process markdown in constant descriptions, include as context for page
    createPage({
      path: fields.slug,
      component: path.resolve(`./src/templates/report-card-template.js`),
      context: {
        ...data,
        ...fields,
        points,
        times,
        meetingLen: meetings.length,
      },
    })
  })

  const pageTemplate = path.resolve(`src/templates/page-template.js`)
  const {
    data: {
      allMarkdownRemark: { edges },
    },
  } = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `)
  edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: pageTemplate,
      context: {},
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
