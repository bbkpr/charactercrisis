import { Character } from './character';
import { Game } from './game';

export interface CharacterGame {
  character: Character;
  character_id: number;
  game: Game;
  game_id: number;
}
