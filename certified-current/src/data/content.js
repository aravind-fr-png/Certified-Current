export const reasonsNight = [
  'Night load spike detected — every AC, inverter and fridge compressor fighting for the same phase.',
  'Streetlights on this road appear to be freeloading off residential supply.',
  "Local tea stall's extension cord flagged as a contributing factor.",
  'Lineman chai break duration: longer than the standard 8-minute protocol.',
  'Everyone charging devices overnight to dodge peak tariff — transformer disagrees with this plan.',
]

export const reasonsDay = [
  "Optimal recovery window — unclear why it's still out, frankly.",
  'Routine maintenance suspected, no confirmation received from anyone.',
  'Transformer appears fine in photo. Someone may have just forgotten to flip the switch.',
  'Daytime load is low; this delay is administrative, not electrical.',
]

export const reasonsWildcard = [
  'Phase imbalance detected in sector transformer (based on wire droop angle).',
  'Meter board rust level: 34% — indicates general infrastructure fatigue.',
  'Bird nest proximity to transformer: moderate risk factor.',
  'Squirrel-transformer standoff ongoing, resolution unclear.',
  'Grid frequency fluctuation suspected somewhere in the general vicinity.',
  'Mercury retrograde grid interference (unverified, cosmically plausible).',
]

export const explanationsFreeNoPhoto = [
  'Basic algorithm suggests things will probably be fine eventually.',
  'Free-tier model is 60% science, 40% vibes.',
  'Standard optimism levels applied. Upgrade for extra-standard optimism.',
  'No photo, no problem — free AI is confident-ish regardless.',
]

export const explanationsFreeWithPhoto = [
  'Your transformer photo suggests moderate electrical optimism.',
  'Photo analysis (not really) nudged the needle upward.',
  'The AI glanced at your wiring and felt cautiously hopeful.',
  'Meter board detected. Free-tier confidence increased by a modest amount.',
]

export const explanationsProNoPhoto = [
  "AI-Pro doesn't need evidence to be this confident.",
  'Premium users receive access to advanced optimism algorithms.',
  'Your subscription has increased the probability of electricity returning by 300%.',
  'No photo required — Pro confidence operates independently of reality.',
]

export const explanationsProWithPhoto = [
  'AI-Pro has unlocked Ultra-Confidence Transformer Intelligence.',
  'Photo detected. Confidence levels now exceeding recommended safety limits.',
  'Our premium model looked at your meter board and became irrationally hopeful.',
  'Advanced Photo-Enhanced Optimism Engine™ engaged, results not liable.',
]

// Random "unscheduled model input required" questions shown mid-analysis.
export const questions = [
  {
    id: 'q_squirrel',
    text: 'Do you have siblings?',
    options: [
      { label: 'Yes', bonus: -2 },
      { label: 'No', bonus: 2 },
      { label: 'Do pets count!', bonus: 0 },
    ],
  },
  {
    id: 'q_inverter',
    text: 'Do you have siblings?',
    options: [
      { label: 'Yes', bonus: 1 },
      { label: 'No', bonus: -1 },
      { label: "It's thinking about it", bonus: 0 },
    ],
  },
  {
    id: 'q_neighbor',
    text: "What is your fathers name?",
    options: [
      { label: 'Its complicated', bonus: 3 },
      { label: 'No, just me ', bonus: -3 },
      { label: 'Have not checked', bonus: 0 },
    ],
  },
  {
    id: 'q_ac',
    text: 'How many squirrels are there?',
    options: [
      { label: '0', bonus: 3 },
      { label: '1-2', bonus: 0 },
      { label: '3 or more', bonus: -4 },
    ],
  },
  {
    id: 'q_mood',
    text: 'How are you feeling?',
    options: [
      { label: 'Calm', bonus: 2 },
      { label: 'Mildly annoyed', bonus: 0 },
      { label: 'Unhinged', bonus: -2 },
    ],
  },
]
