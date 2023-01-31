import { Character } from '../models/character';
import { Stat } from '../models/stat';
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
        game_id,
        game (
          id,
          name,
          description,
          abbreviation
        ),
        reference_link,
        character_image (
          character_id,
          image_id,
          image_type,
          image (
            id,
            name,
            description,
            created_at,
            updated_at,
            bucket,
            path
          )
        ),
        character_stat (
          character_id,
          stat_id,
          comments,
          value,
          stat (
            id,
            name,
            description,
            created_at,
            updated_at
          )
        ),
        character_tag (
          character_id,
          tag_id,
          comments,
          value,
          tag (
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
        .order('game_id')
        .order('name')) as EntitiesData<Character>
    )
  );
};

export const loadStats = async (dispatch: AppDispatch) => {
  return dispatch(statsLoaded((await supabase.from('stat').select('*').order('id')) as EntitiesData<Stat>));
};
