import { Character } from './character';
import { Entity } from './entity';

export interface Game extends Entity {
  character: Character[];
  abbreviation: string;
}
