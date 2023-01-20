import { CharacterStat } from './character_stat';
import { Entity } from './entity';
import { Game } from './game';

export interface Character extends Entity {
  reference_link: string;

  game_id: number;

  /** `game` table value*/
  game: Game;

  character_stat: CharacterStat[];
}
