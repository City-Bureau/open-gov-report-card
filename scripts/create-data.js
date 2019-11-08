const { createObjectCsvWriter } = require("csv-writer")
const fetch = require("cross-fetch")
const { Headers } = require("cross-fetch")

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
      [...res.records, ...records]
        .map(({ fields }) =>
          FIELDS.reduce(
            (acc, field) => ({ ...acc, [field]: fields[field] || null }),
            {}
          )
        )
        .reduce((acc, val) => acc.concat(val), [])
    )
  const writer = createObjectCsvWriter({
    path: `./data/agencies.csv`,
    header: FIELDS.map(f => ({ id: f, title: f })),
  })
  await writer.writeRecords(results)
})()
