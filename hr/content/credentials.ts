/**
 * Credentials, and where the document for each one actually is.
 *
 * `file` is the honest field. When it points at something in /public/docs the
 * site renders a link to the document itself; when it is undefined the site
 * says the certificate is available on request. Nothing here ever links to a
 * URL that was guessed.
 *
 * Checked on 8 September 2026 against D:\Aditya Documents and D:\Resumes:
 *   found      the CV, and an IEEE membership record under 02_Memberships
 *   not found  the four course certificates, and the published chapter
 *
 * So four of these are unlinked on purpose. See public/docs/README.md for what
 * to drop in and what it switches on.
 */

export type Credential = {
  name: string
  issuer: string
  /** Path under /public/docs, only when the file is actually there. */
  file?: string
  /** What it covered. Only where that is knowable from the programme itself. */
  note?: string
}

export const publication = {
  title: 'Digital Heritage Preservation Technologies for Monasteries of Sikkim',
  venue: 'Advancement in Image Processing and Pattern Recognition',
  year: '2026',
  type: 'Peer-reviewed chapter',
  subject: 'Image processing and pattern recognition',
  note: 'An AI and VR system for digitising the monasteries of Sikkim and presenting them as virtual tourism.',
  body: 'The murals and thangkas inside them are degrading faster than anyone is recording them, in a state where getting a conservation team up the hill is a logistics problem before it is a technical one.',
  /* No PDF of the chapter is on this machine, so the card does not pretend to
     link to one. Drop publication-sikkim.pdf into /public/docs to switch it on. */
  file: undefined as string | undefined,
}

export const certifications: Credential[] = [
  {
    name: 'Machine Learning and Deep Learning Specialization',
    issuer: 'Stanford Online / DeepLearning.AI',
  },
  {
    name: 'Software Engineering, Cloud Computing and Cyber Security',
    issuer: 'Infosys Springboard',
  },
  { name: 'Full Stack Development', issuer: 'SimpliLearn' },
  { name: 'Java', issuer: 'IIT Bombay' },
]

/** Competitive and organisational. Held separately: these are outcomes, not courses. */
export const achievements = [
  {
    title: '1st Place, Cicada Agentic AI Hackathon',
    detail: 'Designed, built and deployed a working agentic system inside the event window.',
  },
  {
    title: 'Winner, Machine Learning Expo and Generative AI Expo',
    detail: '',
  },
  {
    title: 'Smart India Hackathon 2025, National round',
    detail:
      'SIH25061. Led the system architecture and the technical documentation for a government-issued problem statement.',
  },
  {
    title: 'Event Organiser, IEEE Student Chapter',
    detail: '5+ technical events, 100+ attendees. Membership on record.',
  },
]

export const cv = '/docs/Aditya-Srinivas-CV.pdf'
