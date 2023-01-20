import { Stat } from './stat';

export interface CharacterStat {
  character_id: number;
  comments: string;
  stat_id: number;
  value: number;

  /** Stat table value */
  stat: Stat;
}
