import { Game, Stat, Tag, Character, Image } from '../models';

export const fakedGame: Game = {
  id: 1,
  created_at: null,
  updated_at: null,
  name: 'Faked Game',
  description: 'A faked game for demonstration purposes.',
  abbreviation: 'FG',
  character: []
};

export const fakedImage: Image = {
  id: 1,
  created_at: null,
  updated_at: null,
  name: 'Faked Image',
  description: 'A faked image for demonstration purposes.',
  bucket: 'faked-bucket',
  path: 'faked-path'
};

export const fakedStat: Stat = {
  id: 1,
  created_at: null,
  updated_at: null,
  name: 'Faked Stat',
  description: 'A faked stat for demonstration purposes.',
  abbreviation: 'FS'
};

export const fakedTag: Tag = {
  id: 1,
  created_at: null,
  updated_at: null,
  name: 'Faked Tag',
  category: 'Offense',
  description: 'A faked tag for demonstration purposes.'
};

export const fakedCharacters: Character[] = [
  {
    id: 1,
    created_at: null,
    updated_at: null,
    name: 'Faked Character 1',
    description: 'A faked character for demonstration purposes.',
    reference_link: 'https://example.com/faked-character-1',
    game_id: 1,
    game: fakedGame,
    character_image: [
      {
        character_id: 1,
        image: fakedImage,
        image_id: 1,
        image_type: 'main' as const
      }
    ],
    character_stat: [
      {
        character_id: 1,
        comments: 'Faked comment for character 1 stat',
        stat: fakedStat,
        stat_id: 1,
        value: 10
      }
    ],
    character_tag: [
      {
        character_id: 1,
        tag: fakedTag,
        tag_id: 1
      }
    ]
  },
  {
    id: 2,
    created_at: null,
    updated_at: null,
    name: 'Faked Character 2',
    description: 'A faked character for demonstration purposes.',
    reference_link: 'https://example.com/faked-character-2',
    game_id: 1,
    game: fakedGame,
    character_image: [
      {
        character_id: 2,
        image: fakedImage,
        image_id: 1,
        image_type: 'main' as const
      }
    ],
    character_stat: [
      {
        character_id: 2,
        comments: 'Faked comment for character 2 stat',
        stat: fakedStat,
        stat_id: 1,
        value: 20
      }
    ],
    character_tag: [
      {
        character_id: 2,
        tag: fakedTag,
        tag_id: 1
      }
    ]
  },
  {
    id: 3,
    created_at: null,
    updated_at: null,
    name: 'Faked Character 3',
    description: 'A faked character for demonstration purposes.',
    reference_link: 'https://example.com/faked-character-3',
    game_id: 1,
    game: fakedGame,
    character_image: [
      {
        character_id: 3,
        image: fakedImage,
        image_id: 1,
        image_type: 'main' as const
      }
    ],
    character_stat: [
      {
        character_id: 3,
        comments: 'Faked comment for character 3 stat',
        stat: fakedStat,
        stat_id: 1,
        value: 30
      }
    ],
    character_tag: [
      {
        character_id: 3,
        tag: fakedTag,
        tag_id: 1
      }
    ]
  }
];

export default fakedCharacters;
