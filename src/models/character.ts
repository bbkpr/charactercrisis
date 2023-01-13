import { Entity } from './entity';

export interface Character extends Entity {
  game_id: number;
  reference_link: string;
}
