const REPORT_CARD_SECTIONS = [
  {
    title: `Information`,
    description: `The first step in participating in a public meeting is knowing when and where it is and getting context on what policy decisions it’s been making.`,
    items: [
      {
        title: `Has a website`,
        id: `website`,
        detail: `While the Illinois Open Meetings Act doesn’t require agencies to have a website, the city of Chicago and Cook County government both have official websites that agencies can use, so there’s little excuse not to have some information online.`,
      },
      {
        title: `Meeting schedule posted online`,
        id: `schedule`,
        detail: `Knowing when and where meetings are is a prerequisite for participation.`,
      },
      {
        title: `Agendas posted online`,
        id: `agenda`,
        detail: `Public meeting processes can be confusing, especially if you’re not sure what issues will be talked about. Agendas aren’t always comprehensive, but give an idea of what’s on deck.`,
      },
      {
        title: `Minutes posted online`,
        id: `minutes`,
        detail: `Even if a meeting is well-attended, an official record of what happened provides context on its past decisions. We’re only counting this category if there aren’t significant amounts of minutes missing from a site.`,
      },
      {
        title: `Minutes include required details`,
        id: `minutesDetail`,
        detail: `Meeting minutes are only useful if they include relevant information. Illinois’s Open Meetings Act requires that minutes include the time and place of a meeting, attendance and a summary of any votes taken or discussion. Many agencies leave out the discussion and only report a list of votes.`,
      },
      {
        title: `Meeting recordings or a live-stream posted online`,
        id: `recording`,
        detail: `Meeting minutes and text transcripts are useful, but can sometimes leave out important context for what goes on at a meeting. Audio or video recordings provide additional layers of communications and context for how a meeting was conducted.`,
      },
    ],
  },
  {
    title: `Public Comment`,
    description: `Public comment periods offer an avenue for people to support or reject policy decisions, share perspectives and provide information that might not otherwise be represented in a meeting.
`,
    items: [
      {
        title: `Public commenters can speak without having to pre-register`,
        id: `preReg`,
        detail: `The Illinois Attorney General [has said](https://www.documentcloud.org/documents/6194259-OMA-Determination-Letters-2018-10-2019-06.html#document/p45){target="_blank", rel="noopener noreferrer"} that requiring people to sign up for public comment even 15 minutes in advance can be an unnecessary barrier to participation.`,
      },
      {
        title: `Commenters can discuss anything related to the agency and not just the meeting agenda`,
        id: `commentAgenda`,
        detail: `It’s hard to advocate for an agency to add an issue to its agenda when you can only talk about the items already on it. The Illinois Attorney General [has said](https://www.documentcloud.org/documents/6194259-OMA-Determination-Letters-2018-10-2019-06.html#document/p317){target="_blank", rel="noopener noreferrer"} that agencies can only restrict public comment to issues under their jurisdiction.`,
      },
      {
        title: `Total time for public comment is not limited or at least one hour`,
        id: `commentLimit`,
        detail: `Agencies are allowed to limit how long each commenter can speak as well as the maximum length for public comment periods, but limits as low as 15 total minutes per period can unduly restrict access.`,
      },
    ],
  },
  {
    title: `Scheduling`,
    description: `Knowing the time and location of a meeting is one thing, but it doesn’t necessarily make getting there any easier. Reasonable variation of  meeting times and locations can reduce barriers to attendance.`,
    items: [
      {
        title: `Meetings are rarely cancelled`,
        id: `cancel`,
        detail: `While some cancellations are inevitable, a pattern of cancelled meetings can be discouraging. This category is looking at whether 20% or more of the meetings we looked at were cancelled.`,
      },
      {
        title: `Meetings from 8am-5pm as well as on the evenings and/or weekends`,
        id: `times`,
        detail: `The overwhelming majority of public meetings happen between 8am and 5pm on weekdays because it’s the most convenient time for politicians and government staff. While there’s [no perfect time to hold a meeting](https://tcf.org/content/commentary/better-community-meeting-possible/){target="_blank", rel="noopener noreferrer"}, holding meetings at different times can make attending more accessible to members of the public.`,
      },
    ],
  },
]

const REPORT_CARD_QUESTIONS = {
  website: {
    check: flags => !flags.includes("No website"),
  },
  schedule: {
    check: flags => !flags.includes("No information online"),
  },
  agenda: {
    check: flags =>
      !flags.includes("Agendas not posted") &&
      !flags.includes("No information online"),
  },
  minutes: {
    check: flags =>
      !flags.includes("Minutes not posted") &&
      !flags.includes("Minutes posted late") &&
      !flags.includes("No information online"),
  },
  minutesDetail: {
    check: flags =>
      flags.includes("Minutes have info") ||
      !flags.includes("Minutes missing info"),
    na: flags =>
      (flags.includes("Minutes not posted") ||
        flags.includes("No information online")) &&
      !(
        flags.includes("Minutes missing info") ||
        flags.includes("Minutes have info")
      ),
  },
  recording: {
    check: flags =>
      flags.includes("Meetings livestreamed") ||
      flags.includes("Meetings recorded"),
  },
  preReg: {
    check: flags => !flags.includes("Pre-registration for public comment"),
    na: flags => flags.includes("No public comment policy"),
  },
  commentAgenda: {
    check: flags => !flags.includes("Public comment related to agenda"),
    na: flags => flags.includes("No public comment policy"),
  },
  commentLimit: {
    check: flags => !flags.includes("Overall comment time less than 1 hour"),
    na: flags => flags.includes("No public comment policy"),
  },
  cancel: {
    check: flags => !flags.includes("Frequently cancelled"),
    na: flags =>
      flags.includes("No information online") &&
      !flags.includes("Frequently cancelled"),
  },
  times: {
    check: flags =>
      flags.includes("Meeting days/times spread through week/day"),
    na: flags =>
      flags.includes("No information online") &&
      !flags.includes("Meeting days/times spread through week/day"),
  },
}

const TOTAL_REPORT_CARD_QUESTIONS = [...Object.keys(REPORT_CARD_QUESTIONS)]
  .length

const gradeReportCard = flags => {
  const total = Object.values(REPORT_CARD_QUESTIONS).length
  const correct = Object.values(REPORT_CARD_QUESTIONS).filter(
    ({ check, na }) => check && check(flags) && !(na && na(flags))
  ).length
  const excluded = Object.values(REPORT_CARD_QUESTIONS).filter(
    ({ na }) => na && na(flags)
  ).length

  return {
    correct,
    questions: total - excluded,
    score: +(correct / (total - excluded)).toFixed(2),
  }
}

const gradeQuestion = (id, flags) => {
  const { check, na } = REPORT_CARD_QUESTIONS[id]
  if (na && na(flags)) return 0
  return check && check(flags) ? 1 : -1
}

const getGrade = score => {
  if (score >= 0.9) return "A"
  if (score >= 0.8) return "B"
  if (score >= 0.7) return "C"
  if (score >= 0.6) return "D"
  return "F"
}

module.exports = {
  REPORT_CARD_SECTIONS,
  REPORT_CARD_QUESTIONS,
  TOTAL_REPORT_CARD_QUESTIONS,
  gradeReportCard,
  gradeQuestion,
  getGrade,
}
