import { CharacterStat } from './character_stat';
import { Entity } from './entity';
import { Game } from './game';
import { Stat } from './stat';

export interface Character extends Entity {
  reference_link: string;

  /** `game` table value*/
  game: Game;

  character_stat: CharacterStat[];
}
