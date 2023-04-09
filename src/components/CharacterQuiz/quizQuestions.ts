export type Weight = number;
export type Stat =
  | 'Rushdown'
  | 'Zoning'
  | 'Damage'
  | 'Footsies'
  | 'Meter'
  | 'Defense'
  | 'Mobility'
  | 'Ease Of Use'
  | 'Mixups'
  | 'Okizeme';
export interface Question {
  questionText: string;
  answers: Array<{
    text: string;
    weightEffects: Partial<Record<Stat, Weight>>;
  }>;
}
export const questions: Question[] = [
  {
    questionText: 'What range do you prefer to fight at?',
    answers: [
      {
        text: 'I like it up close and personal.',
        weightEffects: {
          Rushdown: 10,
          Zoning: -10,
          Mobility: 10
        }
      },
      {
        text: "I'll stand back a bit and rush in when I need to.",
        weightEffects: {
          Rushdown: 5,
          Zoning: -5,
          Footsies: 5,
          Mobility: 5
        }
      },
      {
        text: 'I like to keep a fair distance away and poke at them.',
        weightEffects: {
          Rushdown: -5,
          Zoning: 5,
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
          Mixups: -5
        }
      }
    ]
  },
  {
    questionText: "When in a match, what's your primary focus or favorite thing to do?",
    answers: [
      {
        text: 'Keeping the pressure on my opponent.',
        weightEffects: {
          Rushdown: 10,
          Zoning: -10,
          Meter: 5,
          Defense: -5,
          Mixups: 5,
          Okizeme: 5
        }
      },
      {
        text: 'Outmaneuvering my opponent.',
        weightEffects: {
          Footsies: 10,
          Mobility: 10,
          Rushdown: 5
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
    questionText: "What's the most important or enjoyable quality in a character for you?",
    answers: [
      {
        text: 'Damage. Everything else is secondary.',
        weightEffects: {
          Damage: 15,
          Meter: 5,
          Defense: -10,
          Mobility: -10
        }
      },
      {
        text: 'Health points. I want to last long in combat.',
        weightEffects: {
          Damage: -10,
          Defense: 15,
          Mobility: -5,
          'Ease Of Use': 5
        }
      },
      {
        text: 'Mobility. I like going fast or enjoy unconventional movement options.',
        weightEffects: {
          Rushdown: 10,
          Zoning: -5,
          Damage: -5,
          Footsies: 5,
          Defense: -5,
          Mobility: 15
        }
      },
      {
        text: 'Utility. Give me a lot of tricks, tools and options to play with.',
        weightEffects: {
          'Ease Of Use': -10,
          Footsies: 5,
          Mixups: 5,
          Meter: 5
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
    questionText: 'Would you like a projectile?',
    answers: [
      {
        text: 'I want at least a standard full screen horizontal moving one.',
        weightEffects: {
          Rushdown: -5,
          Zoning: 5,
          Footsies: 5,
          Okizeme: 5
        }
      },
      {
        text: "As long as it controls good space it doesn't have to be full screen or horizontal moving.",
        weightEffects: {
          Footsies: 5,
          Zoning: 5
        }
      },
      {
        text: 'I want a tricky, meter-only, controllable, or some kind of unique projectile people have trouble dealing with.',
        weightEffects: {
          Rushdown: -5,
          Zoning: 5,
          Meter: 5,
          'Ease Of Use': -5,
          Mixups: 5,
          Okizeme: 5
        }
      },
      {
        text: 'I do not need projectiles to win.',
        weightEffects: {
          Footsies: 5,
          Mixups: 5,
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
    questionText: "What's your current skill level in fighting games?",
    answers: [
      {
        text: 'I am new to fighting games.',
        weightEffects: {
          'Ease Of Use': 5
        }
      },
      {
        text: 'I have played some fighting games.',
        weightEffects: {
          'Ease Of Use': 0
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

export const tagQuestions: Question[] = [
  {
    questionText: 'Which type of movement ability would you rather have?',
    answers: [
      {
        text: 'Unique Movement (ex. Wall Run, Flight)',
        weightEffects: {
          Footsies: 5,
          Mobility: 10,
          'Ease Of Use': -10
        }
      },
      {
        text: 'Teleport: Near instantaneous movement',
        weightEffects: {
          Footsies: 5,
          Mobility: 10,
          'Ease Of Use': -5
        }
      },
      {
        text: 'Command Movement: Attacks or specials that cause significant movement',
        weightEffects: {
          Defense: -5,
          Mobility: 5,
          Footsies: 5
        }
      }
    ]
  },
  {
    questionText: 'Which type of projectile would you prefer?',
    answers: [
      {
        text: 'Fireball: A projectile that travels across the screen.',
        weightEffects: {
          Rushdown: 5,
          Zoning: 5
        }
      },
      {
        text: 'Beam: A ranged attack or projectile that covers most of the screen at once.',
        weightEffects: {
          Footsies: 5,
          Zoning: 5
        }
      },
      {
        text: 'None: I wanna punch stuff.',
        weightEffects: {
          Rushdown: 10,
          Mixups: 5,
          Zoning: -10,
          'Ease Of Use': -5
        }
      }
    ]
  },
  {
    questionText: 'What kind of defensive ability do you prefer?',
    answers: [
      {
        text: 'Super Armor: Moves that ignore one or more strikes or projectiles, but damage is still taken.',
        weightEffects: {
          Defense: 5,
          Okizeme: 5
        }
      },
      {
        text: "Guard Point: Moves that clash with and override an opponent's attack, taking reduced damage.",
        weightEffects: {
          Rushdown: 5,
          Okizeme: 5
        }
      },
      {
        text: 'Projectile Armor: Moves that ignore one or more projectiles, but damage is still taken.',
        weightEffects: {
          Defense: 5,
          Footsies: 5,
          Rushdown: 5
        }
      }
    ]
  },
  {
    questionText: 'Which type of attack appeals to you the most?',
    answers: [
      {
        text: 'Life Steal: A move that steals health from the opponent.',
        weightEffects: {
          Damage: 5,
          Defense: 5
        }
      },
      {
        text: 'Prison: An attack that limits the distance and/or directions to which an opponent can move for a period of time.',
        weightEffects: {
          Footsies: 5,
          Mixups: 5,
          Zoning: 5
        }
      },
      {
        text: 'Reflector: Attack that reflects projectiles back at the opponent.',
        weightEffects: {
          Defense: 5,
          Footsies: 5,
          Zoning: 5
        }
      }
    ]
  },
  {
    questionText: 'How important is speed to you?',
    answers: [
      {
        text: "Speedy: If you ain't first, you're last",
        weightEffects: {
          Defense: -10,
          Mobility: 10
        }
      },
      {
        text: 'Relaxed: I like to take my time, and I can take a few hits along the way.',
        weightEffects: {
          Defense: 10,
          Mobility: -10
        }
      },
      {
        text: "No Preference: I'll get there when I get there.",
        weightEffects: {}
      }
    ]
  },
  {
    questionText: 'What kind of special move do you prefer?',
    answers: [
      {
        text: 'Rekka: Allows for multiple stages (usually 3) with successive inputs.',
        weightEffects: {
          Damage: 5
        }
      },
      {
        text: 'Command Grab: Causes an untechable grab.',
        weightEffects: {
          Damage: -5,
          Mixups: 5
        }
      },
      {
        text: 'Status Effect: Causes a lasting problem for the opponent, such as freezing, possession, imprisonment, tethering, etc.',
        weightEffects: {
          Meter: 5,
          Zoning: 5
        }
      }
    ]
  },
  {
    questionText: 'What kind of unique character trait interests you?',
    answers: [
      {
        text: 'Stance: Alternate mode that adds, removes, or modifies moves and stats of the character.',
        weightEffects: {
          Mixups: 5,
          'Ease Of Use': -5
        }
      },
      {
        text: 'Unique Resource: Resource or meter that is not part of generic system mechanics.',
        weightEffects: {
          Damage: 5,
          'Ease Of Use': -10
        }
      },
      {
        text: 'Puppet: Control one or more subordinates who usually move and attack semi-independently.',
        weightEffects: {
          Zoning: 5,
          Mixups: 10,
          'Ease Of Use': -10
        }
      },
      {
        text: 'Install: Special move or trait that causes the character to enter an elevated state, usually with additional moves and buffs.',
        weightEffects: {
          Damage: 5,
          'Ease Of Use': -5
        }
      },
      {
        text: 'None: Keep it vanilla.',
        weightEffects: {}
      }
    ]
  }
];
