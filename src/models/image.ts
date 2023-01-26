import { Entity } from './entity';

export interface Image extends Entity {
  bucket: string;
  path: string;
}
