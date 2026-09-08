import { asset } from './paths'

/**
 * Credentials, and the document behind each one.
 *
 * `file` is the honest field. Where it points at something in /public/docs the
 * site opens the document itself; where it is undefined the site says the
 * certificate is available on request rather than linking somewhere hopeful.
 *
 * The publication was described wrongly here until 8 September 2026. The site
 * called it "an AI and VR system for digitising the monasteries of Sikkim",
 * which implies he built one. Reading the actual paper, it is a survey: it
 * reviews more than 65 publications covering over 100 monasteries and proposes
 * a three-layer framework for the field. He is first author of five. Both the
 * paper and the publication certificate are now on disk, and the DOI resolves.
 */

export type Credential = {
  name: string
  issuer: string
  /** Path under /public/docs, only when the file is actually there. */
  file?: string
  note?: string
}

export const publication = {
  title: 'Digital Heritage Preservation Technologies for Monasteries of Sikkim',
  venue: 'Advancement in Image Processing and Pattern Recognition',
  publisher: 'HBRP Publication',
  volume: 'Volume 09, Issue 03, pages 1–14',
  issn: 'e-ISSN 2583-9241',
  doi: 'https://doi.org/10.5281/zenodo.19413268',
  year: '2026',
  date: '4 April 2026',
  type: 'Peer-reviewed survey',
  authorLine: 'Aditya S, Harshavardhan HR, E Jerrish Daniel, Chandana C E, Dr. Deepak N R',
  position: 'First author of five',
  note: 'A survey of the technologies being used to digitise Buddhist monasteries, and what actually works.',
  body: 'It reviews more than 65 publications across over 100 monasteries and sorts the field into three layers: immersive visualisation, intelligent interaction, and engagement. The honest half is the limitations, which are the same everywhere: bandwidth at remote sites, multilingual accuracy in AI cultural systems, and nobody having a funding model that survives past the pilot.',
  file: asset('/docs/publication-sikkim.pdf'),
  certificate: asset('/docs/publication-certificate.pdf'),
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

/** Wins and the things he ran. Outcomes, not courses, so they sit separately. */
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
    title: 'Smart India Hackathon 2025',
    detail: 'SIH25061. Led the system architecture and the technical documentation.',
  },
  {
    title: 'Event Organiser, IEEE Student Chapter',
    detail: '5+ technical events, 100+ attendees.',
  },
]

export const cv = asset('/docs/Aditya-Srinivas-CV.pdf')
