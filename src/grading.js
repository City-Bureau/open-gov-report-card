const REPORT_CARD_SECTIONS = [
  // TODO: OMA?
  // TODO: Need a flag for irregularly posting minutes or missing minutes like Midway
  {
    title: `Online`,
    description: `Items being posted online`,
    items: [
      {
        title: `Has a website`,
        id: `website`,
        detail: `Testing`,
      },
      {
        title: `Meeting schedule posted online`,
        id: `schedule`,
        detail: `Testing`,
      },
      {
        title: `Agendas posted online`,
        id: `agenda`,
        detail: `Testing`,
      },
      {
        title: `Minutes posted online`,
        id: `minutes`,
        detail: `Testing`,
      },
    ],
  },
  {
    title: `Documentation`,
    description: `Document quality`,
    items: [
      {
        title: `Minutes include required details`,
        id: `minutesDetail`,
        detail: `Testing`,
      },
      {
        title: `Meetings are recorded and/or livestreamed`,
        id: `recording`,
        detail: `Testing`,
      },
    ],
  },
  {
    title: `Scheduling`,
    description: `When and where meetings are scheduled`,
    items: [
      {
        title: `Meetings are rarely cancelled`,
        id: `cancel`,
        detail: `Testing`,
      },
      {
        title: `Regular meeting times in the evening/weekends`,
        id: `times`,
        detail: `Testing`,
      },
    ],
  },
  {
    title: `Public Comment`,
    description: `How easy or hard it is for members of the public to speak`,
    items: [
      {
        title: `Public commenters can speak without having to pre-register`,
        id: `preReg`,
        detail: `Testing`,
      },
      {
        title: `Commenters can discuss anything related to the agency and not just the meeting agenda`,
        id: `commentAgenda`,
        detail: `Testing`,
      },
      {
        title: `The overall time for public comment is not limited`,
        id: `commentLimit`,
        detail: `Testing`,
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
  // TODO: should transcript count?
  // TODO: Meetings recordings or a livestream are available
  recording: {
    check: flags =>
      flags.includes("Meetings livestreamed") ||
      flags.includes("Meetings recorded"),
  },
  cancel: {
    check: flags => !flags.includes("Frequently cancelled"),
    na: flags =>
      flags.includes("No information online") &&
      !flags.includes("Frequently cancelled"),
  },
  times: {
    check: flags => flags.includes("Meeting times in evenings/weekends"),
    na: flags =>
      flags.includes("No information online") &&
      !flags.includes("Meeting times in the evenings/weekends"),
  },
  preReg: {
    check: flags => !flags.includes("Pre-registration for public comment"),
    na: flags => flags.includes("No public comment policy"),
  },
  commentAgenda: {
    check: flags => !flags.includes("Public comment related to the agenda"),
    na: flags => flags.includes("No public comment policy"),
  },
  commentLimit: {
    check: flags => !flags.includes("Limit overall public comment time"),
    na: flags => flags.includes("No public comment policy"),
  },
}

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
  gradeReportCard,
  gradeQuestion,
  getGrade,
}
