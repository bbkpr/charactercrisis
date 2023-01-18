import { Entity } from '../models/entity';

export interface EntitiesData<T extends Entity> {
  data: T[];
}
