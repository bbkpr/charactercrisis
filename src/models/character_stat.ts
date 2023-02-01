import { Stat } from './stat';

export interface CharacterStat {
  character_id: number;
  comments: string;
  stat: Stat;
  stat_id: number;
  value: number;
}
