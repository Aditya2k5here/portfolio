import type { Part } from './types'

export const sm02: Part = {
  id: 'SM-02',
  slug: 'smart-mirror',
  name: 'Smart Mirror',
  order: 2,
  status: 'local',
  // Not public yet: local repo has no remote configured. Do not print a link that 404s.
  evidence: ['none'],
  thesis: 'Smooth systems are not systems doing more work.',
  problem:
    'A real-time mirror surface fusing vision, voice, memory and four external integrations, on one laptop, without the camera loop ever stuttering.',
  result:
    'Six concurrent subsystems behind a shared event bus and a central state manager, with health checks and a cache layer, so a failed external service degrades one feature instead of stalling the mirror.',
  stack: ['Python', 'asyncio', 'WebSockets', 'SQLite', 'OpenCV'],
  indexFact: '6 concurrent subsystems, sampled at different rates',

  decisions: [
    { choice: 'Face detection every frame', because: 'cheap' },
    { choice: 'Recognition sampled at ~2 s', because: 'expensive, rarely changes' },
    { choice: 'Emotion sampled at ~6 s', because: 'expensive, changes slowly' },
    { choice: 'Posture isolated', because: 'off the main loop entirely' },
    { choice: 'WebSocket broadcast capped at 4/s', because: 'the eyes cannot use more' },
    { choice: 'TTS queued', because: 'speech must not overlap' },
    {
      choice: 'Integrations on background threads',
      because: 'a slow API degrades one panel, not the mirror',
    },
    {
      choice: 'AI router: Groq first, Gemini as fallback',
      because:
        'low latency on the common path without paying for two model calls per sentence, while keeping provider redundancy',
    },
  ],

  notBuilt: [
    {
      rejected: 'Recognition on every frame',
      because: 'expensive, and it rarely changes — sampled at ~2 s instead',
    },
    {
      rejected: 'Emotion on every frame',
      because: 'expensive, and it changes slowly — sampled at ~6 s instead',
    },
    { rejected: 'Posture on the main loop', because: 'isolated off it entirely' },
    {
      rejected: 'Uncapped WebSocket broadcast',
      because: 'capped at 4/s; the eyes cannot use more than that',
    },
    {
      rejected: 'Two model calls per sentence',
      because: 'Groq first for latency, Gemini only as fallback',
    },
    {
      rejected: 'Integrations on the main loop',
      because: 'a slow external API would stall the camera instead of one panel',
    },
  ],

  measurements: [
    { label: 'Lines of Python', value: null, absent: 'RE-MEASURING', note: 'scope under review' },
    { label: 'Concurrent subsystems', value: '6' },
    { label: 'Broadcast cap', value: '4 / s' },
    { label: 'Sustained FPS', value: null },
    { label: 'p95 frame-to-broadcast latency', value: null },
  ],

  limitations: [
    'Single machine, single user.',
    'Needs a webcam, so it cannot be deployed; a recorded demo is the only possible live evidence.',
    'No benchmark harness yet.',
    'No tests on the concurrent paths.',
  ],

  links: [],
  plates: [],
}
