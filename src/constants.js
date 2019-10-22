export const TOPICS = [
  `Criminal Justice`,
  `Development`,
  `Education`,
  `Elections`,
  `Environment`,
  `Finance`,
  `Health`,
  `Housing`,
  `Labor`,
  `Libraries`,
  `Parks`,
  `Politics`,
  `Transportation`,
  `Urban Animals`,
  `Utilities`,
]

export const REPORT_CARD_SECTIONS = [
  {
    title: `Online`,
    description: `Items being posted online`,
    items: [
      {
        title: `Has a website`,
        key: `website`,
        checked: true,
        detail: `Testing`,
      },
      {
        title: `Meeting schedule posted online`,
        key: `schedule`,
        checked: false,
        detail: `Testing`,
      },
      {
        title: `Agendas posted online`,
        key: `agenda`,
        checked: false,
        detail: `Testing`,
      },
      {
        title: `Minutes posted online`,
        key: `minutes`,
        checked: false,
        detail: `Testing`,
      },
    ],
  },
  {
    title: `Documents`,
    description: `Document quality`,
    items: [
      {
        title: `Agendas include required details`,
        key: `agenda-detail`,
        checked: false,
        detail: `Testing`,
      },
      {
        title: `Minutes include required details`,
        key: `minutes-detail`,
        checked: false,
        detail: `Testing`,
      },
      {
        title: `Meetings are recorded and/or livestreamed`,
        key: `recording`,
        checked: false,
        detail: `Testing`,
      },
    ],
  },
  {
    title: `Scheduling`,
    description: `When and where meetings are scheduled`,
    items: [
      {
        title: `Start on time?`,
        key: `on-time`,
        checked: false,
        detail: `Testing`,
      },
      {
        title: `Meetings are rarely cancelled`,
        key: `cancel`,
        checked: false,
        detail: `Testing`,
      },
      {
        // TODO: Add in mini SVG map of locations next to this
        title: `Location details (SMALL MAP TK)`,
        key: `location`,
        checked: false,
        detail: `Testing`,
      },
      {
        // TODO: Add some visualization of when meetings take place
        title: `Meeting times in the evening/weekends (MEETING TIMES DISPLAY TK)`,
        key: `times`,
        checked: false,
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
        checked: true,
        key: `pre-reg`,
        detail: `Testing`,
      },
      {
        title: `Commenters can discuss anything related to the agency and not just the meeting agenda`,
        checked: true,
        key: `comment-agenda`,
        detail: `Testing`,
      },
      {
        title: `Public comment occurs before most of the meeting discussions`,
        checked: true,
        key: `comment-after`,
        detail: `Testing`,
      },
      {
        title: `The overall time for public comment is not limited`,
        checked: true,
        key: `comment-limit`,
        detail: `Testing`,
      },
      {
        title: `Public comment in past X`,
        checked: false,
        key: `comment-past`,
        detail: `Testing`,
      },
    ],
  },
]
