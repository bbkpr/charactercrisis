export type Weight = number;
export type Stat = string;
export interface Question {
  questionText: string;
  answers: Array<{
    text: string;
    weightEffects: Record<Stat, Weight>;
  }>;
}
export const questions: Question[] = [
  {
    questionText: '1. What range do you prefer to fight at?',
    answers: [
      {
        text: 'I like it up close and personal.',
        weightEffects: {
          Rushdown: 10,
          Zoning: -10,
          Damage: 5,
          Mobility: 5
        }
      },
      {
        text: "I'll stand back a bit and rush in when I need to.",
        weightEffects: {
          Rushdown: 5,
          Zoning: -5,
          Footsies: 5,
          Mobility: 10,
          Mixups: 5
        }
      },
      {
        text: 'I like to keep a fair distance away and poke at them.',
        weightEffects: {
          Rushdown: -5,
          Zoning: 5,
          Damage: 0,
          Footsies: 5,
          Mobility: -5,
          Okizeme: 5
        }
      },
      {
        text: 'Get them away from me at all costs!',
        weightEffects: {
          Rushdown: -10,
          Zoning: 10,
          Footsies: 5,
          Mixups: -10
        }
      }
    ]
  },
  {
    questionText: "2. When in a match, what's your primary focus or favorite thing to do?",
    answers: [
      {
        text: 'Keeping the pressure on my opponent.',
        weightEffects: {
          Rushdown: 10,
          Zoning: -5,
          Damage: 5,
          Footsies: 5,
          Meter: 5,
          Defense: -5,
          Mobility: 5,
          Mixups: 10,
          Okizeme: 5
        }
      },
      {
        text: 'Outmaneuvering my opponent.',
        weightEffects: {
          Footsies: 10,
          Mobility: 10
        }
      },
      {
        text: 'Playing mind games, conditioning, and confusing my opponent.',
        weightEffects: {
          'Ease Of Use': -5,
          Mixups: 5
        }
      },
      {
        text: 'Executing optimal/flashy combos.',
        weightEffects: {
          Damage: 10,
          Meter: 5,
          'Ease Of Use': -10
        }
      },
      {
        text: "None of the above/I haven't played any fighting games yet.",
        weightEffects: {}
      }
    ]
  },
  {
    questionText: "3. What's the most important or enjoyable quality in a character for you?",
    answers: [
      {
        text: 'Damage. Everything else is secondary.',
        weightEffects: {
          Damage: 15,
          Meter: 5,
          Defense: -10,
          Mobility: -10,
          'Ease Of Use': -10
        }
      },
      {
        text: 'Health points. I want to last long in combat.',
        weightEffects: {
          Damage: -10,
          Defense: 15,
          Mobility: -5,
          'Ease Of Use': 5,
          Mixups: -5
        }
      },
      {
        text: 'Mobility. I like going fast or enjoy unconventional movement options.',
        weightEffects: {
          Rushdown: 10,
          Zoning: -5,
          Damage: -5,
          Footsies: 10,
          Meter: 0,
          Defense: -5,
          Mobility: 15,
          'Ease Of Use': -5,
          Mixups: 10
        }
      },
      {
        text: 'Utility. Give me a lot of tricks, tools and options to play with.',
        weightEffects: {
          'Ease Of Use': -10
        }
      },
      {
        text: 'Jack of all trades. I want an all-rounder with balanced traits and abilities.',
        weightEffects: {
          'Ease Of Use': 5
        }
      }
    ]
  },
  {
    questionText: '4. Does the idea of stances or multiple movesets in the same character sound appealing?',
    answers: [
      {
        text: 'I like the idea, it would give me more options to play with.',
        weightEffects: {
          Rushdown: 5,
          Zoning: 5,
          Damage: 5,
          Footsies: 0,
          Meter: 0,
          Defense: 0,
          Mobility: 5,
          'Ease Of Use': -10,
          Mixups: 10,
          Okizeme: 5
        }
      },
      {
        text: 'I would prefer to just play a character with one moveset.',
        weightEffects: {}
      },
      {
        text: 'No preference.',
        weightEffects: {}
      }
    ]
  },
  {
    questionText: '5. Would you like a projectile?',
    answers: [
      {
        text: 'I want at least a standard full screen horizontal moving one.',
        weightEffects: {
          Rushdown: -5,
          Zoning: 10,
          Footsies: 5,
          Okizeme: 5
        }
      },
      {
        text: "As long as it controls good space it doesn't have to be full screen or horizontal moving.",
        weightEffects: {
          Zoning: 5,
          Okizeme: 0
        }
      },
      {
        text: 'I want a tricky, meter-only, controllable, or some kind of unique projectile people have trouble dealing with.',
        weightEffects: {
          Rushdown: -5,
          Zoning: 10,
          Meter: 5,
          'Ease Of Use': -5,
          Mixups: 10,
          Okizeme: 5
        }
      },
      {
        text: 'I do not need projectiles to win.',
        weightEffects: {
          Rushdown: 10,
          Zoning: -10
        }
      },
      {
        text: 'No preference.',
        weightEffects: {}
      }
    ]
  },
  {
    questionText: "6. What's your current skill level in fighting games?",
    answers: [
      {
        text: 'I am new to fighting games.',
        weightEffects: {
          'Ease Of Use': 15
        }
      },
      {
        text: 'I have played some fighting games, or have played Guilty Gear for a while.',
        weightEffects: {
          'Ease Of Use': 5
        }
      },
      {
        text: 'I am passionate about fighting games, either on a casual or competitive level.',
        weightEffects: {
          'Ease Of Use': -5
        }
      },
      {
        text: "Don't factor my skill in. I'll play who I want.",
        weightEffects: {}
      }
    ]
  }
];
