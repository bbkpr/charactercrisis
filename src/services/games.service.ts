import { Game } from '../models/game';
import { EntitiesData } from '../state/dtos';
import { gamesLoaded } from '../state/gamesSlice';
import { AppDispatch } from '../state/store';
import { supabase } from './supabase.service';

export const loadGames = async (dispatch: AppDispatch) => {
  return dispatch(
    gamesLoaded(
      (await supabase
        .from('game')
        .select(
          `
        id,
        name,
        description,
        created_at,
        updated_at,
        abbreviation,
        character (
          id,
          name,
          description,
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
        )
      `
        )
        .order('name')
        .order('name', { foreignTable: 'character' })) as EntitiesData<Game>
    )
  );
};
