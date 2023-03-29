import { Entity } from '../models/entity';

export interface EntityData<T extends Entity> {
  data: T;
}

export interface EntitiesData<T extends Entity> {
  data: T[];
}
