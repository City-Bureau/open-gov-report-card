const REPORT_CARD_SECTIONS = [
  {
    title: `Information`,
    description: `The first step toward participating in a public meeting is knowing when and where it is, and getting context on the decisions it’s been making.`,
    items: [
      {
        title: `Has a website`,
        id: `website`,
        detail: `While the Illinois Open Meetings Act doesn’t require agencies to have their own websites, they are required to post information online and a website makes it easier for people to access.`,
      },
      {
        title: `Meeting schedule posted online`,
        id: `schedule`,
        detail: `Information must be posted at least 48 hours before the meeting, according to the Illinois Open Meetings Act.`,
      },
      {
        title: `Agendas posted online`,
        id: `agenda`,
        detail: `If an agency has a website maintained by its own full-time staff, Illinois’s Open Meetings Act requires that it posts agendas 48 hours in advance of any meetings. Agendas aren’t always comprehensive but can help people understand the meeting processes and what issues will be discussed.`,
      },
      {
        title: `Minutes posted online`,
        id: `minutes`,
        detail: `Minutes, or notes, are an official record of each meeting. If an agency has a website maintained by its own full-time staff, Illinois’s Open Meetings Act requires that it posts minutes online within 10 days of being approved.  A passing grade indicates the majority of past meetings have minutes posted.`,
      },
      {
        title: `Minutes include required details`,
        id: `minutesDetail`,
        detail: `Illinois’s Open Meetings Act requires that minutes include the time and place of a meeting, attendance and a summary of any votes taken or discussion. Many agencies leave out the discussion and only report a list of votes.`,
      },
      {
        title: `Meeting recordings or livestream posted online`,
        id: `recording`,
        detail: `Though not legally required, audio or video recordings provide additional layers of communication and context for how a meeting was conducted.`,
      },
    ],
  },
  {
    title: `Public Comment`,
    description: `The Illinois Attorney General [has said](http://foia.ilattorneygeneral.net/pdf/opinions/2019/19-002.pdf){target="_blank", rel="noopener noreferrer"} that all public bodies subject to the Open Meetings Act must provide an opportunity for members of the public to address public officials at open meetings. Public comment periods offer an avenue for people to support or oppose policy decisions and provide information that might not otherwise be represented in a meeting.`,
    items: [
      {
        title: `Public commenters don’t need to register in advance`,
        id: `preReg`,
        detail: `The Illinois Attorney General [has said](https://www.documentcloud.org/documents/6194259-OMA-Determination-Letters-2018-10-2019-06.html#document/p45){target="_blank", rel="noopener noreferrer"} people should not be required to sign up for public comment before the meeting begins, as it’s an unnecessary barrier to participation.`,
      },
      {
        title: `Commenters can discuss anything related to the agency and not just the meeting agenda`,
        id: `commentAgenda`,
        detail: `The Illinois Attorney General [has said](https://www.documentcloud.org/documents/6194259-OMA-Determination-Letters-2018-10-2019-06.html#document/p317){target="_blank", rel="noopener noreferrer"} that agencies can only restrict public comment to issues under their jurisdiction, not to specific agenda items. Otherwise it would be impossible for attendees to bring up novel agenda items that apply to the agency.`,
      },
      {
        title: `Total time for public comment period is unlimited or at least one hour`,
        id: `commentLimit`,
        detail: `Agencies are allowed to limit how long each commenter can speak and the maximum length for public comment periods. City Bureau set the bar at one hour as a reasonable time for attendees to participate.`,
      },
    ],
  },
  {
    title: `Scheduling`,
    description: `Knowing the time and location of a meeting is one thing, but it doesn’t necessarily make getting there any easier. Varying meeting times and locations can reduce barriers for attendees.`,
    items: [
      {
        title: `Meetings are rarely cancelled`,
        id: `cancel`,
        detail: `While some cancellations are inevitable, this category flags agencies where 20% or more of the meetings were canceled.`,
      },
      {
        title: `Meeting times vary to accommodate differing schedules`,
        id: `times`,
        detail: `The overwhelming majority of public meetings happen between 8 a.m. and 5 p.m. on weekdays. While there’s [no perfect time to hold a meeting](https://tcf.org/content/commentary/better-community-meeting-possible/){target="_blank", rel="noopener noreferrer"}, varying the times can make meetings more accessible to members of the public.`,
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
