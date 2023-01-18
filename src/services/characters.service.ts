import { Character } from '../models/character';
import { charactersLoaded } from '../state/characterSlice';
import { EntitiesData } from '../state/dtos';
import { AppDispatch } from '../state/store';
import { supabase } from './supabase.service';

export const loadCharacters = async (dispatch: AppDispatch) => {
  return dispatch(
    charactersLoaded(
      (await supabase.from('character').select(`
        id,
        name,
        reference_link,
        character_stat (
          stat_id,
          value,
          stat (
            name,
            description
          )
        )
      `)) as EntitiesData<Character>
    )
  );
};
