const { createObjectCsvWriter } = require("csv-writer")
const fetch = require("cross-fetch")
const { Headers } = require("cross-fetch")
const { getGrade, gradeReportCard } = require("../src/grading")

const FIELDS = [
  "Display Name",
  "Jurisdiction",
  "Classification",
  "Website",
  "Tags",
  "Website Flags",
  "OMA Flags",
  "Public Comment Flags",
  "Report Card Flags",
  "Public Comment Policy",
]

;(async function main() {
  const headers = new Headers()
  headers.set("Authorization", `Bearer ${process.env.AIRTABLE_KEY}`)
  const baseUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/Agencies?view=Report%20Card&pageSize=100`
  const { records, offset } = await fetch(baseUrl, {
    method: "GET",
    headers,
  }).then(r => r.json())

  const results = await fetch(`${baseUrl}&offset=${offset}`, {
    method: "GET",
    headers,
  })
    .then(r => r.json())
    .then(res =>
      [...records, ...res.records]
        .map(({ fields }) =>
          FIELDS.reduce(
            (acc, field) => ({ ...acc, [field]: fields[field] || null }),
            {}
          )
        )
        .reduce((acc, val) => acc.concat(val), [])
        .map(agency => {
          const flags = [
            ...(agency["OMA Flags"] || []),
            ...(agency["Website Flags"] || []),
            ...(agency["Public Comment Flags"] || []),
            ...(agency["Report Card Flags"] || []),
          ]
          const { correct, questions, score } = gradeReportCard(flags)
          const grade = getGrade(score)
          return {
            ...agency,
            score: (score * 100).toFixed(2),
            correct,
            graded: questions,
            grade,
          }
        })
    )
  const writer = createObjectCsvWriter({
    path: `./data/agencies.csv`,
    header: [
      ...FIELDS.map(f => ({ id: f, title: f })),
      { id: `score`, title: `score` },
      { id: `correct`, title: `correct` },
      { id: `graded`, title: `graded` },
      { id: `grade`, title: `grade` },
    ],
  })
  await writer.writeRecords(results)
})()
