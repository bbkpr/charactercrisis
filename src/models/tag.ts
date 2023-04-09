import { Entity } from './entity';

export interface Tag extends Entity {
  /**
   * A general category for the tag.
   * Examples: Offense, Defense, Movement, Status, Control, etc.
   */
  category: string;
}
