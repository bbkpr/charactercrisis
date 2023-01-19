import { Character } from '../models/character';
import { charactersLoaded } from '../state/charactersSlice';
import { EntitiesData } from '../state/dtos';
import { statsLoaded } from '../state/statsSlice';
import { AppDispatch } from '../state/store';
import { supabase } from './supabase.service';

export const loadCharacters = async (dispatch: AppDispatch) => {
  return dispatch(
    charactersLoaded(
      (await supabase
        .from('character')
        .select(
          `
        id,
        name,
        description,
        created_at,
        updated_at,
        game (
          id,
          name,
          description
        ),
        reference_link,
        character_stat (
          character_id,
          comments,
          stat_id,
          value,
          stat (
            id,
            name,
            description,
            created_at,
            updated_at
          )
        )
      `
        )
        .order('stat_id', { foreignTable: 'character_stat' })
        .order('name')) as EntitiesData<Character>
    )
  );
};

export const loadStats = async (dispatch: AppDispatch) => {
  return dispatch(statsLoaded((await supabase.from('stat').select('*').order('id')) as EntitiesData<Character>));
};
