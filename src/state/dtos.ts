import { Entity } from '../models/entity';

export interface EntitiesData<T extends Entity> {
  entities: T[];
}

export interface AsyncLoadable<T extends Entity> extends EntitiesData<T> {
  error: boolean;
  errorMessage?: string;
  loaded: boolean;
  loading: boolean;
}
